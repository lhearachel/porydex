import dataclasses
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
    EvoMethod('level', 'in'), # Magnezone, etc. (param is the name of the zone)
    EvoMethod('useItem', 'if Male gender'),
    EvoMethod('useItem', 'if Female gender'),
    EvoMethod('level', 'in rainy weather'),
    EvoMethod('levelMove', 'in the party'), # Mantine (param is Remoraid)
    EvoMethod('levelMove', 'in the party'), # Pangoro (param is "a Dark-type mon")
    EvoMethod('tradeSpecies', 'for'), # Accelgor, Escavalier (param is Karrablast, Shelmet, respectively)
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
]

