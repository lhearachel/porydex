import dataclasses
import enum
import typing

DAMAGE_TYPE: typing.List[str] = [
    'Normal',
    'Fighting',
    'Flying',
    'Poison',
    'Ground',
    'Rock',
    'Bug',
    'Ghost',
    'Steel',
    'Mystery',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Psychic',
    'Ice',
    'Dragon',
    'Dark',
    'Fairy',
    'Stellar',
]

DAMAGE_CATEGORY: typing.List[str] = [
    'Physical',
    'Special',
    'Status',
]

CONTEST_CATEGORY: typing.List[str] = [
    'Cool',
    'Beauty',
    'Cute',
    'Smart',
    'Tough',
]

EGG_GROUP: typing.List[str] = [
    'None',
    'Monster',
    'Water 1',
    'Bug',
    'Flying',
    'Field',
    'Fairy',
    'Grass',
    'Human-Like',
    'Water 3',
    'Mineral',
    'Amorphous',
    'Water 2',
    'Ditto',
    'Dragon',
    'Undiscovered',
]

BODY_COLOR: typing.List[str] = [
    'Red',
    'Blue',
    'Yellow',
    'Green',
    'Black',
    'Brown',
    'Purple',
    'Gray',
    'White',
    'Pink',
]

class ExpansionEvoMethod(enum.Enum):
    FRIENDSHIP = 1
    FRIENDSHIP_DAY = enum.auto()
    FRIENDSHIP_NIGHT = enum.auto()
    LEVEL = enum.auto()
    TRADE = enum.auto()
    TRADE_ITEM = enum.auto()
    ITEM = enum.auto()
    LEVEL_ATK_GT_DEF = enum.auto()
    LEVEL_ATK_EQ_DEF = enum.auto()
    LEVEL_ATK_LT_DEF = enum.auto()
    LEVEL_SILCOON = enum.auto()
    LEVEL_CASCOON = enum.auto()
    LEVEL_NINJASK = enum.auto()
    LEVEL_SHEDINJA = enum.auto()
    BEAUTY = enum.auto()
    LEVEL_FEMALE = enum.auto()
    LEVEL_MALE = enum.auto()
    LEVEL_NIGHT = enum.auto()
    LEVEL_DAY = enum.auto()
    LEVEL_DUSK = enum.auto()
    ITEM_HOLD_DAY = enum.auto()
    ITEM_HOLD_NIGHT = enum.auto()
    MOVE = enum.auto()
    FRIENDSHIP_MOVE_TYPE = enum.auto()
    MAPSEC = enum.auto()
    ITEM_MALE = enum.auto()
    ITEM_FEMALE = enum.auto()
    LEVEL_RAIN = enum.auto()
    SPECIFIC_MON_IN_PARTY = enum.auto()
    LEVEL_DARK_TYPE_MON_IN_PARTY = enum.auto()
    TRADE_SPECIFIC_MON = enum.auto()
    SPECIFIC_MAP = enum.auto()
    LEVEL_NATURE_AMPED = enum.auto()
    LEVEL_NATURE_LOW_KEY = enum.auto()
    CRITICAL_HITS = enum.auto()
    SCRIPT_TRIGGER_DMG = enum.auto()
    DARK_SCROLL = enum.auto()
    WATER_SCROLL = enum.auto()
    ITEM_NIGHT = enum.auto()
    ITEM_DAY = enum.auto()
    ITEM_HOLD = enum.auto()
    LEVEL_FOG = enum.auto()
    MOVE_TWO_SEGMENT = enum.auto()
    MOVE_THREE_SEGMENT = enum.auto()
    LEVEL_FAMILY_OF_THREE = enum.auto()
    LEVEL_FAMILY_OF_FOUR = enum.auto()
    USE_MOVE_TWENTY_TIMES = enum.auto()
    RECOIL_DAMAGE_MALE = enum.auto()
    RECOIL_DAMAGE_FEMALE = enum.auto()
    ITEM_COUNT_999 = enum.auto()

@dataclasses.dataclass
class EvoMethod():
    type: str
    condition: str

EVO_METHOD: typing.List[EvoMethod] = [
    EvoMethod('', ''),

    EvoMethod('levelFriendship', ''),
    EvoMethod('levelFriendship', 'during the day'),
    EvoMethod('levelFriendship', 'at night'),
    EvoMethod('level', ''),
    EvoMethod('trade', ''),
    EvoMethod('tradeItem', 'while holding'),
    EvoMethod('useItem', ''),
    EvoMethod('level', 'with attack > defense'),
    EvoMethod('level', 'with attack = defense'),
    EvoMethod('level', 'with attack < defense'),
    EvoMethod('level', 'based on personality'), # Silcoon
    EvoMethod('level', 'based on personality'), # Cascoon
    EvoMethod('level', ''), # Ninjask
    EvoMethod('level', 'with empty party slot + extra Poke Ball'),
    EvoMethod('level', 'with maximum Beauty'),
    EvoMethod('level', 'if Female gender'),
    EvoMethod('level', 'if Male gender'),
    EvoMethod('level', 'at night'),
    EvoMethod('level', 'during the day'),
    EvoMethod('level', 'at dusk'),
    EvoMethod('levelHold', 'during the day'),
    EvoMethod('levelHold', 'at night'),
    EvoMethod('levelMove', ''),
    EvoMethod('levelMove', 'and two levels of Affection'), # Sylveon (param is "a Fairy-type move")
    EvoMethod('levelMap', 'in'), # Magnezone, etc. (param is the name of the zone)
    EvoMethod('useItem', 'if Male gender'),
    EvoMethod('useItem', 'if Female gender'),
    EvoMethod('level', 'in rainy weather'),
    EvoMethod('levelMove', 'in the party'), # Mantine (param is Remoraid)
    EvoMethod('levelMove', 'in the party'), # Pangoro (param is "a Dark-type mon")
    EvoMethod('tradeSpecies', 'with a'), # Accelgor, Escavalier (param is Karrablast, Shelmet, respectively)
    EvoMethod('level', 'in'), # special one used for Leafeon and Glaceon, for some reason
    EvoMethod('level', 'if Amped Nature'),
    EvoMethod('level', 'if Low-Key Nature'),
    EvoMethod('other', 'land 3 critical hits in 1 battle'),
    EvoMethod('other', 'have 49+ HP lost and walk under stone sculpture in Dusty Bowl'), # Runerigus-G
    EvoMethod('other', 'interact with the Scroll of Darkness'),
    EvoMethod('other', 'interact with the Scroll of Waters'),
    EvoMethod('useItem', 'at night'),
    EvoMethod('useItem', 'during the day'),
    EvoMethod('levelHold', ''),
    EvoMethod('level', 'in foggy weather'),
    EvoMethod('levelMove', 'and two segments'),
    EvoMethod('levelMove', 'and three segments'),
    EvoMethod('level', 'based on personality'), # Maushold, family of 3
    EvoMethod('level', 'based on personality'), # Maushold, family of 4
    EvoMethod('useMove', '20 times'), # Wyrdeer, Annihilape
    EvoMethod('other', 'receive 294+ recoil damage without fainting'), # Basculegion-M
    EvoMethod('other', 'receive 294+ recoil damage without fainting'), # Basculegion-F
    EvoMethod('level', 'with 999 coins in the bag'), # Gholdengo
]

