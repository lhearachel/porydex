import pathlib
import re

from pycparser import parse_file
from pycparser.c_ast import NamedInitializer

from porydex.common import PREPROCESS_LIBC, COMMON_CPP_ARGS
from porydex.cpp_args import MOVES_CPP_ARGS
from porydex.parse import extract_compound_str, extract_id, extract_int, extract_prefixed

TYPE = re.compile(r'TYPE_(.*)')
DAMAGE_CATEGORY = re.compile(r'DAMAGE_CATEGORY_(.*)')
CONTEST_CATEGORY = re.compile(r'CONTEST_CATEGORY_(.*)')

FLAGS_EXPANSION_TO_SHOWDOWN = {
    'bitingMove': 'bite',
    'ballisticMove': 'bullet',
    'ignoresSubstitute': 'bypasssub',
    'cantUseTwice': 'cantusetwice',
    'makesContact': 'contact',
    'thawsUser': 'defrost',
    'mirrorMoveBanned': 'mirror',
    'powderMove': 'powder',
    'ignoresProtect': 'protect',
    'pulseMove': 'pulse',
    'punchingMove': 'punch',
    'magicCoatAffected': 'reflectable',
    'slicingMove': 'slicing',
    'snatchAffected': 'snatch',
    'soundMove': 'sound',
    'windMove': 'wind',
}

def parse_move(struct_init: NamedInitializer) -> dict:
    init_list = struct_init.expr.exprs
    move = {}
    move['flags'] = {
        # showdown dex interprets these as "this move is affected by or can
        # be invoked by these effects"
        # expansion instead stores these as "this move ignores or cannot be
        # invoked by these effects"
        'protect': 1,
        'mirror': 1,
    }
    for field_init in init_list: 
        field_name = field_init.name[0].name
        field_expr = field_init.expr

        match field_name:
            # TODO: number from moves.h constants?
            case 'name':
                move['name'] = extract_compound_str(field_expr.args)
            case 'effect':
                move['effect'] = extract_id(field_expr)
            case 'power':
                move['power'] = extract_int(field_expr)
            case 'type':
                # IDs are prefixed with 'TYPE_'
                move['type'] = extract_prefixed(TYPE, extract_id(field_expr), str.capitalize)
            case 'accuracy':
                # expansion stores infinite accuracy as 0 accuracy
                # showdown dex represents infinite accuracy as boolean True
                acc = extract_int(field_expr)
                move['accuracy'] = acc if acc > 0 else True
            case 'pp':
                move['pp'] = extract_int(field_expr)
            case 'priority':
                move['priority'] = extract_int(field_expr)
            case 'category':
                # IDs are prefixed with 'DAMAGE_CATEGORY_'
                move['category'] = extract_prefixed(DAMAGE_CATEGORY, extract_id(field_expr), str.capitalize)
            case 'criticalHitStage':
                # expansion stores this as an "additional" critical hit stage
                # showdown dex instead says all moves have an implicit critical hit
                # stage of 1
                move['critRatio'] = extract_int(field_expr) + 1
            case 'contestCategory':
                # IDs are prefixed with 'CONTEST_CATEGORY_'
                move['contestType'] = extract_prefixed(CONTEST_CATEGORY, extract_id(field_expr), str.capitalize)
            case 'bitingMove' \
                | 'ballisticMove' \
                | 'ignoresSubstitute' \
                | 'cantUseTwice' \
                | 'makesContact' \
                | 'thawsUser' \
                | 'powderMove' \
                | 'pulseMove' \
                | 'punchingMove' \
                | 'magicCoatAffected' \
                | 'slicingMove' \
                | 'snatchAffected' \
                | 'soundMove' \
                | 'windMove':
                move['flags'][FLAGS_EXPANSION_TO_SHOWDOWN[field_name]] = 1
            case 'ignoresProtect' \
                | 'mirrorMoveBanned':
                # showdown stores these as a flag for if they are affected by
                # or can be invoked by these effects
                del move['flags'][FLAGS_EXPANSION_TO_SHOWDOWN[field_name]]
            case _:
                pass

    # cleanup: expansion flags sound moves as both sound and ignores substitute
    # showdown dex only expects sound for these instances
    if 'sound' in move['flags'] and 'bypasssub' in move['flags']:
        del move['flags']['bypasssub']

    return move

def parse_moves(fname: pathlib.Path) -> dict:
    moves_ast = parse_file(fname,
                        use_cpp=True,
                        cpp_path='cpp',
                        cpp_args=[*PREPROCESS_LIBC, *MOVES_CPP_ARGS, *COMMON_CPP_ARGS])
    moves_data = moves_ast.ext[-1].init.exprs

    all_moves = {}
    for move_init in moves_data:
        try:
            move = parse_move(move_init)
            key = ''.join(move['name'].split()).lower()
            all_moves[key] = move
        except Exception as err:
            print('error parsing move')
            print(move_init.show())
            raise err

    return all_moves

