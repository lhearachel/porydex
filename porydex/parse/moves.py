import pathlib

from pycparser.c_ast import NamedInitializer

from porydex.model import DAMAGE_TYPE, DAMAGE_CATEGORY, CONTEST_CATEGORY
from porydex.parse import extract_compound_str, load_data, extract_int, extract_u8_str

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
    move['num'] = extract_int(struct_init.name[0])
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
            case 'name':
                move['name'] = extract_compound_str(field_expr)
            case 'power':
                move['power'] = extract_int(field_expr)
            case 'type':
                move['type'] = DAMAGE_TYPE[extract_int(field_expr)]
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
                move['category'] = DAMAGE_CATEGORY[extract_int(field_expr)]
            case 'criticalHitStage':
                # expansion stores this as an "additional" critical hit stage
                # showdown dex instead says all moves have an implicit critical hit
                # stage of 1
                move['critRatio'] = extract_int(field_expr) + 1
            case 'contestCategory':
                move['contestType'] = CONTEST_CATEGORY[extract_int(field_expr)]
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
    moves_data = load_data(fname, extra_includes=[
        r'-include', r'constants/battle.h',
        r'-include', r'constants/moves.h',
    ])

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

