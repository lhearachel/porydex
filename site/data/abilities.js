exports.BattleAbilities = {
  "noability": {
    "isNonstandard": "Past",
    "flags": {},
    "name": "No Ability",
    "rating": 0.1,
    "num": 0,
    "desc": "Does nothing.",
    "shortDesc": "Does nothing."
  },
  "adaptability": {
    "flags": {},
    "name": "Adaptability",
    "rating": 4,
    "num": 91,
    "desc": "This Pokemon's moves that match one of its types have a same-type attack bonus (STAB) of 2 instead of 1.5.",
    "shortDesc": "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5."
  },
  "aerilate": {
    "onModifyTypePriority": -1,
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Aerilate",
    "rating": 4,
    "num": 184,
    "desc": "This Pokemon's Normal-type moves become Flying-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    "shortDesc": "This Pokemon's Normal-type moves become Flying type and have 1.2x power."
  },
  "aftermath": {
    "onDamagingHitOrder": 1,
    "flags": {},
    "name": "Aftermath",
    "rating": 2,
    "num": 106,
    "desc": "If this Pokemon is knocked out with a contact move, that move's user loses 1/4 of its maximum HP, rounded down. If any active Pokemon has the Damp Ability, this effect is prevented.",
    "shortDesc": "If this Pokemon is KOed with a contact move, that move's user loses 1/4 its max HP."
  },
  "airlock": {
    "suppressWeather": true,
    "flags": {},
    "name": "Air Lock",
    "rating": 1.5,
    "num": 76,
    "desc": "While this Pokemon is active, the effects of weather conditions are disabled.",
    "shortDesc": "While this Pokemon is active, the effects of weather conditions are disabled."
  },
  "analytic": {
    "onBasePowerPriority": 21,
    "flags": {},
    "name": "Analytic",
    "rating": 2.5,
    "num": 148,
    "desc": "The power of this Pokemon's move is multiplied by 1.3 if it is the last to move in a turn. Does not affect Doom Desire and Future Sight.",
    "shortDesc": "This Pokemon's attacks have 1.3x power if it is the last to move in a turn."
  },
  "angerpoint": {
    "flags": {},
    "name": "Anger Point",
    "rating": 1,
    "num": 83,
    "desc": "If this Pokemon, but not its substitute, is struck by a critical hit, its Attack is raised by 12 stages.",
    "shortDesc": "If this Pokemon (not its substitute) takes a critical hit, its Attack is raised 12 stages."
  },
  "angershell": {
    "flags": {},
    "name": "Anger Shell",
    "rating": 3,
    "num": 271,
    "desc": "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack, Special Attack, and Speed are raised by 1 stage, and its Defense and Special Defense are lowered by 1 stage. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability.",
    "shortDesc": "At 1/2 or less of this Pokemon's max HP: +1 Atk, Sp. Atk, Spe, and -1 Def, Sp. Def."
  },
  "anticipation": {
    "flags": {},
    "name": "Anticipation",
    "rating": 0.5,
    "num": 107,
    "desc": "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is super effective against this Pokemon, or an OHKO move. This effect considers any move that deals direct damage as an attacking move of its respective type, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
    "shortDesc": "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move."
  },
  "arenatrap": {
    "flags": {},
    "name": "Arena Trap",
    "rating": 5,
    "num": 71,
    "desc": "Prevents opposing Pokemon from choosing to switch out unless they are airborne, are holding a Shed Shell, or are a Ghost type.",
    "shortDesc": "Prevents opposing Pokemon from choosing to switch out unless they are airborne."
  },
  "armortail": {
    "flags": {
      "breakable": 1
    },
    "name": "Armor Tail",
    "rating": 2.5,
    "num": 296,
    "desc": "Priority moves used by opposing Pokemon targeting this Pokemon or its allies are prevented from having an effect.",
    "shortDesc": "This Pokemon and its allies are protected from opposing priority moves."
  },
  "aromaveil": {
    "flags": {
      "breakable": 1
    },
    "name": "Aroma Veil",
    "rating": 2,
    "num": 165,
    "desc": "This Pokemon and its allies cannot become affected by Attract, Disable, Encore, Heal Block, Taunt, or Torment.",
    "shortDesc": "Protects user/allies from Attract, Disable, Encore, Heal Block, Taunt, and Torment."
  },
  "asoneglastrier": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "As One (Glastrier)",
    "rating": 3.5,
    "num": 266,
    "desc": "Combination of the Unnerve and Chilling Neigh Abilities.",
    "shortDesc": "Combination of the Unnerve and Chilling Neigh Abilities."
  },
  "asonespectrier": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "As One (Spectrier)",
    "rating": 3.5,
    "num": 267,
    "desc": "Combination of the Unnerve and Grim Neigh Abilities.",
    "shortDesc": "Combination of the Unnerve and Grim Neigh Abilities."
  },
  "aurabreak": {
    "flags": {
      "breakable": 1
    },
    "name": "Aura Break",
    "rating": 1,
    "num": 188,
    "desc": "While this Pokemon is active, the effects of the Dark Aura and Fairy Aura Abilities are reversed, multiplying the power of Dark- and Fairy-type moves, respectively, by 3/4 instead of 1.33.",
    "shortDesc": "While this Pokemon is active, the Dark Aura and Fairy Aura power modifier is 0.75x."
  },
  "baddreams": {
    "onResidualOrder": 28,
    "onResidualSubOrder": 2,
    "flags": {},
    "name": "Bad Dreams",
    "rating": 1.5,
    "num": 123,
    "desc": "Causes opposing Pokemon to lose 1/8 of their maximum HP, rounded down, at the end of each turn if they are asleep.",
    "shortDesc": "Causes sleeping foes to lose 1/8 of their max HP at the end of each turn."
  },
  "ballfetch": {
    "flags": {},
    "name": "Ball Fetch",
    "rating": 0,
    "num": 237,
    "desc": "No competitive use.",
    "shortDesc": "No competitive use."
  },
  "battery": {
    "onAllyBasePowerPriority": 22,
    "flags": {},
    "name": "Battery",
    "rating": 0,
    "num": 217,
    "desc": "This Pokemon's allies have the power of their special attacks multiplied by 1.3.",
    "shortDesc": "This Pokemon's allies have the power of their special attacks multiplied by 1.3."
  },
  "battlearmor": {
    "onCriticalHit": false,
    "flags": {
      "breakable": 1
    },
    "name": "Battle Armor",
    "rating": 1,
    "num": 4,
    "desc": "This Pokemon cannot be struck by a critical hit.",
    "shortDesc": "This Pokemon cannot be struck by a critical hit."
  },
  "battlebond": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Battle Bond",
    "rating": 3.5,
    "num": 210,
    "desc": "If this Pokemon is a Greninja, its Attack, Special Attack, and Speed are raised by 1 stage if it attacks and knocks out another Pokemon. This effect can only happen once per battle.",
    "shortDesc": "After KOing a Pokemon: raises Attack, Sp. Atk, Speed by 1 stage. Once per battle."
  },
  "beadsofruin": {
    "flags": {},
    "name": "Beads of Ruin",
    "rating": 4.5,
    "num": 284,
    "desc": "Active Pokemon without this Ability have their Special Defense multiplied by 0.75.",
    "shortDesc": "Active Pokemon without this Ability have their Special Defense multiplied by 0.75."
  },
  "beastboost": {
    "flags": {},
    "name": "Beast Boost",
    "rating": 3.5,
    "num": 224,
    "desc": "This Pokemon's highest stat is raised by 1 stage if it attacks and knocks out another Pokemon. Stat stage changes are not considered. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order.",
    "shortDesc": "This Pokemon's highest stat is raised by 1 if it attacks and KOes another Pokemon."
  },
  "berserk": {
    "flags": {},
    "name": "Berserk",
    "rating": 2,
    "num": 201,
    "desc": "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Special Attack is raised by 1 stage. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability.",
    "shortDesc": "This Pokemon's Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP."
  },
  "bigpecks": {
    "flags": {
      "breakable": 1
    },
    "name": "Big Pecks",
    "rating": 0.5,
    "num": 145,
    "desc": "Prevents other Pokemon from lowering this Pokemon's Defense stat stage.",
    "shortDesc": "Prevents other Pokemon from lowering this Pokemon's Defense stat stage."
  },
  "blaze": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Blaze",
    "rating": 2,
    "num": 66,
    "desc": "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 1.5 while using a Fire-type attack.",
    "shortDesc": "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Fire attacks."
  },
  "bulletproof": {
    "flags": {
      "breakable": 1
    },
    "name": "Bulletproof",
    "rating": 3,
    "num": 171,
    "desc": "This Pokemon is immune to bullet moves.",
    "shortDesc": "This Pokemon is immune to bullet moves."
  },
  "cheekpouch": {
    "flags": {},
    "name": "Cheek Pouch",
    "rating": 2,
    "num": 167,
    "desc": "If this Pokemon eats a held Berry, it restores 1/3 of its maximum HP, rounded down, in addition to the Berry's effect. This effect can also activate after the effects of Bug Bite, Fling, Pluck, Stuff Cheeks, and Teatime if the eaten Berry had an effect on this Pokemon.",
    "shortDesc": "If this Pokemon eats a Berry, it restores 1/3 of its max HP after the Berry's effect."
  },
  "chillingneigh": {
    "flags": {},
    "name": "Chilling Neigh",
    "rating": 3,
    "num": 264,
    "desc": "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
    "shortDesc": "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon."
  },
  "chlorophyll": {
    "flags": {},
    "name": "Chlorophyll",
    "rating": 3,
    "num": 34,
    "desc": "If Sunny Day is active, this Pokemon's Speed is doubled. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    "shortDesc": "If Sunny Day is active, this Pokemon's Speed is doubled."
  },
  "clearbody": {
    "flags": {
      "breakable": 1
    },
    "name": "Clear Body",
    "rating": 2,
    "num": 29,
    "desc": "Prevents other Pokemon from lowering this Pokemon's stat stages.",
    "shortDesc": "Prevents other Pokemon from lowering this Pokemon's stat stages."
  },
  "cloudnine": {
    "suppressWeather": true,
    "flags": {},
    "name": "Cloud Nine",
    "rating": 1.5,
    "num": 13,
    "desc": "While this Pokemon is active, the effects of weather conditions are disabled.",
    "shortDesc": "While this Pokemon is active, the effects of weather conditions are disabled."
  },
  "colorchange": {
    "flags": {},
    "name": "Color Change",
    "rating": 0,
    "num": 16,
    "desc": "This Pokemon's type changes to match the type of the last move that hit it, unless that type is already one of its types. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability.",
    "shortDesc": "This Pokemon's type changes to the type of a move it's hit by, unless it has the type."
  },
  "comatose": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Comatose",
    "rating": 4,
    "num": 213,
    "desc": "This Pokemon is considered to be asleep and cannot become affected by a non-volatile status condition or Yawn.",
    "shortDesc": "This Pokemon cannot be statused, and is considered to be asleep."
  },
  "commander": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1
    },
    "name": "Commander",
    "rating": 0,
    "num": 279,
    "desc": "If this Pokemon is a Tatsugiri and a Dondozo is an active ally, this Pokemon goes into the Dondozo's mouth. The Dondozo has its Attack, Special Attack, Speed, Defense, and Special Defense raised by 2 stages. During the effect, the Dondozo cannot be switched out, this Pokemon cannot select an action, and attacks targeted at this Pokemon will be avoided but it will still take indirect damage. If this Pokemon faints during the effect, a Pokemon can be switched in as a replacement but the Dondozo remains unable to be switched out. If the Dondozo faints during the effect, this Pokemon regains the ability to select an action.",
    "shortDesc": "If ally is Dondozo: this Pokemon cannot act or be hit, +2 to all Dondozo's stats."
  },
  "competitive": {
    "flags": {},
    "name": "Competitive",
    "rating": 2.5,
    "num": 172,
    "desc": "This Pokemon's Special Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
    "shortDesc": "This Pokemon's Sp. Atk is raised by 2 for each of its stats that is lowered by a foe."
  },
  "compoundeyes": {
    "onSourceModifyAccuracyPriority": -1,
    "flags": {},
    "name": "Compound Eyes",
    "rating": 3,
    "num": 14,
    "desc": "This Pokemon's moves have their accuracy multiplied by 1.3.",
    "shortDesc": "This Pokemon's moves have their accuracy multiplied by 1.3."
  },
  "contrary": {
    "flags": {
      "breakable": 1
    },
    "name": "Contrary",
    "rating": 4.5,
    "num": 126,
    "desc": "If this Pokemon has a stat stage raised it is lowered instead, and vice versa.",
    "shortDesc": "If this Pokemon has a stat stage raised it is lowered instead, and vice versa."
  },
  "corrosion": {
    "flags": {},
    "name": "Corrosion",
    "rating": 2.5,
    "num": 212,
    "desc": "This Pokemon can poison or badly poison a Pokemon regardless of its typing.",
    "shortDesc": "This Pokemon can poison or badly poison a Pokemon regardless of its typing."
  },
  "costar": {
    "flags": {},
    "name": "Costar",
    "rating": 0,
    "num": 294,
    "desc": "On switch-in, this Pokemon copies all of its ally's stat stage changes.",
    "shortDesc": "On switch-in, this Pokemon copies all of its ally's stat stage changes."
  },
  "cottondown": {
    "flags": {},
    "name": "Cotton Down",
    "rating": 2,
    "num": 238,
    "desc": "When this Pokemon is hit by an attack, the Speed of all other Pokemon on the field is lowered by 1 stage.",
    "shortDesc": "If this Pokemon is hit, it lowers the Speed of all other Pokemon on the field 1 stage."
  },
  "cudchew": {
    "condition": {
      "noCopy": true,
      "duration": 2,
      "onResidualOrder": 28,
      "onResidualSubOrder": 2
    },
    "flags": {},
    "name": "Cud Chew",
    "rating": 2,
    "num": 291,
    "desc": "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn.",
    "shortDesc": "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn."
  },
  "curiousmedicine": {
    "flags": {},
    "name": "Curious Medicine",
    "rating": 0,
    "num": 261,
    "desc": "On switch-in, this Pokemon's allies have their stat stages reset to 0.",
    "shortDesc": "On switch-in, this Pokemon's allies have their stat stages reset to 0."
  },
  "cursedbody": {
    "flags": {},
    "name": "Cursed Body",
    "rating": 2,
    "num": 130,
    "desc": "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled unless one of the attacker's moves is already disabled.",
    "shortDesc": "If this Pokemon is hit by an attack, there is a 30% chance that move gets disabled."
  },
  "cutecharm": {
    "flags": {},
    "name": "Cute Charm",
    "rating": 0.5,
    "num": 56,
    "desc": "There is a 30% chance a Pokemon making contact with this Pokemon will become infatuated if it is of the opposite gender.",
    "shortDesc": "30% chance of infatuating Pokemon of the opposite gender if they make contact."
  },
  "damp": {
    "flags": {
      "breakable": 1
    },
    "name": "Damp",
    "rating": 0.5,
    "num": 6,
    "desc": "While this Pokemon is active, Explosion, Mind Blown, Misty Explosion, Self-Destruct, and the Aftermath Ability are prevented from having an effect.",
    "shortDesc": "Prevents Explosion/Mind Blown/Misty Explosion/Self-Destruct/Aftermath while active."
  },
  "dancer": {
    "flags": {},
    "name": "Dancer",
    "rating": 1.5,
    "num": 216,
    "desc": "After another Pokemon uses a dance move, this Pokemon uses the same move. The copied move is subject to all effects that can prevent a move from being executed. A move used through this Ability cannot be copied again by other Pokemon with this Ability.",
    "shortDesc": "After another Pokemon uses a dance move, this Pokemon uses the same move."
  },
  "darkaura": {
    "onAnyBasePowerPriority": 20,
    "flags": {},
    "name": "Dark Aura",
    "rating": 3,
    "num": 186,
    "desc": "While this Pokemon is active, the power of Dark-type moves used by active Pokemon is multiplied by 1.33.",
    "shortDesc": "While this Pokemon is active, a Dark move used by any Pokemon has 1.33x power."
  },
  "dauntlessshield": {
    "flags": {},
    "name": "Dauntless Shield",
    "rating": 3.5,
    "num": 235,
    "desc": "On switch-in, this Pokemon's Defense is raised by 1 stage. Once per battle.",
    "shortDesc": "On switch-in, this Pokemon's Defense is raised by 1 stage. Once per battle."
  },
  "dazzling": {
    "flags": {
      "breakable": 1
    },
    "name": "Dazzling",
    "rating": 2.5,
    "num": 219,
    "desc": "Priority moves used by opposing Pokemon targeting this Pokemon or its allies are prevented from having an effect.",
    "shortDesc": "This Pokemon and its allies are protected from opposing priority moves."
  },
  "defeatist": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Defeatist",
    "rating": -1,
    "num": 129,
    "desc": "While this Pokemon has 1/2 or less of its maximum HP, its Attack and Special Attack are halved.",
    "shortDesc": "While this Pokemon has 1/2 or less of its max HP, its Attack and Sp. Atk are halved."
  },
  "defiant": {
    "flags": {},
    "name": "Defiant",
    "rating": 3,
    "num": 128,
    "desc": "This Pokemon's Attack is raised by 2 stages for each of its stat stages that is lowered by an opposing Pokemon.",
    "shortDesc": "This Pokemon's Attack is raised by 2 for each of its stats that is lowered by a foe."
  },
  "deltastream": {
    "flags": {},
    "name": "Delta Stream",
    "rating": 4,
    "num": 191,
    "desc": "On switch-in, the weather becomes Delta Stream, which removes the weaknesses of the Flying type from Flying-type Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Desolate Land or Primordial Sea Abilities.",
    "shortDesc": "On switch-in, strong winds begin until this Ability is not active in battle."
  },
  "desolateland": {
    "flags": {},
    "name": "Desolate Land",
    "rating": 4.5,
    "num": 190,
    "desc": "On switch-in, the weather becomes Desolate Land, which includes all the effects of Sunny Day and prevents damaging Water-type moves from executing. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Delta Stream or Primordial Sea Abilities.",
    "shortDesc": "On switch-in, extremely harsh sunlight begins until this Ability is not active in battle."
  },
  "disguise": {
    "onDamagePriority": 1,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1,
      "breakable": 1,
      "notransform": 1
    },
    "name": "Disguise",
    "rating": 3.5,
    "num": 209,
    "desc": "If this Pokemon is a Mimikyu, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken, it changes to Busted Form, and it loses 1/8 of its max HP. Confusion damage also breaks the disguise.",
    "shortDesc": "(Mimikyu only) The first hit it takes is blocked, and it takes 1/8 HP damage instead."
  },
  "download": {
    "flags": {},
    "name": "Download",
    "rating": 3.5,
    "num": 88,
    "desc": "On switch-in, this Pokemon's Attack or Special Attack is raised by 1 stage based on the weaker combined defensive stat of all opposing Pokemon. Attack is raised if their Defense is lower, and Special Attack is raised if their Special Defense is the same or lower.",
    "shortDesc": "On switch-in, Attack or Sp. Atk is raised 1 stage based on the foes' weaker Defense."
  },
  "dragonsmaw": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Dragon's Maw",
    "rating": 3.5,
    "num": 263,
    "desc": "This Pokemon's offensive stat is multiplied by 1.5 while using a Dragon-type attack.",
    "shortDesc": "This Pokemon's offensive stat is multiplied by 1.5 while using a Dragon-type attack."
  },
  "drizzle": {
    "flags": {},
    "name": "Drizzle",
    "rating": 4,
    "num": 2,
    "desc": "On switch-in, this Pokemon summons Rain Dance.",
    "shortDesc": "On switch-in, this Pokemon summons Rain Dance."
  },
  "drought": {
    "flags": {},
    "name": "Drought",
    "rating": 4,
    "num": 70,
    "desc": "On switch-in, this Pokemon summons Sunny Day.",
    "shortDesc": "On switch-in, this Pokemon summons Sunny Day."
  },
  "dryskin": {
    "onSourceBasePowerPriority": 17,
    "flags": {
      "breakable": 1
    },
    "name": "Dry Skin",
    "rating": 3,
    "num": 87,
    "desc": "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move. The power of Fire-type moves is multiplied by 1.25 when used on this Pokemon. At the end of each turn, this Pokemon restores 1/8 of its maximum HP, rounded down, if the weather is Rain Dance, and loses 1/8 of its maximum HP, rounded down, if the weather is Sunny Day. The weather effects are prevented if this Pokemon is holding a Utility Umbrella.",
    "shortDesc": "This Pokemon is healed 1/4 by Water, 1/8 by Rain; is hurt 1.25x by Fire, 1/8 by Sun."
  },
  "earlybird": {
    "flags": {},
    "name": "Early Bird",
    "rating": 1.5,
    "num": 48,
    "desc": "This Pokemon's sleep counter drops by 2 instead of 1.",
    "shortDesc": "This Pokemon's sleep counter drops by 2 instead of 1."
  },
  "eartheater": {
    "flags": {
      "breakable": 1
    },
    "name": "Earth Eater",
    "rating": 3.5,
    "num": 297,
    "desc": "This Pokemon is immune to Ground-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Ground-type move.",
    "shortDesc": "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity."
  },
  "effectspore": {
    "flags": {},
    "name": "Effect Spore",
    "rating": 2,
    "num": 27,
    "desc": "30% chance a Pokemon making contact with this Pokemon will be poisoned, paralyzed, or fall asleep.",
    "shortDesc": "30% chance of poison/paralysis/sleep on others making contact with this Pokemon."
  },
  "electricsurge": {
    "flags": {},
    "name": "Electric Surge",
    "rating": 4,
    "num": 226,
    "desc": "On switch-in, this Pokemon summons Electric Terrain.",
    "shortDesc": "On switch-in, this Pokemon summons Electric Terrain."
  },
  "electromorphosis": {
    "onDamagingHitOrder": 1,
    "flags": {},
    "name": "Electromorphosis",
    "rating": 3,
    "num": 280,
    "desc": "This Pokemon gains the Charge effect when it takes a hit from an attack.",
    "shortDesc": "This Pokemon gains the Charge effect when it takes a hit from an attack."
  },
  "embodyaspectcornerstone": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Embody Aspect (Cornerstone)",
    "rating": 3.5,
    "num": 304,
    "desc": "On switch-in, this Pokemon's Defense is raised by 1 stage.",
    "shortDesc": "On switch-in, this Pokemon's Defense is raised by 1 stage."
  },
  "embodyaspecthearthflame": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Embody Aspect (Hearthflame)",
    "rating": 3.5,
    "num": 303,
    "desc": "On switch-in, this Pokemon's Attack is raised by 1 stage.",
    "shortDesc": "On switch-in, this Pokemon's Attack is raised by 1 stage."
  },
  "embodyaspectteal": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Embody Aspect (Teal)",
    "rating": 3.5,
    "num": 301,
    "desc": "On switch-in, this Pokemon's Speed is raised by 1 stage.",
    "shortDesc": "On switch-in, this Pokemon's Speed is raised by 1 stage."
  },
  "embodyaspectwellspring": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Embody Aspect (Wellspring)",
    "rating": 3.5,
    "num": 302,
    "desc": "On switch-in, this Pokemon's Special Defense is raised by 1 stage.",
    "shortDesc": "On switch-in, this Pokemon's Special Defense is raised by 1 stage."
  },
  "emergencyexit": {
    "flags": {},
    "name": "Emergency Exit",
    "rating": 1,
    "num": 194,
    "desc": "When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability. This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
    "shortDesc": "This Pokemon switches out when it reaches 1/2 or less of its maximum HP."
  },
  "fairyaura": {
    "onAnyBasePowerPriority": 20,
    "flags": {},
    "name": "Fairy Aura",
    "rating": 3,
    "num": 187,
    "desc": "While this Pokemon is active, the power of Fairy-type moves used by active Pokemon is multiplied by 1.33.",
    "shortDesc": "While this Pokemon is active, a Fairy move used by any Pokemon has 1.33x power."
  },
  "filter": {
    "flags": {
      "breakable": 1
    },
    "name": "Filter",
    "rating": 3,
    "num": 111,
    "desc": "This Pokemon receives 3/4 damage from supereffective attacks.",
    "shortDesc": "This Pokemon receives 3/4 damage from supereffective attacks."
  },
  "flamebody": {
    "flags": {},
    "name": "Flame Body",
    "rating": 2,
    "num": 49,
    "desc": "30% chance a Pokemon making contact with this Pokemon will be burned.",
    "shortDesc": "30% chance a Pokemon making contact with this Pokemon will be burned."
  },
  "flareboost": {
    "onBasePowerPriority": 19,
    "flags": {},
    "name": "Flare Boost",
    "rating": 2,
    "num": 138,
    "desc": "While this Pokemon is burned, the power of its special attacks is multiplied by 1.5.",
    "shortDesc": "While this Pokemon is burned, its special attacks have 1.5x power."
  },
  "flashfire": {
    "condition": {
      "noCopy": true,
      "onModifyAtkPriority": 5,
      "onModifySpAPriority": 5
    },
    "flags": {
      "breakable": 1
    },
    "name": "Flash Fire",
    "rating": 3.5,
    "num": 18,
    "desc": "This Pokemon is immune to Fire-type moves. The first time it is hit by a Fire-type move, its offensive stat is multiplied by 1.5 while using a Fire-type attack as long as it remains active and has this Ability. If this Pokemon is frozen, it cannot be defrosted by Fire-type attacks.",
    "shortDesc": "This Pokemon's Fire attacks do 1.5x damage if hit by one Fire move; Fire immunity."
  },
  "flowergift": {
    "onAllyModifyAtkPriority": 3,
    "onAllyModifySpDPriority": 4,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "breakable": 1
    },
    "name": "Flower Gift",
    "rating": 1,
    "num": 122,
    "desc": "If this Pokemon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and the Attack and Special Defense of it and its allies are multiplied by 1.5. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
    "shortDesc": "If user is Cherrim and Sunny Day is active, it and allies' Attack and Sp. Def are 1.5x."
  },
  "flowerveil": {
    "flags": {
      "breakable": 1
    },
    "name": "Flower Veil",
    "rating": 0,
    "num": 166,
    "desc": "Grass-type Pokemon on this Pokemon's side cannot have their stat stages lowered by other Pokemon or have a non-volatile status condition inflicted on them by other Pokemon.",
    "shortDesc": "This side's Grass types can't have stats lowered or status inflicted by other Pokemon."
  },
  "fluffy": {
    "flags": {
      "breakable": 1
    },
    "name": "Fluffy",
    "rating": 3.5,
    "num": 218,
    "desc": "This Pokemon receives 1/2 damage from contact moves, but double damage from Fire moves.",
    "shortDesc": "This Pokemon takes 1/2 damage from contact moves, 2x damage from Fire moves."
  },
  "forecast": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1
    },
    "name": "Forecast",
    "rating": 2,
    "num": 59,
    "desc": "If this Pokemon is a Castform, its type changes to the current weather condition's type, except Sandstorm. This effect is prevented if this Pokemon is holding a Utility Umbrella and the weather is Rain Dance or Sunny Day.",
    "shortDesc": "Castform's type changes to the current weather condition's type, except Sandstorm."
  },
  "forewarn": {
    "flags": {},
    "name": "Forewarn",
    "rating": 0.5,
    "num": 108,
    "desc": "On switch-in, this Pokemon is alerted to the move with the highest power, at random, known by an opposing Pokemon. This effect considers OHKO moves to have 150 power, Counter, Mirror Coat, and Metal Burst to have 120 power, every other attacking move with an unspecified power to have 80 power, and non-damaging moves to have 1 power.",
    "shortDesc": "On switch-in, this Pokemon is alerted to the foes' move with the highest power."
  },
  "friendguard": {
    "flags": {
      "breakable": 1
    },
    "name": "Friend Guard",
    "rating": 0,
    "num": 132,
    "desc": "This Pokemon's allies receive 3/4 damage from other Pokemon's attacks.",
    "shortDesc": "This Pokemon's allies receive 3/4 damage from other Pokemon's attacks."
  },
  "frisk": {
    "flags": {},
    "name": "Frisk",
    "rating": 1.5,
    "num": 119,
    "desc": "On switch-in, this Pokemon identifies the held items of all opposing Pokemon.",
    "shortDesc": "On switch-in, this Pokemon identifies the held items of all opposing Pokemon."
  },
  "fullmetalbody": {
    "flags": {},
    "name": "Full Metal Body",
    "rating": 2,
    "num": 230,
    "desc": "Prevents other Pokemon from lowering this Pokemon's stat stages.",
    "shortDesc": "Prevents other Pokemon from lowering this Pokemon's stat stages."
  },
  "furcoat": {
    "onModifyDefPriority": 6,
    "flags": {
      "breakable": 1
    },
    "name": "Fur Coat",
    "rating": 4,
    "num": 169,
    "desc": "This Pokemon's Defense is doubled.",
    "shortDesc": "This Pokemon's Defense is doubled."
  },
  "galewings": {
    "flags": {},
    "name": "Gale Wings",
    "rating": 1.5,
    "num": 177,
    "desc": "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 1.",
    "shortDesc": "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 1."
  },
  "galvanize": {
    "onModifyTypePriority": -1,
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Galvanize",
    "rating": 4,
    "num": 206,
    "desc": "This Pokemon's Normal-type moves become Electric-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    "shortDesc": "This Pokemon's Normal-type moves become Electric type and have 1.2x power."
  },
  "gluttony": {
    "flags": {},
    "name": "Gluttony",
    "rating": 1.5,
    "num": 82,
    "desc": "When this Pokemon is holding a Berry that usually activates with 1/4 or less of its maximum HP, it is eaten at 1/2 or less of its maximum HP instead.",
    "shortDesc": "This Pokemon eats Berries at 1/2 max HP or less instead of their usual 1/4 max HP."
  },
  "goodasgold": {
    "flags": {
      "breakable": 1
    },
    "name": "Good as Gold",
    "rating": 5,
    "num": 283,
    "desc": "This Pokemon is immune to Status moves.",
    "shortDesc": "This Pokemon is immune to Status moves."
  },
  "gooey": {
    "flags": {},
    "name": "Gooey",
    "rating": 2,
    "num": 183,
    "desc": "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
    "shortDesc": "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage."
  },
  "gorillatactics": {
    "onModifyAtkPriority": 1,
    "flags": {},
    "name": "Gorilla Tactics",
    "rating": 4.5,
    "num": 255,
    "desc": "This Pokemon's Attack is multiplied by 1.5, but it can only select the first move it executes. These effects are prevented while this Pokemon is Dynamaxed.",
    "shortDesc": "This Pokemon's Attack is 1.5x, but it can only select the first move it executes."
  },
  "grasspelt": {
    "onModifyDefPriority": 6,
    "flags": {
      "breakable": 1
    },
    "name": "Grass Pelt",
    "rating": 0.5,
    "num": 179,
    "desc": "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5.",
    "shortDesc": "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5."
  },
  "grassysurge": {
    "flags": {},
    "name": "Grassy Surge",
    "rating": 4,
    "num": 229,
    "desc": "On switch-in, this Pokemon summons Grassy Terrain.",
    "shortDesc": "On switch-in, this Pokemon summons Grassy Terrain."
  },
  "grimneigh": {
    "flags": {},
    "name": "Grim Neigh",
    "rating": 3,
    "num": 265,
    "desc": "This Pokemon's Special Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
    "shortDesc": "This Pokemon's Sp. Atk is raised by 1 stage if it attacks and KOes another Pokemon."
  },
  "guarddog": {
    "onDragOutPriority": 1,
    "flags": {
      "breakable": 1
    },
    "name": "Guard Dog",
    "rating": 2,
    "num": 275,
    "desc": "This Pokemon is immune to the effect of the Intimidate Ability and raises its Attack by 1 stage instead. This Pokemon cannot be forced to switch out by another Pokemon's attack or item.",
    "shortDesc": "Immune to Intimidate. Intimidated: +1 Attack. Cannot be forced to switch out."
  },
  "gulpmissile": {
    "flags": {
      "cantsuppress": 1,
      "notransform": 1
    },
    "name": "Gulp Missile",
    "rating": 2.5,
    "num": 241,
    "desc": "If this Pokemon is a Cramorant, it changes forme when it hits a target with Surf or uses the first turn of Dive successfully. It becomes Gulping Form with an Arrokuda in its mouth if it has more than 1/2 of its maximum HP remaining, or Gorging Form with a Pikachu in its mouth if it has 1/2 or less of its maximum HP remaining. If Cramorant gets hit in Gulping or Gorging Form, it spits the Arrokuda or Pikachu at its attacker, even if it has no HP remaining. The projectile deals damage equal to 1/4 of the target's maximum HP, rounded down; this damage is blocked by the Magic Guard Ability but not by a substitute. An Arrokuda also lowers the target's Defense by 1 stage, and a Pikachu paralyzes the target. Cramorant will return to normal if it spits out a projectile, switches out, or Dynamaxes.",
    "shortDesc": "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Defense or paralysis."
  },
  "guts": {
    "onModifyAtkPriority": 5,
    "flags": {},
    "name": "Guts",
    "rating": 3.5,
    "num": 62,
    "desc": "If this Pokemon has a non-volatile status condition, its Attack is multiplied by 1.5. This Pokemon's physical attacks ignore the burn effect of halving damage.",
    "shortDesc": "If this Pokemon is statused, its Attack is 1.5x; ignores burn halving physical damage."
  },
  "hadronengine": {
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Hadron Engine",
    "rating": 4.5,
    "num": 289,
    "desc": "On switch-in, summons Electric Terrain. During Electric Terrain, Sp. Atk is 1.3333x.",
    "shortDesc": "On switch-in, summons Electric Terrain. During Electric Terrain, Sp. Atk is 1.3333x."
  },
  "harvest": {
    "onResidualOrder": 28,
    "onResidualSubOrder": 2,
    "flags": {},
    "name": "Harvest",
    "rating": 2.5,
    "num": 139,
    "desc": "If the last item this Pokemon used is a Berry, there is a 50% chance it gets restored at the end of each turn. If Sunny Day is active, this chance is 100%.",
    "shortDesc": "If last item used is a Berry, 50% chance to restore it each end of turn. 100% in Sun."
  },
  "healer": {
    "onResidualOrder": 5,
    "onResidualSubOrder": 3,
    "flags": {},
    "name": "Healer",
    "rating": 0,
    "num": 131,
    "desc": "30% chance this Pokemon's ally has its non-volatile status condition cured at the end of each turn.",
    "shortDesc": "30% chance this Pokemon's ally has its status cured at the end of each turn."
  },
  "heatproof": {
    "onSourceModifyAtkPriority": 6,
    "onSourceModifySpAPriority": 5,
    "flags": {
      "breakable": 1
    },
    "name": "Heatproof",
    "rating": 2,
    "num": 85,
    "desc": "If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon. This Pokemon takes half of the usual burn damage, rounded down.",
    "shortDesc": "Fire damage against this Pokemon is dealt with 1/2 offensive stat; 1/2 burn damage."
  },
  "heavymetal": {
    "onModifyWeightPriority": 1,
    "flags": {
      "breakable": 1
    },
    "name": "Heavy Metal",
    "rating": 0,
    "num": 134,
    "desc": "This Pokemon's weight is doubled. This effect is calculated after the effect of Autotomize, and before the effect of Float Stone.",
    "shortDesc": "This Pokemon's weight is doubled."
  },
  "honeygather": {
    "flags": {},
    "name": "Honey Gather",
    "rating": 0,
    "num": 118,
    "desc": "No competitive use.",
    "shortDesc": "No competitive use."
  },
  "hospitality": {
    "flags": {},
    "name": "Hospitality",
    "rating": 0,
    "num": 299,
    "desc": "On switch-in, this Pokemon restores 1/4 of its ally's maximum HP, rounded down.",
    "shortDesc": "On switch-in, this Pokemon restores 1/4 of its ally's maximum HP, rounded down."
  },
  "hugepower": {
    "onModifyAtkPriority": 5,
    "flags": {},
    "name": "Huge Power",
    "rating": 5,
    "num": 37,
    "desc": "This Pokemon's Attack is doubled.",
    "shortDesc": "This Pokemon's Attack is doubled."
  },
  "hungerswitch": {
    "onResidualOrder": 29,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Hunger Switch",
    "rating": 1,
    "num": 258,
    "desc": "If this Pokemon is a Morpeko, it changes formes between its Full Belly Mode and Hangry Mode at the end of each turn.",
    "shortDesc": "If Morpeko, it changes between Full Belly and Hangry Mode at the end of each turn."
  },
  "hustle": {
    "onModifyAtkPriority": 5,
    "onSourceModifyAccuracyPriority": -1,
    "flags": {},
    "name": "Hustle",
    "rating": 3.5,
    "num": 55,
    "desc": "This Pokemon's Attack is multiplied by 1.5 and the accuracy of its physical attacks is multiplied by 0.8.",
    "shortDesc": "This Pokemon's Attack is 1.5x and accuracy of its physical attacks is 0.8x."
  },
  "hydration": {
    "onResidualOrder": 5,
    "onResidualSubOrder": 3,
    "flags": {},
    "name": "Hydration",
    "rating": 1.5,
    "num": 93,
    "desc": "This Pokemon has its non-volatile status condition cured at the end of each turn if Rain Dance is active. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    "shortDesc": "This Pokemon has its status cured at the end of each turn if Rain Dance is active."
  },
  "hypercutter": {
    "flags": {
      "breakable": 1
    },
    "name": "Hyper Cutter",
    "rating": 1.5,
    "num": 52,
    "desc": "Prevents other Pokemon from lowering this Pokemon's Attack stat stage.",
    "shortDesc": "Prevents other Pokemon from lowering this Pokemon's Attack stat stage."
  },
  "icebody": {
    "flags": {},
    "name": "Ice Body",
    "rating": 1,
    "num": 115,
    "desc": "If Snow is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn.",
    "shortDesc": "If Snow is active, this Pokemon heals 1/16 of its max HP each turn."
  },
  "iceface": {
    "onDamagePriority": 1,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1,
      "breakable": 1,
      "notransform": 1
    },
    "name": "Ice Face",
    "rating": 3,
    "num": 248,
    "desc": "If this Pokemon is an Eiscue, the first physical hit it takes in battle deals 0 neutral damage. Its ice face is then broken and it changes forme to Noice Face. Eiscue regains its Ice Face forme when Snow begins or when Eiscue switches in while Snow is active. Confusion damage also breaks the ice face.",
    "shortDesc": "If Eiscue, the first physical hit it takes deals 0 damage. Effect is restored in Snow."
  },
  "icescales": {
    "flags": {
      "breakable": 1
    },
    "name": "Ice Scales",
    "rating": 4,
    "num": 246,
    "desc": "This Pokemon receives 1/2 damage from special attacks.",
    "shortDesc": "This Pokemon receives 1/2 damage from special attacks."
  },
  "illuminate": {
    "flags": {
      "breakable": 1
    },
    "name": "Illuminate",
    "rating": 0.5,
    "num": 35,
    "desc": "Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
    "shortDesc": "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat."
  },
  "illusion": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1
    },
    "name": "Illusion",
    "rating": 4.5,
    "num": 149,
    "desc": "When this Pokemon switches in, it appears as the last unfainted Pokemon in its party until it takes direct damage from another Pokemon's attack. This Pokemon's actual level and HP are displayed instead of those of the mimicked Pokemon.",
    "shortDesc": "This Pokemon appears as the last Pokemon in the party until it takes direct damage."
  },
  "immunity": {
    "flags": {
      "breakable": 1
    },
    "name": "Immunity",
    "rating": 2,
    "num": 17,
    "desc": "This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it.",
    "shortDesc": "This Pokemon cannot be poisoned. Gaining this Ability while poisoned cures it."
  },
  "imposter": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1
    },
    "name": "Imposter",
    "rating": 5,
    "num": 150,
    "desc": "On switch-in, this Pokemon Transforms into the opposing Pokemon that is facing it. If there is no Pokemon at that position, this Pokemon does not Transform.",
    "shortDesc": "On switch-in, this Pokemon Transforms into the opposing Pokemon that is facing it."
  },
  "infiltrator": {
    "flags": {},
    "name": "Infiltrator",
    "rating": 2.5,
    "num": 151,
    "desc": "This Pokemon's moves ignore substitutes and the opposing side's Reflect, Light Screen, Safeguard, Mist, and Aurora Veil.",
    "shortDesc": "Moves ignore substitutes and foe's Reflect/Light Screen/Safeguard/Mist/Aurora Veil."
  },
  "innardsout": {
    "onDamagingHitOrder": 1,
    "flags": {},
    "name": "Innards Out",
    "rating": 4,
    "num": 215,
    "desc": "If this Pokemon is knocked out with a move, that move's user loses HP equal to the amount of damage inflicted on this Pokemon.",
    "shortDesc": "If this Pokemon is KOed with a move, that move's user loses an equal amount of HP."
  },
  "innerfocus": {
    "flags": {
      "breakable": 1
    },
    "name": "Inner Focus",
    "rating": 1,
    "num": 39,
    "desc": "This Pokemon cannot be made to flinch. This Pokemon is immune to the effect of the Intimidate Ability.",
    "shortDesc": "This Pokemon cannot be made to flinch. Immune to Intimidate."
  },
  "insomnia": {
    "flags": {
      "breakable": 1
    },
    "name": "Insomnia",
    "rating": 1.5,
    "num": 15,
    "desc": "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it.",
    "shortDesc": "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it."
  },
  "intimidate": {
    "flags": {},
    "name": "Intimidate",
    "rating": 3.5,
    "num": 22,
    "desc": "On switch-in, this Pokemon lowers the Attack of opposing Pokemon by 1 stage. Pokemon with the Inner Focus, Oblivious, Own Tempo, or Scrappy Abilities and Pokemon behind a substitute are immune.",
    "shortDesc": "On switch-in, this Pokemon lowers the Attack of opponents by 1 stage."
  },
  "intrepidsword": {
    "flags": {},
    "name": "Intrepid Sword",
    "rating": 4,
    "num": 234,
    "desc": "On switch-in, this Pokemon's Attack is raised by 1 stage. Once per battle.",
    "shortDesc": "On switch-in, this Pokemon's Attack is raised by 1 stage. Once per battle."
  },
  "ironbarbs": {
    "onDamagingHitOrder": 1,
    "flags": {},
    "name": "Iron Barbs",
    "rating": 2.5,
    "num": 160,
    "desc": "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down.",
    "shortDesc": "Pokemon making contact with this Pokemon lose 1/8 of their max HP."
  },
  "ironfist": {
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Iron Fist",
    "rating": 3,
    "num": 89,
    "desc": "This Pokemon's punch-based attacks have their power multiplied by 1.2.",
    "shortDesc": "This Pokemon's punch-based attacks have 1.2x power. Sucker Punch is not boosted."
  },
  "justified": {
    "flags": {},
    "name": "Justified",
    "rating": 2.5,
    "num": 154,
    "desc": "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move.",
    "shortDesc": "This Pokemon's Attack is raised by 1 stage after it is damaged by a Dark-type move."
  },
  "keeneye": {
    "flags": {
      "breakable": 1
    },
    "name": "Keen Eye",
    "rating": 0.5,
    "num": 51,
    "desc": "Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
    "shortDesc": "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat."
  },
  "klutz": {
    "flags": {},
    "name": "Klutz",
    "rating": -1,
    "num": 103,
    "desc": "This Pokemon's held item has no effect. This Pokemon cannot use Fling successfully. Macho Brace, Power Anklet, Power Band, Power Belt, Power Bracer, Power Lens, and Power Weight still have their effects.",
    "shortDesc": "This Pokemon's held item has no effect, except Macho Brace. Fling cannot be used."
  },
  "leafguard": {
    "flags": {
      "breakable": 1
    },
    "name": "Leaf Guard",
    "rating": 0.5,
    "num": 102,
    "desc": "If Sunny Day is active, this Pokemon cannot become affected by a non-volatile status condition or Yawn, and Rest will fail for it. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    "shortDesc": "If Sunny Day is active, this Pokemon cannot be statused and Rest will fail for it."
  },
  "levitate": {
    "flags": {
      "breakable": 1
    },
    "name": "Levitate",
    "rating": 3.5,
    "num": 26,
    "desc": "This Pokemon is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability. The effects of Gravity, Ingrain, Smack Down, Thousand Arrows, and Iron Ball nullify the immunity. Thousand Arrows can hit this Pokemon as if it did not have this Ability.",
    "shortDesc": "This Pokemon is immune to Ground; Gravity/Ingrain/Smack Down/Iron Ball nullify it."
  },
  "libero": {
    "flags": {},
    "name": "Libero",
    "rating": 4,
    "num": 236,
    "desc": "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type. This effect can only happen once per switch-in, and only if this Pokemon is not Terastallized.",
    "shortDesc": "This Pokemon's type changes to the type of the move it is using. Once per switch-in."
  },
  "lightmetal": {
    "flags": {
      "breakable": 1
    },
    "name": "Light Metal",
    "rating": 1,
    "num": 135,
    "desc": "This Pokemon's weight is halved, rounded down to a tenth of a kilogram. This effect is calculated after the effect of Autotomize, and before the effect of Float Stone. A Pokemon's weight will not drop below 0.1 kg.",
    "shortDesc": "This Pokemon's weight is halved."
  },
  "lightningrod": {
    "flags": {
      "breakable": 1
    },
    "name": "Lightning Rod",
    "rating": 3,
    "num": 31,
    "desc": "This Pokemon is immune to Electric-type moves and raises its Special Attack by 1 stage when hit by an Electric-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
    "shortDesc": "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity."
  },
  "limber": {
    "flags": {
      "breakable": 1
    },
    "name": "Limber",
    "rating": 2,
    "num": 7,
    "desc": "This Pokemon cannot be paralyzed. Gaining this Ability while paralyzed cures it.",
    "shortDesc": "This Pokemon cannot be paralyzed. Gaining this Ability while paralyzed cures it."
  },
  "lingeringaroma": {
    "flags": {},
    "name": "Lingering Aroma",
    "rating": 2,
    "num": 268,
    "desc": "Pokemon making contact with this Pokemon have their Ability changed to Lingering Aroma. Does not affect Pokemon with the As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Lingering Aroma, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Tera Shift, Zen Mode, or Zero to Hero Abilities.",
    "shortDesc": "Making contact with this Pokemon has the attacker's Ability become Lingering Aroma."
  },
  "liquidooze": {
    "flags": {},
    "name": "Liquid Ooze",
    "rating": 2.5,
    "num": 64,
    "desc": "This Pokemon damages those draining HP from it for as much as they would heal.",
    "shortDesc": "This Pokemon damages those draining HP from it for as much as they would heal."
  },
  "liquidvoice": {
    "onModifyTypePriority": -1,
    "flags": {},
    "name": "Liquid Voice",
    "rating": 1.5,
    "num": 204,
    "desc": "This Pokemon's sound-based moves become Water-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    "shortDesc": "This Pokemon's sound-based moves become Water type."
  },
  "longreach": {
    "flags": {},
    "name": "Long Reach",
    "rating": 1,
    "num": 203,
    "desc": "This Pokemon's attacks do not make contact with the target.",
    "shortDesc": "This Pokemon's attacks do not make contact with the target."
  },
  "magicbounce": {
    "onTryHitPriority": 1,
    "condition": {
      "duration": 1
    },
    "flags": {
      "breakable": 1
    },
    "name": "Magic Bounce",
    "rating": 4,
    "num": 156,
    "desc": "This Pokemon is unaffected by certain non-damaging moves directed at it and will instead use such moves against the original user. Moves reflected in this way are unable to be reflected again by this or Magic Coat's effect. Spikes, Stealth Rock, Sticky Web, and Toxic Spikes can only be reflected once per side, by the leftmost Pokemon under this or Magic Coat's effect. The Lightning Rod and Storm Drain Abilities redirect their respective moves before this Ability takes effect.",
    "shortDesc": "This Pokemon blocks certain Status moves and bounces them back to the user."
  },
  "magicguard": {
    "flags": {},
    "name": "Magic Guard",
    "rating": 4,
    "num": 98,
    "desc": "This Pokemon can only be damaged by direct attacks. Curse and Substitute on use, Belly Drum, Pain Split, Struggle recoil, and confusion damage are considered direct damage.",
    "shortDesc": "This Pokemon can only be damaged by direct attacks."
  },
  "magician": {
    "flags": {},
    "name": "Magician",
    "rating": 1,
    "num": 170,
    "desc": "If this Pokemon has no item, it steals the item off a Pokemon it hits with an attack. Does not affect Doom Desire and Future Sight.",
    "shortDesc": "If this Pokemon has no item, it steals the item off a Pokemon it hits with an attack."
  },
  "magmaarmor": {
    "flags": {
      "breakable": 1
    },
    "name": "Magma Armor",
    "rating": 0.5,
    "num": 40,
    "desc": "This Pokemon cannot be frozen. Gaining this Ability while frozen cures it.",
    "shortDesc": "This Pokemon cannot be frozen. Gaining this Ability while frozen cures it."
  },
  "magnetpull": {
    "flags": {},
    "name": "Magnet Pull",
    "rating": 4,
    "num": 42,
    "desc": "Prevents opposing Steel-type Pokemon from choosing to switch out, unless they are holding a Shed Shell or are a Ghost type.",
    "shortDesc": "Prevents opposing Steel-type Pokemon from choosing to switch out."
  },
  "marvelscale": {
    "onModifyDefPriority": 6,
    "flags": {
      "breakable": 1
    },
    "name": "Marvel Scale",
    "rating": 2.5,
    "num": 63,
    "desc": "If this Pokemon has a non-volatile status condition, its Defense is multiplied by 1.5.",
    "shortDesc": "If this Pokemon has a non-volatile status condition, its Defense is multiplied by 1.5."
  },
  "megalauncher": {
    "onBasePowerPriority": 19,
    "flags": {},
    "name": "Mega Launcher",
    "rating": 3,
    "num": 178,
    "desc": "This Pokemon's pulse moves have their power multiplied by 1.5. Heal Pulse restores 3/4 of a target's maximum HP, rounded half down.",
    "shortDesc": "This Pokemon's pulse moves have 1.5x power. Heal Pulse heals 3/4 target's max HP."
  },
  "merciless": {
    "flags": {},
    "name": "Merciless",
    "rating": 1.5,
    "num": 196,
    "desc": "This Pokemon's attacks are critical hits if the target is poisoned.",
    "shortDesc": "This Pokemon's attacks are critical hits if the target is poisoned."
  },
  "mimicry": {
    "flags": {},
    "name": "Mimicry",
    "rating": 0,
    "num": 250,
    "desc": "This Pokemon's types change to match the active Terrain when this Pokemon acquires this Ability, or whenever a Terrain begins. Electric type during Electric Terrain, Grass type during Grassy Terrain, Fairy type during Misty Terrain, and Psychic type during Psychic Terrain. If this Ability is acquired without an active Terrain, or a Terrain ends, this Pokemon's types become the original types for its species.",
    "shortDesc": "This Pokemon's types change to match the Terrain. Type reverts when Terrain ends."
  },
  "mindseye": {
    "onModifyMovePriority": -5,
    "flags": {
      "breakable": 1
    },
    "name": "Mind's Eye",
    "rating": 0,
    "num": 300,
    "desc": "This Pokemon can hit Ghost types with Normal- and Fighting-type moves. Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
    "shortDesc": "Fighting, Normal moves hit Ghost. Accuracy can't be lowered, ignores evasiveness."
  },
  "minus": {
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Minus",
    "rating": 0,
    "num": 58,
    "desc": "If an active ally has this Ability or the Plus Ability, this Pokemon's Special Attack is multiplied by 1.5.",
    "shortDesc": "If an active ally has this Ability or the Plus Ability, this Pokemon's Sp. Atk is 1.5x."
  },
  "mirrorarmor": {
    "flags": {
      "breakable": 1
    },
    "name": "Mirror Armor",
    "rating": 2,
    "num": 240,
    "desc": "When one of this Pokemon's stat stages would be lowered by another Pokemon, that Pokemon's stat stage is lowered instead. This effect does not happen if this Pokemon's stat stage was already -6. If the other Pokemon has a substitute, neither Pokemon has its stat stage lowered.",
    "shortDesc": "If this Pokemon's stat stages would be lowered, the attacker's are lowered instead."
  },
  "mistysurge": {
    "flags": {},
    "name": "Misty Surge",
    "rating": 3.5,
    "num": 228,
    "desc": "On switch-in, this Pokemon summons Misty Terrain.",
    "shortDesc": "On switch-in, this Pokemon summons Misty Terrain."
  },
  "moldbreaker": {
    "flags": {},
    "name": "Mold Breaker",
    "rating": 3,
    "num": 104,
    "desc": "This Pokemon's moves and their effects ignore certain Abilities of other Pokemon. The Abilities that can be negated are Armor Tail, Aroma Veil, Aura Break, Battle Armor, Big Pecks, Bulletproof, Clear Body, Contrary, Damp, Dazzling, Disguise, Dry Skin, Earth Eater, Filter, Flash Fire, Flower Gift, Flower Veil, Fluffy, Friend Guard, Fur Coat, Good as Gold, Grass Pelt, Guard Dog, Heatproof, Heavy Metal, Hyper Cutter, Ice Face, Ice Scales, Illuminate, Immunity, Inner Focus, Insomnia, Keen Eye, Leaf Guard, Levitate, Light Metal, Lightning Rod, Limber, Magic Bounce, Magma Armor, Marvel Scale, Mind's Eye, Mirror Armor, Motor Drive, Multiscale, Oblivious, Overcoat, Own Tempo, Pastel Veil, Punk Rock, Purifying Salt, Queenly Majesty, Sand Veil, Sap Sipper, Shell Armor, Shield Dust, Simple, Snow Cloak, Solid Rock, Soundproof, Sticky Hold, Storm Drain, Sturdy, Suction Cups, Sweet Veil, Tangled Feet, Telepathy, Tera Shell, Thermal Exchange, Thick Fat, Unaware, Vital Spirit, Volt Absorb, Water Absorb, Water Bubble, Water Veil, Well-Baked Body, White Smoke, Wind Rider, Wonder Guard, and Wonder Skin. This affects every other Pokemon on the field, whether or not it is a target of this Pokemon's move, and whether or not their Ability is beneficial to this Pokemon.",
    "shortDesc": "This Pokemon's moves and their effects ignore the Abilities of other Pokemon."
  },
  "moody": {
    "onResidualOrder": 28,
    "onResidualSubOrder": 2,
    "flags": {},
    "name": "Moody",
    "rating": 5,
    "num": 141,
    "desc": "This Pokemon has a random stat, other than accuracy or evasiveness, raised by 2 stages and another stat lowered by 1 stage at the end of each turn.",
    "shortDesc": "Boosts a random stat (except accuracy/evasion) +2 and another stat -1 every turn."
  },
  "motordrive": {
    "flags": {
      "breakable": 1
    },
    "name": "Motor Drive",
    "rating": 3,
    "num": 78,
    "desc": "This Pokemon is immune to Electric-type moves and raises its Speed by 1 stage when hit by an Electric-type move.",
    "shortDesc": "This Pokemon's Speed is raised 1 stage if hit by an Electric move; Electric immunity."
  },
  "moxie": {
    "flags": {},
    "name": "Moxie",
    "rating": 3,
    "num": 153,
    "desc": "This Pokemon's Attack is raised by 1 stage if it attacks and knocks out another Pokemon.",
    "shortDesc": "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon."
  },
  "multiscale": {
    "flags": {
      "breakable": 1
    },
    "name": "Multiscale",
    "rating": 3.5,
    "num": 136,
    "desc": "If this Pokemon is at full HP, damage taken from attacks is halved.",
    "shortDesc": "If this Pokemon is at full HP, damage taken from attacks is halved."
  },
  "multitype": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Multitype",
    "rating": 4,
    "num": 121,
    "desc": "If this Pokemon is an Arceus, its type changes to match its held Plate.",
    "shortDesc": "If this Pokemon is an Arceus, its type changes to match its held Plate."
  },
  "mummy": {
    "flags": {},
    "name": "Mummy",
    "rating": 2,
    "num": 152,
    "desc": "Pokemon making contact with this Pokemon have their Ability changed to Mummy. Does not affect Pokemon with the As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Mummy, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Tera Shift, Zen Mode, or Zero to Hero Abilities.",
    "shortDesc": "Pokemon making contact with this Pokemon have their Ability changed to Mummy."
  },
  "myceliummight": {
    "onFractionalPriorityPriority": -1,
    "flags": {},
    "name": "Mycelium Might",
    "rating": 2,
    "num": 298,
    "desc": "This Pokemon's Status moves ignore certain Abilities of other Pokemon, and go last among Pokemon using the same or greater priority moves.",
    "shortDesc": "This Pokemon's Status moves go last in their priority bracket and ignore Abilities."
  },
  "naturalcure": {
    "flags": {},
    "name": "Natural Cure",
    "rating": 2.5,
    "num": 30,
    "desc": "This Pokemon has its non-volatile status condition cured when it switches out.",
    "shortDesc": "This Pokemon has its non-volatile status condition cured when it switches out."
  },
  "neuroforce": {
    "flags": {},
    "name": "Neuroforce",
    "rating": 2.5,
    "num": 233,
    "desc": "This Pokemon's attacks that are super effective against the target have their damage multiplied by 1.25.",
    "shortDesc": "This Pokemon's attacks that are super effective against the target do 1.25x damage."
  },
  "neutralizinggas": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Neutralizing Gas",
    "rating": 3.5,
    "num": 256,
    "desc": "While this Pokemon is active, Abilities have no effect. This Ability activates before hazards and other Abilities take effect. Does not affect the As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Neutralizing Gas, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Tera Shift, Zen Mode, or Zero to Hero Abilities.",
    "shortDesc": "While this Pokemon is active, Abilities have no effect."
  },
  "noguard": {
    "onAnyInvulnerabilityPriority": 1,
    "flags": {},
    "name": "No Guard",
    "rating": 4,
    "num": 99,
    "desc": "Every move used by or against this Pokemon will always hit.",
    "shortDesc": "Every move used by or against this Pokemon will always hit."
  },
  "normalize": {
    "onModifyTypePriority": 1,
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Normalize",
    "rating": 0,
    "num": 96,
    "desc": "This Pokemon's moves are changed to be Normal type and have their power multiplied by 1.2. This effect comes before other effects that change a move's type.",
    "shortDesc": "This Pokemon's moves are changed to be Normal type and have 1.2x power."
  },
  "oblivious": {
    "flags": {
      "breakable": 1
    },
    "name": "Oblivious",
    "rating": 1.5,
    "num": 12,
    "desc": "This Pokemon cannot be infatuated or taunted. Gaining this Ability while infatuated or taunted cures it. This Pokemon is immune to the effect of the Intimidate Ability.",
    "shortDesc": "This Pokemon cannot be infatuated or taunted. Immune to Intimidate."
  },
  "opportunist": {
    "flags": {},
    "name": "Opportunist",
    "rating": 3,
    "num": 290,
    "desc": "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect.",
    "shortDesc": "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect."
  },
  "orichalcumpulse": {
    "onModifyAtkPriority": 5,
    "flags": {},
    "name": "Orichalcum Pulse",
    "rating": 4.5,
    "num": 288,
    "desc": "On switch-in, summons Sunny Day. During Sunny Day, Attack is 1.3333x.",
    "shortDesc": "On switch-in, summons Sunny Day. During Sunny Day, Attack is 1.3333x."
  },
  "overcoat": {
    "onTryHitPriority": 1,
    "flags": {
      "breakable": 1
    },
    "name": "Overcoat",
    "rating": 2,
    "num": 142,
    "desc": "This Pokemon is immune to powder moves, damage from Sandstorm, and the effects of Rage Powder and the Effect Spore Ability.",
    "shortDesc": "This Pokemon is immune to powder moves, Sandstorm damage, and Effect Spore."
  },
  "overgrow": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Overgrow",
    "rating": 2,
    "num": 65,
    "desc": "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 1.5 while using a Grass-type attack.",
    "shortDesc": "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Grass attacks."
  },
  "owntempo": {
    "flags": {
      "breakable": 1
    },
    "name": "Own Tempo",
    "rating": 1.5,
    "num": 20,
    "desc": "This Pokemon cannot be confused. Gaining this Ability while confused cures it. This Pokemon is immune to the effect of the Intimidate Ability.",
    "shortDesc": "This Pokemon cannot be confused. Immune to Intimidate."
  },
  "parentalbond": {
    "flags": {},
    "name": "Parental Bond",
    "rating": 4.5,
    "num": 185,
    "desc": "This Pokemon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect Doom Desire, Dragon Darts, Dynamax Cannon, Endeavor, Explosion, Final Gambit, Fling, Future Sight, Ice Ball, Rollout, Self-Destruct, any multi-hit move, any move that has multiple targets, or any two-turn move.",
    "shortDesc": "This Pokemon's damaging moves hit twice. The second hit has its damage quartered."
  },
  "pastelveil": {
    "flags": {
      "breakable": 1
    },
    "name": "Pastel Veil",
    "rating": 2,
    "num": 257,
    "desc": "This Pokemon and its allies cannot be poisoned. Gaining this Ability while this Pokemon or its ally is poisoned cures them. If this Ability is being ignored during an effect that causes poison, this Pokemon is cured immediately but its ally is not.",
    "shortDesc": "This Pokemon and its allies cannot be poisoned. On switch-in, cures poisoned allies."
  },
  "perishbody": {
    "flags": {},
    "name": "Perish Body",
    "rating": 1,
    "num": 253,
    "desc": "Making contact with this Pokemon starts the Perish Song effect for it and the attacker. This effect does not happen for this Pokemon if the attacker already has a perish count.",
    "shortDesc": "Making contact with this Pokemon starts the Perish Song effect for it and the attacker."
  },
  "pickpocket": {
    "flags": {},
    "name": "Pickpocket",
    "rating": 1,
    "num": 124,
    "desc": "If this Pokemon has no item and is hit by a contact move, it steals the attacker's item. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability.",
    "shortDesc": "If this Pokemon has no item and is hit by a contact move, it steals the attacker's item."
  },
  "pickup": {
    "onResidualOrder": 28,
    "onResidualSubOrder": 2,
    "flags": {},
    "name": "Pickup",
    "rating": 0.5,
    "num": 53,
    "desc": "If this Pokemon has no item, it finds one used by an adjacent Pokemon this turn.",
    "shortDesc": "If this Pokemon has no item, it finds one used by an adjacent Pokemon this turn."
  },
  "pixilate": {
    "onModifyTypePriority": -1,
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Pixilate",
    "rating": 4,
    "num": 182,
    "desc": "This Pokemon's Normal-type moves become Fairy-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    "shortDesc": "This Pokemon's Normal-type moves become Fairy type and have 1.2x power."
  },
  "plus": {
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Plus",
    "rating": 0,
    "num": 57,
    "desc": "If an active ally has this Ability or the Minus Ability, this Pokemon's Special Attack is multiplied by 1.5.",
    "shortDesc": "If an active ally has this Ability or the Minus Ability, this Pokemon's Sp. Atk is 1.5x."
  },
  "poisonheal": {
    "onDamagePriority": 1,
    "flags": {},
    "name": "Poison Heal",
    "rating": 4,
    "num": 90,
    "desc": "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
    "shortDesc": "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss."
  },
  "poisonpoint": {
    "flags": {},
    "name": "Poison Point",
    "rating": 1.5,
    "num": 38,
    "desc": "30% chance a Pokemon making contact with this Pokemon will be poisoned.",
    "shortDesc": "30% chance a Pokemon making contact with this Pokemon will be poisoned."
  },
  "poisonpuppeteer": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1
    },
    "name": "Poison Puppeteer",
    "rating": 3,
    "num": 310,
    "desc": "If this Pokemon is a Pecharunt and poisons or badly poisons a target, the target also becomes confused.",
    "shortDesc": "Pecharunt: If this Pokemon poisons a target, the target also becomes confused."
  },
  "poisontouch": {
    "flags": {},
    "name": "Poison Touch",
    "rating": 2,
    "num": 143,
    "desc": "This Pokemon's contact moves have a 30% chance of poisoning. This effect comes after a move's inherent secondary effect chance.",
    "shortDesc": "This Pokemon's contact moves have a 30% chance of poisoning."
  },
  "powerconstruct": {
    "onResidualOrder": 29,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Power Construct",
    "rating": 5,
    "num": 211,
    "desc": "If this Pokemon is a Zygarde in its 10% or 50% Forme, it changes to Complete Forme when it has 1/2 or less of its maximum HP at the end of the turn.",
    "shortDesc": "If Zygarde 10%/50%, changes to Complete if at 1/2 max HP or less at end of turn."
  },
  "powerofalchemy": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1
    },
    "name": "Power of Alchemy",
    "rating": 0,
    "num": 223,
    "desc": "This Pokemon copies the Ability of an ally that faints. Abilities that cannot be copied are As One, Battle Bond, Comatose, Commander, Disguise, Embody Aspect, Flower Gift, Forecast, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Poison Puppeteer, Power Construct, Power of Alchemy, Protosynthesis, Quark Drive, Receiver, RKS System, Schooling, Shields Down, Stance Change, Tera Shell, Tera Shift, Teraform Zero, Trace, Wonder Guard, Zen Mode, and Zero to Hero.",
    "shortDesc": "This Pokemon copies the Ability of an ally that faints."
  },
  "powerspot": {
    "onAllyBasePowerPriority": 22,
    "flags": {},
    "name": "Power Spot",
    "rating": 0,
    "num": 249,
    "desc": "This Pokemon's allies have the power of their moves multiplied by 1.3. This affects Doom Desire and Future Sight, even if the user is not on the field.",
    "shortDesc": "This Pokemon's allies have the power of their moves multiplied by 1.3."
  },
  "prankster": {
    "flags": {},
    "name": "Prankster",
    "rating": 4,
    "num": 158,
    "desc": "This Pokemon's non-damaging moves have their priority increased by 1. Opposing Dark-type Pokemon are immune to these moves, and any move called by these moves, if the resulting user of the move has this Ability.",
    "shortDesc": "This Pokemon's Status moves have priority raised by 1, but Dark types are immune."
  },
  "pressure": {
    "flags": {},
    "name": "Pressure",
    "rating": 2.5,
    "num": 46,
    "desc": "If this Pokemon is the target of an opposing Pokemon's move, that move loses one additional PP. Imprison, Snatch, and Tera Blast also lose one additional PP when used by an opposing Pokemon, but Sticky Web does not.",
    "shortDesc": "If this Pokemon is the target of a foe's move, that move loses one additional PP."
  },
  "primordialsea": {
    "flags": {},
    "name": "Primordial Sea",
    "rating": 4.5,
    "num": 189,
    "desc": "On switch-in, the weather becomes Primordial Sea, which includes all the effects of Rain Dance and prevents damaging Fire-type moves from executing. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Delta Stream or Desolate Land Abilities.",
    "shortDesc": "On switch-in, heavy rain begins until this Ability is not active in battle."
  },
  "prismarmor": {
    "flags": {},
    "name": "Prism Armor",
    "rating": 3,
    "num": 232,
    "desc": "This Pokemon receives 3/4 damage from supereffective attacks.",
    "shortDesc": "This Pokemon receives 3/4 damage from supereffective attacks."
  },
  "propellertail": {
    "onModifyMovePriority": 1,
    "flags": {},
    "name": "Propeller Tail",
    "rating": 0,
    "num": 239,
    "desc": "This Pokemon's moves cannot be redirected to a different target by any effect.",
    "shortDesc": "This Pokemon's moves cannot be redirected to a different target by any effect."
  },
  "protean": {
    "flags": {},
    "name": "Protean",
    "rating": 4,
    "num": 168,
    "desc": "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type. This effect can only happen once per switch-in, and only if this Pokemon is not Terastallized.",
    "shortDesc": "This Pokemon's type changes to the type of the move it is using. Once per switch-in."
  },
  "protosynthesis": {
    "condition": {
      "noCopy": true,
      "onModifyAtkPriority": 5,
      "onModifyDefPriority": 6,
      "onModifySpAPriority": 5,
      "onModifySpDPriority": 6
    },
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Protosynthesis",
    "rating": 3,
    "num": 281,
    "desc": "If Sunny Day is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3, or by 1.5 if the highest stat is Speed. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
    "shortDesc": "Sunny Day active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed."
  },
  "psychicsurge": {
    "flags": {},
    "name": "Psychic Surge",
    "rating": 4,
    "num": 227,
    "desc": "On switch-in, this Pokemon summons Psychic Terrain.",
    "shortDesc": "On switch-in, this Pokemon summons Psychic Terrain."
  },
  "punkrock": {
    "onBasePowerPriority": 7,
    "flags": {
      "breakable": 1
    },
    "name": "Punk Rock",
    "rating": 3.5,
    "num": 244,
    "desc": "This Pokemon's sound-based moves have their power multiplied by 1.3. This Pokemon takes halved damage from sound-based moves.",
    "shortDesc": "This Pokemon receives 1/2 damage from sound moves. Its own have 1.3x power."
  },
  "purepower": {
    "onModifyAtkPriority": 5,
    "flags": {},
    "name": "Pure Power",
    "rating": 5,
    "num": 74,
    "desc": "This Pokemon's Attack is doubled.",
    "shortDesc": "This Pokemon's Attack is doubled."
  },
  "purifyingsalt": {
    "onSourceModifyAtkPriority": 6,
    "onSourceModifySpAPriority": 5,
    "flags": {
      "breakable": 1
    },
    "name": "Purifying Salt",
    "rating": 4,
    "num": 272,
    "desc": "This Pokemon cannot become affected by a non-volatile status condition or Yawn. If a Pokemon uses a Ghost-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon.",
    "shortDesc": "Ghost damage to this Pokemon dealt with a halved offensive stat; can't be statused."
  },
  "quarkdrive": {
    "condition": {
      "noCopy": true,
      "onModifyAtkPriority": 5,
      "onModifyDefPriority": 6,
      "onModifySpAPriority": 5,
      "onModifySpDPriority": 6
    },
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "notransform": 1
    },
    "name": "Quark Drive",
    "rating": 3,
    "num": 282,
    "desc": "If Electric Terrain is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3, or by 1.5 if the highest stat is Speed. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Electric Terrain, a held Booster Energy will not activate and the effect ends when Electric Terrain is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
    "shortDesc": "Electric Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed."
  },
  "queenlymajesty": {
    "flags": {
      "breakable": 1
    },
    "name": "Queenly Majesty",
    "rating": 2.5,
    "num": 214,
    "desc": "Priority moves used by opposing Pokemon targeting this Pokemon or its allies are prevented from having an effect.",
    "shortDesc": "This Pokemon and its allies are protected from opposing priority moves."
  },
  "quickdraw": {
    "onFractionalPriorityPriority": -1,
    "flags": {},
    "name": "Quick Draw",
    "rating": 2.5,
    "num": 259,
    "desc": "This Pokemon has a 30% chance to move first in its priority bracket with attacking moves.",
    "shortDesc": "This Pokemon has a 30% chance to move first in its priority bracket with attacking moves."
  },
  "quickfeet": {
    "flags": {},
    "name": "Quick Feet",
    "rating": 2.5,
    "num": 95,
    "desc": "If this Pokemon has a non-volatile status condition, its Speed is multiplied by 1.5. This Pokemon ignores the paralysis effect of halving Speed.",
    "shortDesc": "If this Pokemon is statused, its Speed is 1.5x; ignores Speed drop from paralysis."
  },
  "raindish": {
    "flags": {},
    "name": "Rain Dish",
    "rating": 1.5,
    "num": 44,
    "desc": "If Rain Dance is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    "shortDesc": "If Rain Dance is active, this Pokemon heals 1/16 of its max HP each turn."
  },
  "rattled": {
    "flags": {},
    "name": "Rattled",
    "rating": 1,
    "num": 155,
    "desc": "This Pokemon's Speed is raised by 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or if an opposing Pokemon affected this Pokemon with the Intimidate Ability.",
    "shortDesc": "Speed is raised 1 stage if hit by a Bug-, Dark-, or Ghost-type attack, or Intimidated."
  },
  "receiver": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1
    },
    "name": "Receiver",
    "rating": 0,
    "num": 222,
    "desc": "This Pokemon copies the Ability of an ally that faints. Abilities that cannot be copied are As One, Battle Bond, Comatose, Commander, Disguise, Embody Aspect, Flower Gift, Forecast, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Poison Puppeteer, Power Construct, Power of Alchemy, Protosynthesis, Quark Drive, Receiver, RKS System, Schooling, Shields Down, Stance Change, Tera Shell, Tera Shift, Teraform Zero, Trace, Wonder Guard, Zen Mode, and Zero to Hero.",
    "shortDesc": "This Pokemon copies the Ability of an ally that faints."
  },
  "reckless": {
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Reckless",
    "rating": 3,
    "num": 120,
    "desc": "This Pokemon's attacks with recoil or crash damage have their power multiplied by 1.2. Does not affect Struggle.",
    "shortDesc": "This Pokemon's attacks with recoil or crash damage have 1.2x power; not Struggle."
  },
  "refrigerate": {
    "onModifyTypePriority": -1,
    "onBasePowerPriority": 23,
    "flags": {},
    "name": "Refrigerate",
    "rating": 4,
    "num": 174,
    "desc": "This Pokemon's Normal-type moves become Ice-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    "shortDesc": "This Pokemon's Normal-type moves become Ice type and have 1.2x power."
  },
  "regenerator": {
    "flags": {},
    "name": "Regenerator",
    "rating": 4.5,
    "num": 144,
    "desc": "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
    "shortDesc": "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out."
  },
  "ripen": {
    "onSourceModifyDamagePriority": -1,
    "onTryEatItemPriority": -1,
    "flags": {},
    "name": "Ripen",
    "rating": 2,
    "num": 247,
    "desc": "When this Pokemon eats certain Berries, the effects are doubled. Berries that restore HP or PP have the amount doubled, Berries that raise stat stages have the amount doubled, Berries that halve damage taken quarter it instead, and a Jaboca Berry or Rowap Berry has the attacker lose 1/4 of its maximum HP, rounded down.",
    "shortDesc": "When this Pokemon eats certain Berries, the effects are doubled."
  },
  "rivalry": {
    "onBasePowerPriority": 24,
    "flags": {},
    "name": "Rivalry",
    "rating": 0,
    "num": 79,
    "desc": "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender or multiplied by 0.75 against targets of the opposite gender. There is no modifier if either this Pokemon or the target is genderless.",
    "shortDesc": "This Pokemon's attacks do 1.25x on same gender targets; 0.75x on opposite gender."
  },
  "rkssystem": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "RKS System",
    "rating": 4,
    "num": 225,
    "desc": "If this Pokemon is a Silvally, its type changes to match its held Memory.",
    "shortDesc": "If this Pokemon is a Silvally, its type changes to match its held Memory."
  },
  "rockhead": {
    "flags": {},
    "name": "Rock Head",
    "rating": 3,
    "num": 69,
    "desc": "This Pokemon does not take recoil damage, except Struggle. Does not affect Life Orb damage or crash damage.",
    "shortDesc": "This Pokemon does not take recoil damage besides Struggle/Life Orb/crash damage."
  },
  "rockypayload": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Rocky Payload",
    "rating": 3.5,
    "num": 276,
    "desc": "This Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack.",
    "shortDesc": "This Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack."
  },
  "roughskin": {
    "onDamagingHitOrder": 1,
    "flags": {},
    "name": "Rough Skin",
    "rating": 2.5,
    "num": 24,
    "desc": "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down.",
    "shortDesc": "Pokemon making contact with this Pokemon lose 1/8 of their max HP."
  },
  "runaway": {
    "flags": {},
    "name": "Run Away",
    "rating": 0,
    "num": 50,
    "desc": "No competitive use.",
    "shortDesc": "No competitive use."
  },
  "sandforce": {
    "onBasePowerPriority": 21,
    "flags": {},
    "name": "Sand Force",
    "rating": 2,
    "num": 159,
    "desc": "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
    "shortDesc": "This Pokemon's Ground/Rock/Steel attacks do 1.3x in Sandstorm; immunity to it."
  },
  "sandrush": {
    "flags": {},
    "name": "Sand Rush",
    "rating": 3,
    "num": 146,
    "desc": "If Sandstorm is active, this Pokemon's Speed is doubled. This Pokemon takes no damage from Sandstorm.",
    "shortDesc": "If Sandstorm is active, this Pokemon's Speed is doubled; immunity to Sandstorm."
  },
  "sandspit": {
    "flags": {},
    "name": "Sand Spit",
    "rating": 1,
    "num": 245,
    "desc": "When this Pokemon is hit by an attack, the effect of Sandstorm begins.",
    "shortDesc": "When this Pokemon is hit by an attack, the effect of Sandstorm begins."
  },
  "sandstream": {
    "flags": {},
    "name": "Sand Stream",
    "rating": 4,
    "num": 45,
    "desc": "On switch-in, this Pokemon summons Sandstorm.",
    "shortDesc": "On switch-in, this Pokemon summons Sandstorm."
  },
  "sandveil": {
    "onModifyAccuracyPriority": -1,
    "flags": {
      "breakable": 1
    },
    "name": "Sand Veil",
    "rating": 1.5,
    "num": 8,
    "desc": "If Sandstorm is active, the accuracy of moves used against this Pokemon is multiplied by 0.8. This Pokemon takes no damage from Sandstorm.",
    "shortDesc": "If Sandstorm is active, this Pokemon's evasiveness is 1.25x; immunity to Sandstorm."
  },
  "sapsipper": {
    "onTryHitPriority": 1,
    "flags": {
      "breakable": 1
    },
    "name": "Sap Sipper",
    "rating": 3,
    "num": 157,
    "desc": "This Pokemon is immune to Grass-type moves and raises its Attack by 1 stage when hit by a Grass-type move.",
    "shortDesc": "This Pokemon's Attack is raised 1 stage if hit by a Grass move; Grass immunity."
  },
  "schooling": {
    "onResidualOrder": 29,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Schooling",
    "rating": 3,
    "num": 208,
    "desc": "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
    "shortDesc": "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form."
  },
  "scrappy": {
    "onModifyMovePriority": -5,
    "flags": {},
    "name": "Scrappy",
    "rating": 3,
    "num": 113,
    "desc": "This Pokemon can hit Ghost types with Normal- and Fighting-type moves. This Pokemon is immune to the effect of the Intimidate Ability.",
    "shortDesc": "Fighting, Normal moves hit Ghost. Immune to Intimidate."
  },
  "screencleaner": {
    "flags": {},
    "name": "Screen Cleaner",
    "rating": 2,
    "num": 251,
    "desc": "On switch-in, the effects of Aurora Veil, Light Screen, and Reflect end for both sides.",
    "shortDesc": "On switch-in, the effects of Aurora Veil, Light Screen, and Reflect end for both sides."
  },
  "seedsower": {
    "flags": {},
    "name": "Seed Sower",
    "rating": 2.5,
    "num": 269,
    "desc": "When this Pokemon is hit by an attack, the effect of Grassy Terrain begins.",
    "shortDesc": "When this Pokemon is hit by an attack, the effect of Grassy Terrain begins."
  },
  "serenegrace": {
    "onModifyMovePriority": -2,
    "flags": {},
    "name": "Serene Grace",
    "rating": 3.5,
    "num": 32,
    "desc": "This Pokemon's moves have their secondary effect chance doubled. This effect stacks with the Rainbow effect, except for secondary effects that cause the target to flinch.",
    "shortDesc": "This Pokemon's moves have their secondary effect chance doubled."
  },
  "shadowshield": {
    "flags": {},
    "name": "Shadow Shield",
    "rating": 3.5,
    "num": 231,
    "desc": "If this Pokemon is at full HP, damage taken from attacks is halved.",
    "shortDesc": "If this Pokemon is at full HP, damage taken from attacks is halved."
  },
  "shadowtag": {
    "flags": {},
    "name": "Shadow Tag",
    "rating": 5,
    "num": 23,
    "desc": "Prevents opposing Pokemon from choosing to switch out, unless they are holding a Shed Shell, are a Ghost type, or also have this Ability.",
    "shortDesc": "Prevents foes from choosing to switch unless they also have this Ability."
  },
  "sharpness": {
    "onBasePowerPriority": 19,
    "flags": {},
    "name": "Sharpness",
    "rating": 3.5,
    "num": 292,
    "desc": "This Pokemon's slicing moves have their power multiplied by 1.5.",
    "shortDesc": "This Pokemon's slicing moves have their power multiplied by 1.5."
  },
  "shedskin": {
    "onResidualOrder": 5,
    "onResidualSubOrder": 3,
    "flags": {},
    "name": "Shed Skin",
    "rating": 3,
    "num": 61,
    "desc": "This Pokemon has a 33% chance to have its non-volatile status condition cured at the end of each turn.",
    "shortDesc": "This Pokemon has a 33% chance to have its status cured at the end of each turn."
  },
  "sheerforce": {
    "onBasePowerPriority": 21,
    "flags": {},
    "name": "Sheer Force",
    "rating": 3.5,
    "num": 125,
    "desc": "This Pokemon's attacks with secondary effects have their power multiplied by 1.3, but the secondary effects are removed. If a secondary effect was removed, it also removes the user's Life Orb recoil and Shell Bell recovery, and prevents the target's Anger Shell, Berserk, Color Change, Emergency Exit, Pickpocket, Wimp Out, Red Card, Eject Button, Kee Berry, and Maranga Berry from activating.",
    "shortDesc": "This Pokemon's attacks with secondary effects have 1.3x power; nullifies the effects."
  },
  "shellarmor": {
    "onCriticalHit": false,
    "flags": {
      "breakable": 1
    },
    "name": "Shell Armor",
    "rating": 1,
    "num": 75,
    "desc": "This Pokemon cannot be struck by a critical hit.",
    "shortDesc": "This Pokemon cannot be struck by a critical hit."
  },
  "shielddust": {
    "flags": {
      "breakable": 1
    },
    "name": "Shield Dust",
    "rating": 2,
    "num": 19,
    "desc": "This Pokemon is not affected by the secondary effect of another Pokemon's attack.",
    "shortDesc": "This Pokemon is not affected by the secondary effect of another Pokemon's attack."
  },
  "shieldsdown": {
    "onResidualOrder": 29,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Shields Down",
    "rating": 3,
    "num": 197,
    "desc": "If this Pokemon is a Minior, it changes to its Core forme if it has 1/2 or less of its maximum HP, and changes to Meteor Form if it has more than 1/2 its maximum HP. This check is done on switch-in and at the end of each turn. While in its Meteor Form, it cannot become affected by a non-volatile status condition or Yawn.",
    "shortDesc": "If Minior, switch-in/end of turn it changes to Core at 1/2 max HP or less, else Meteor."
  },
  "simple": {
    "flags": {
      "breakable": 1
    },
    "name": "Simple",
    "rating": 4,
    "num": 86,
    "desc": "When one of this Pokemon's stat stages is raised or lowered, the amount is doubled.",
    "shortDesc": "When one of this Pokemon's stat stages is raised or lowered, the amount is doubled."
  },
  "skilllink": {
    "flags": {},
    "name": "Skill Link",
    "rating": 3,
    "num": 92,
    "desc": "This Pokemon's multi-hit attacks always hit the maximum number of times. Triple Kick and Triple Axel do not check accuracy for the second and third hits.",
    "shortDesc": "This Pokemon's multi-hit attacks always hit the maximum number of times."
  },
  "slowstart": {
    "condition": {
      "duration": 5,
      "onResidualOrder": 28,
      "onResidualSubOrder": 2,
      "onModifyAtkPriority": 5
    },
    "flags": {},
    "name": "Slow Start",
    "rating": -1,
    "num": 112,
    "desc": "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns.",
    "shortDesc": "On switch-in, this Pokemon's Attack and Speed are halved for 5 turns."
  },
  "slushrush": {
    "flags": {},
    "name": "Slush Rush",
    "rating": 3,
    "num": 202,
    "desc": "If Snow is active, this Pokemon's Speed is doubled.",
    "shortDesc": "If Snow is active, this Pokemon's Speed is doubled."
  },
  "sniper": {
    "flags": {},
    "name": "Sniper",
    "rating": 2,
    "num": 97,
    "desc": "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.5.",
    "shortDesc": "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.5."
  },
  "snowcloak": {
    "onModifyAccuracyPriority": -1,
    "flags": {
      "breakable": 1
    },
    "name": "Snow Cloak",
    "rating": 1.5,
    "num": 81,
    "desc": "If Snow is active, the accuracy of moves used against this Pokemon is multiplied by 0.8.",
    "shortDesc": "If Snow is active, this Pokemon's evasiveness is 1.25x."
  },
  "snowwarning": {
    "flags": {},
    "name": "Snow Warning",
    "rating": 4,
    "num": 117,
    "desc": "On switch-in, this Pokemon summons Snow.",
    "shortDesc": "On switch-in, this Pokemon summons Snow."
  },
  "solarpower": {
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Solar Power",
    "rating": 2,
    "num": 94,
    "desc": "If Sunny Day is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
    "shortDesc": "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/8 max HP per turn."
  },
  "solidrock": {
    "flags": {
      "breakable": 1
    },
    "name": "Solid Rock",
    "rating": 3,
    "num": 116,
    "desc": "This Pokemon receives 3/4 damage from supereffective attacks.",
    "shortDesc": "This Pokemon receives 3/4 damage from supereffective attacks."
  },
  "soulheart": {
    "onAnyFaintPriority": 1,
    "flags": {},
    "name": "Soul-Heart",
    "rating": 3.5,
    "num": 220,
    "desc": "This Pokemon's Special Attack is raised by 1 stage when another Pokemon faints.",
    "shortDesc": "This Pokemon's Special Attack is raised by 1 stage when another Pokemon faints."
  },
  "soundproof": {
    "flags": {
      "breakable": 1
    },
    "name": "Soundproof",
    "rating": 2,
    "num": 43,
    "desc": "This Pokemon is immune to sound-based moves, unless it used the move.",
    "shortDesc": "This Pokemon is immune to sound-based moves, unless it used the move."
  },
  "speedboost": {
    "onResidualOrder": 28,
    "onResidualSubOrder": 2,
    "flags": {},
    "name": "Speed Boost",
    "rating": 4.5,
    "num": 3,
    "desc": "This Pokemon's Speed is raised by 1 stage at the end of each full turn it has been on the field.",
    "shortDesc": "This Pokemon's Speed is raised 1 stage at the end of each full turn on the field."
  },
  "stakeout": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Stakeout",
    "rating": 4.5,
    "num": 198,
    "desc": "This Pokemon's offensive stat is doubled against a target that switched in this turn.",
    "shortDesc": "This Pokemon's offensive stat is doubled against a target that switched in this turn."
  },
  "stall": {
    "onFractionalPriority": -0.1,
    "flags": {},
    "name": "Stall",
    "rating": -1,
    "num": 100,
    "desc": "This Pokemon moves last among Pokemon using the same or greater priority moves.",
    "shortDesc": "This Pokemon moves last among Pokemon using the same or greater priority moves."
  },
  "stalwart": {
    "onModifyMovePriority": 1,
    "flags": {},
    "name": "Stalwart",
    "rating": 0,
    "num": 242,
    "desc": "This Pokemon's moves cannot be redirected to a different target by any effect.",
    "shortDesc": "This Pokemon's moves cannot be redirected to a different target by any effect."
  },
  "stamina": {
    "flags": {},
    "name": "Stamina",
    "rating": 4,
    "num": 192,
    "desc": "This Pokemon's Defense is raised by 1 stage after it is damaged by a move.",
    "shortDesc": "This Pokemon's Defense is raised by 1 stage after it is damaged by a move."
  },
  "stancechange": {
    "onModifyMovePriority": 1,
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Stance Change",
    "rating": 4,
    "num": 176,
    "desc": "If this Pokemon is an Aegislash, it changes to Blade Forme before using an attacking move, and changes to Shield Forme before using King's Shield.",
    "shortDesc": "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield."
  },
  "static": {
    "flags": {},
    "name": "Static",
    "rating": 2,
    "num": 9,
    "desc": "30% chance a Pokemon making contact with this Pokemon will be paralyzed.",
    "shortDesc": "30% chance a Pokemon making contact with this Pokemon will be paralyzed."
  },
  "steadfast": {
    "flags": {},
    "name": "Steadfast",
    "rating": 1,
    "num": 80,
    "desc": "If this Pokemon flinches, its Speed is raised by 1 stage.",
    "shortDesc": "If this Pokemon flinches, its Speed is raised by 1 stage."
  },
  "steamengine": {
    "flags": {},
    "name": "Steam Engine",
    "rating": 2,
    "num": 243,
    "desc": "This Pokemon's Speed is raised by 6 stages after it is damaged by a Fire- or Water-type move.",
    "shortDesc": "This Pokemon's Speed is raised by 6 stages after it is damaged by Fire/Water moves."
  },
  "steelworker": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Steelworker",
    "rating": 3.5,
    "num": 200,
    "desc": "This Pokemon's offensive stat is multiplied by 1.5 while using a Steel-type attack.",
    "shortDesc": "This Pokemon's offensive stat is multiplied by 1.5 while using a Steel-type attack."
  },
  "steelyspirit": {
    "onAllyBasePowerPriority": 22,
    "flags": {},
    "name": "Steely Spirit",
    "rating": 3.5,
    "num": 252,
    "desc": "This Pokemon and its allies' Steel-type moves have their power multiplied by 1.5. This affects Doom Desire even if the user is not on the field.",
    "shortDesc": "This Pokemon and its allies' Steel-type moves have their power multiplied by 1.5."
  },
  "stench": {
    "onModifyMovePriority": -1,
    "flags": {},
    "name": "Stench",
    "rating": 0.5,
    "num": 1,
    "desc": "This Pokemon's attacks without a chance to make the target flinch gain a 10% chance to make the target flinch.",
    "shortDesc": "This Pokemon's attacks without a chance to flinch gain a 10% chance to flinch."
  },
  "stickyhold": {
    "flags": {
      "breakable": 1
    },
    "name": "Sticky Hold",
    "rating": 1.5,
    "num": 60,
    "desc": "This Pokemon cannot lose its held item due to another Pokemon's Ability or attack, unless the attack knocks out this Pokemon. A Sticky Barb will be transferred to other Pokemon regardless of this Ability.",
    "shortDesc": "This Pokemon cannot lose its held item due to another Pokemon's Ability or attack."
  },
  "stormdrain": {
    "flags": {
      "breakable": 1
    },
    "name": "Storm Drain",
    "rating": 3,
    "num": 114,
    "desc": "This Pokemon is immune to Water-type moves and raises its Special Attack by 1 stage when hit by a Water-type move. If this Pokemon is not the target of a single-target Water-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
    "shortDesc": "This Pokemon draws Water moves to itself to raise Sp. Atk by 1; Water immunity."
  },
  "strongjaw": {
    "onBasePowerPriority": 19,
    "flags": {},
    "name": "Strong Jaw",
    "rating": 3.5,
    "num": 173,
    "desc": "This Pokemon's bite-based attacks have their power multiplied by 1.5.",
    "shortDesc": "This Pokemon's bite-based attacks have 1.5x power. Bug Bite is not boosted."
  },
  "sturdy": {
    "onDamagePriority": -30,
    "flags": {
      "breakable": 1
    },
    "name": "Sturdy",
    "rating": 3,
    "num": 5,
    "desc": "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
    "shortDesc": "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO."
  },
  "suctioncups": {
    "onDragOutPriority": 1,
    "flags": {
      "breakable": 1
    },
    "name": "Suction Cups",
    "rating": 1,
    "num": 21,
    "desc": "This Pokemon cannot be forced to switch out by another Pokemon's attack or item.",
    "shortDesc": "This Pokemon cannot be forced to switch out by another Pokemon's attack or item."
  },
  "superluck": {
    "flags": {},
    "name": "Super Luck",
    "rating": 1.5,
    "num": 105,
    "desc": "This Pokemon's critical hit ratio is raised by 1 stage.",
    "shortDesc": "This Pokemon's critical hit ratio is raised by 1 stage."
  },
  "supersweetsyrup": {
    "flags": {},
    "name": "Supersweet Syrup",
    "rating": 1.5,
    "num": 306,
    "desc": "On switch-in, this Pokemon lowers the evasiveness of opponents 1 stage. Once per battle.",
    "shortDesc": "On switch-in, this Pokemon lowers the evasiveness of opponents 1 stage. Once per battle."
  },
  "supremeoverlord": {
    "onBasePowerPriority": 21,
    "flags": {},
    "name": "Supreme Overlord",
    "rating": 4,
    "num": 293,
    "desc": "This Pokemon's moves have their power multiplied by 1+(X*0.1), where X is the total number of times any Pokemon has fainted on the user's side when this Ability became active, and X cannot be greater than 5.",
    "shortDesc": "This Pokemon's moves have 10% more power for each fainted ally, up to 5 allies."
  },
  "surgesurfer": {
    "flags": {},
    "name": "Surge Surfer",
    "rating": 3,
    "num": 207,
    "desc": "If Electric Terrain is active, this Pokemon's Speed is doubled.",
    "shortDesc": "If Electric Terrain is active, this Pokemon's Speed is doubled."
  },
  "swarm": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Swarm",
    "rating": 2,
    "num": 68,
    "desc": "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 1.5 while using a Bug-type attack.",
    "shortDesc": "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Bug attacks."
  },
  "sweetveil": {
    "flags": {
      "breakable": 1
    },
    "name": "Sweet Veil",
    "rating": 2,
    "num": 175,
    "desc": "This Pokemon and its allies cannot fall asleep, but those already asleep do not wake up immediately. This Pokemon and its allies cannot use Rest successfully or become affected by Yawn, and those previously affected will not fall asleep.",
    "shortDesc": "This Pokemon and its allies cannot fall asleep; those already asleep do not wake up."
  },
  "swiftswim": {
    "flags": {},
    "name": "Swift Swim",
    "rating": 3,
    "num": 33,
    "desc": "If Rain Dance is active, this Pokemon's Speed is doubled. This effect is prevented if this Pokemon is holding a Utility Umbrella.",
    "shortDesc": "If Rain Dance is active, this Pokemon's Speed is doubled."
  },
  "symbiosis": {
    "flags": {},
    "name": "Symbiosis",
    "rating": 0,
    "num": 180,
    "desc": "If an ally uses its item, this Pokemon gives its item to that ally immediately. Does not activate if the ally's item was stolen or knocked off, or if the ally used an Eject Button or Eject Pack.",
    "shortDesc": "If an ally uses its item, this Pokemon gives its item to that ally immediately."
  },
  "synchronize": {
    "flags": {},
    "name": "Synchronize",
    "rating": 2,
    "num": 28,
    "desc": "If another Pokemon burns, paralyzes, poisons, or badly poisons this Pokemon, that Pokemon receives the same non-volatile status condition.",
    "shortDesc": "If another Pokemon burns/poisons/paralyzes this Pokemon, it also gets that status."
  },
  "swordofruin": {
    "flags": {},
    "name": "Sword of Ruin",
    "rating": 4.5,
    "num": 285,
    "desc": "Active Pokemon without this Ability have their Defense multiplied by 0.75.",
    "shortDesc": "Active Pokemon without this Ability have their Defense multiplied by 0.75."
  },
  "tabletsofruin": {
    "flags": {},
    "name": "Tablets of Ruin",
    "rating": 4.5,
    "num": 284,
    "desc": "Active Pokemon without this Ability have their Attack multiplied by 0.75.",
    "shortDesc": "Active Pokemon without this Ability have their Attack multiplied by 0.75."
  },
  "tangledfeet": {
    "onModifyAccuracyPriority": -1,
    "flags": {
      "breakable": 1
    },
    "name": "Tangled Feet",
    "rating": 1,
    "num": 77,
    "desc": "This Pokemon's evasiveness is doubled as long as it is confused.",
    "shortDesc": "This Pokemon's evasiveness is doubled as long as it is confused."
  },
  "tanglinghair": {
    "flags": {},
    "name": "Tangling Hair",
    "rating": 2,
    "num": 221,
    "desc": "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage.",
    "shortDesc": "Pokemon making contact with this Pokemon have their Speed lowered by 1 stage."
  },
  "technician": {
    "onBasePowerPriority": 30,
    "flags": {},
    "name": "Technician",
    "rating": 3.5,
    "num": 101,
    "desc": "This Pokemon's moves of 60 power or less have their power multiplied by 1.5, including Struggle. This effect comes after a move's effect changes its own power.",
    "shortDesc": "This Pokemon's moves of 60 power or less have 1.5x power, including Struggle."
  },
  "telepathy": {
    "flags": {
      "breakable": 1
    },
    "name": "Telepathy",
    "rating": 0,
    "num": 140,
    "desc": "This Pokemon does not take damage from attacks made by its allies.",
    "shortDesc": "This Pokemon does not take damage from attacks made by its allies."
  },
  "teraformzero": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1
    },
    "name": "Teraform Zero",
    "rating": 3,
    "num": 309,
    "desc": "Terapagos: Terastallizing ends the effects of weather and terrain. Once per battle.",
    "shortDesc": "Terapagos: Terastallizing ends the effects of weather and terrain. Once per battle."
  },
  "terashell": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "breakable": 1
    },
    "name": "Tera Shell",
    "rating": 3.5,
    "num": 308,
    "desc": "If this Pokemon is a Terapagos at full HP, the effectiveness of attacks against it is changed to 0.5 unless this Pokemon is immune to the move. Multi-hit moves retain the same effectiveness throughout the attack.",
    "shortDesc": "Terapagos: If full HP, attacks taken have 0.5x effectiveness unless naturally immune."
  },
  "terashift": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1,
      "notransform": 1
    },
    "name": "Tera Shift",
    "rating": 3,
    "num": 307,
    "desc": "If this Pokemon is a Terapagos, it transforms into its Terastal Form on entry.",
    "shortDesc": "If this Pokemon is a Terapagos, it transforms into its Terastal Form on entry."
  },
  "teravolt": {
    "flags": {},
    "name": "Teravolt",
    "rating": 3,
    "num": 164,
    "desc": "This Pokemon's moves and their effects ignore certain Abilities of other Pokemon. The Abilities that can be negated are Armor Tail, Aroma Veil, Aura Break, Battle Armor, Big Pecks, Bulletproof, Clear Body, Contrary, Damp, Dazzling, Disguise, Dry Skin, Earth Eater, Filter, Flash Fire, Flower Gift, Flower Veil, Fluffy, Friend Guard, Fur Coat, Good as Gold, Grass Pelt, Guard Dog, Heatproof, Heavy Metal, Hyper Cutter, Ice Face, Ice Scales, Illuminate, Immunity, Inner Focus, Insomnia, Keen Eye, Leaf Guard, Levitate, Light Metal, Lightning Rod, Limber, Magic Bounce, Magma Armor, Marvel Scale, Mind's Eye, Mirror Armor, Motor Drive, Multiscale, Oblivious, Overcoat, Own Tempo, Pastel Veil, Punk Rock, Purifying Salt, Queenly Majesty, Sand Veil, Sap Sipper, Shell Armor, Shield Dust, Simple, Snow Cloak, Solid Rock, Soundproof, Sticky Hold, Storm Drain, Sturdy, Suction Cups, Sweet Veil, Tangled Feet, Telepathy, Tera Shell, Thermal Exchange, Thick Fat, Unaware, Vital Spirit, Volt Absorb, Water Absorb, Water Bubble, Water Veil, Well-Baked Body, White Smoke, Wind Rider, Wonder Guard, and Wonder Skin. This affects every other Pokemon on the field, whether or not it is a target of this Pokemon's move, and whether or not their Ability is beneficial to this Pokemon.",
    "shortDesc": "This Pokemon's moves and their effects ignore the Abilities of other Pokemon."
  },
  "thermalexchange": {
    "flags": {
      "breakable": 1
    },
    "name": "Thermal Exchange",
    "rating": 2.5,
    "num": 270,
    "desc": "This Pokemon's Attack is raised 1 stage after it is damaged by a Fire-type move. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
    "shortDesc": "This Pokemon's Attack is raised by 1 when damaged by Fire moves; can't be burned."
  },
  "thickfat": {
    "onSourceModifyAtkPriority": 6,
    "onSourceModifySpAPriority": 5,
    "flags": {
      "breakable": 1
    },
    "name": "Thick Fat",
    "rating": 3.5,
    "num": 47,
    "desc": "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon.",
    "shortDesc": "Fire-/Ice-type moves against this Pokemon deal damage with a halved offensive stat."
  },
  "tintedlens": {
    "flags": {},
    "name": "Tinted Lens",
    "rating": 4,
    "num": 110,
    "desc": "This Pokemon's attacks that are not very effective on a target deal double damage.",
    "shortDesc": "This Pokemon's attacks that are not very effective on a target deal double damage."
  },
  "torrent": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Torrent",
    "rating": 2,
    "num": 67,
    "desc": "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 1.5 while using a Water-type attack.",
    "shortDesc": "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Water attacks."
  },
  "toughclaws": {
    "onBasePowerPriority": 21,
    "flags": {},
    "name": "Tough Claws",
    "rating": 3.5,
    "num": 181,
    "desc": "This Pokemon's contact moves have their power multiplied by 1.3.",
    "shortDesc": "This Pokemon's contact moves have their power multiplied by 1.3."
  },
  "toxicboost": {
    "onBasePowerPriority": 19,
    "flags": {},
    "name": "Toxic Boost",
    "rating": 3,
    "num": 137,
    "desc": "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 1.5.",
    "shortDesc": "While this Pokemon is poisoned, its physical attacks have 1.5x power."
  },
  "toxicchain": {
    "flags": {},
    "name": "Toxic Chain",
    "rating": 4.5,
    "num": 305,
    "desc": "This Pokemon's moves have a 30% chance of badly poisoning. This effect comes after a move's inherent secondary effect chance.",
    "shortDesc": "This Pokemon's moves have a 30% chance of badly poisoning."
  },
  "toxicdebris": {
    "flags": {},
    "name": "Toxic Debris",
    "rating": 3.5,
    "num": 295,
    "desc": "If this Pokemon is hit by a physical attack, Toxic Spikes are set on the opposing side.",
    "shortDesc": "If this Pokemon is hit by a physical attack, Toxic Spikes are set on the opposing side."
  },
  "trace": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1
    },
    "name": "Trace",
    "rating": 2.5,
    "num": 36,
    "desc": "On switch-in, this Pokemon copies a random opposing Pokemon's Ability. Abilities that cannot be copied are As One, Battle Bond, Comatose, Commander, Disguise, Embody Aspect, Flower Gift, Forecast, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Poison Puppeteer, Power Construct, Power of Alchemy, Protosynthesis, Quark Drive, Receiver, RKS System, Schooling, Shields Down, Stance Change, Teraform Zero, Tera Shell, Tera Shift, Trace, Zen Mode, and Zero to Hero. If no opposing Pokemon has an Ability that can be copied, this Ability will activate as soon as one does.",
    "shortDesc": "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability."
  },
  "transistor": {
    "onModifyAtkPriority": 5,
    "onModifySpAPriority": 5,
    "flags": {},
    "name": "Transistor",
    "rating": 3.5,
    "num": 262,
    "desc": "This Pokemon's offensive stat is multiplied by 1.3 while using an Electric-type attack.",
    "shortDesc": "This Pokemon's offensive stat is multiplied by 1.3 while using an Electric-type attack."
  },
  "triage": {
    "flags": {},
    "name": "Triage",
    "rating": 3.5,
    "num": 205,
    "desc": "This Pokemon's healing moves have their priority increased by 3.",
    "shortDesc": "This Pokemon's healing moves have their priority increased by 3."
  },
  "truant": {
    "onBeforeMovePriority": 9,
    "condition": {},
    "flags": {},
    "name": "Truant",
    "rating": -1,
    "num": 54,
    "desc": "This Pokemon skips every other turn instead of using a move.",
    "shortDesc": "This Pokemon skips every other turn instead of using a move."
  },
  "turboblaze": {
    "flags": {},
    "name": "Turboblaze",
    "rating": 3,
    "num": 163,
    "desc": "This Pokemon's moves and their effects ignore certain Abilities of other Pokemon. The Abilities that can be negated are Armor Tail, Aroma Veil, Aura Break, Battle Armor, Big Pecks, Bulletproof, Clear Body, Contrary, Damp, Dazzling, Disguise, Dry Skin, Earth Eater, Filter, Flash Fire, Flower Gift, Flower Veil, Fluffy, Friend Guard, Fur Coat, Good as Gold, Grass Pelt, Guard Dog, Heatproof, Heavy Metal, Hyper Cutter, Ice Face, Ice Scales, Illuminate, Immunity, Inner Focus, Insomnia, Keen Eye, Leaf Guard, Levitate, Light Metal, Lightning Rod, Limber, Magic Bounce, Magma Armor, Marvel Scale, Mind's Eye, Mirror Armor, Motor Drive, Multiscale, Oblivious, Overcoat, Own Tempo, Pastel Veil, Punk Rock, Purifying Salt, Queenly Majesty, Sand Veil, Sap Sipper, Shell Armor, Shield Dust, Simple, Snow Cloak, Solid Rock, Soundproof, Sticky Hold, Storm Drain, Sturdy, Suction Cups, Sweet Veil, Tangled Feet, Telepathy, Tera Shell, Thermal Exchange, Thick Fat, Unaware, Vital Spirit, Volt Absorb, Water Absorb, Water Bubble, Water Veil, Well-Baked Body, White Smoke, Wind Rider, Wonder Guard, and Wonder Skin. This affects every other Pokemon on the field, whether or not it is a target of this Pokemon's move, and whether or not their Ability is beneficial to this Pokemon.",
    "shortDesc": "This Pokemon's moves and their effects ignore the Abilities of other Pokemon."
  },
  "unaware": {
    "flags": {
      "breakable": 1
    },
    "name": "Unaware",
    "rating": 4,
    "num": 109,
    "desc": "This Pokemon ignores other Pokemon's Attack, Special Attack, and accuracy stat stages when taking damage, and ignores other Pokemon's Defense, Special Defense, and evasiveness stat stages when dealing damage.",
    "shortDesc": "This Pokemon ignores other Pokemon's stat stages when taking or doing damage."
  },
  "unburden": {
    "condition": {},
    "flags": {},
    "name": "Unburden",
    "rating": 3.5,
    "num": 84,
    "desc": "If this Pokemon loses its held item for any reason, its Speed is doubled as long as it remains active, has this Ability, and is not holding an item.",
    "shortDesc": "Speed is doubled on held item loss; boost is lost if it switches, gets new item/Ability."
  },
  "unnerve": {
    "flags": {},
    "name": "Unnerve",
    "rating": 1,
    "num": 127,
    "desc": "While this Pokemon is active, it prevents opposing Pokemon from using their Berries. This Ability activates before hazards and other Abilities take effect.",
    "shortDesc": "While this Pokemon is active, it prevents opposing Pokemon from using their Berries."
  },
  "unseenfist": {
    "flags": {},
    "name": "Unseen Fist",
    "rating": 2,
    "num": 260,
    "desc": "This Pokemon's contact moves ignore the target's protection, except Max Guard.",
    "shortDesc": "This Pokemon's contact moves ignore the target's protection, except Max Guard."
  },
  "vesselofruin": {
    "flags": {},
    "name": "Vessel of Ruin",
    "rating": 4.5,
    "num": 284,
    "desc": "Active Pokemon without this Ability have their Special Attack multiplied by 0.75.",
    "shortDesc": "Active Pokemon without this Ability have their Special Attack multiplied by 0.75."
  },
  "victorystar": {
    "onAnyModifyAccuracyPriority": -1,
    "flags": {},
    "name": "Victory Star",
    "rating": 2,
    "num": 162,
    "desc": "This Pokemon and its allies' moves have their accuracy multiplied by 1.1.",
    "shortDesc": "This Pokemon and its allies' moves have their accuracy multiplied by 1.1."
  },
  "vitalspirit": {
    "flags": {
      "breakable": 1
    },
    "name": "Vital Spirit",
    "rating": 1.5,
    "num": 72,
    "desc": "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it.",
    "shortDesc": "This Pokemon cannot fall asleep. Gaining this Ability while asleep cures it."
  },
  "voltabsorb": {
    "flags": {
      "breakable": 1
    },
    "name": "Volt Absorb",
    "rating": 3.5,
    "num": 10,
    "desc": "This Pokemon is immune to Electric-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Electric-type move.",
    "shortDesc": "This Pokemon heals 1/4 of its max HP when hit by Electric moves; Electric immunity."
  },
  "wanderingspirit": {
    "flags": {},
    "name": "Wandering Spirit",
    "rating": 2.5,
    "num": 254,
    "desc": "Pokemon making contact with this Pokemon have their Ability swapped with this one. Does not affect Pokemon with the Abilities As One, Battle Bond, Comatose, Commander, Disguise, Embody Aspect, Hunger Switch, Ice Face, Illusion, Multitype, Neutralizing Gas, Poison Puppeteer, Power Construct, Protosynthesis, Quark Drive, RKS System, Schooling, Shields Down, Stance Change, Tera Shell, Tera Shift, Teraform Zero, Wonder Guard, Zen Mode, or Zero to Hero.",
    "shortDesc": "Pokemon making contact with this Pokemon have their Ability swapped with this one."
  },
  "waterabsorb": {
    "flags": {
      "breakable": 1
    },
    "name": "Water Absorb",
    "rating": 3.5,
    "num": 11,
    "desc": "This Pokemon is immune to Water-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Water-type move.",
    "shortDesc": "This Pokemon heals 1/4 of its max HP when hit by Water moves; Water immunity."
  },
  "waterbubble": {
    "onSourceModifyAtkPriority": 5,
    "onSourceModifySpAPriority": 5,
    "flags": {
      "breakable": 1
    },
    "name": "Water Bubble",
    "rating": 4.5,
    "num": 199,
    "desc": "This Pokemon's offensive stat is doubled while using a Water-type attack. If a Pokemon uses a Fire-type attack against this Pokemon, that Pokemon's offensive stat is halved when calculating the damage to this Pokemon. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
    "shortDesc": "This Pokemon's Water power is 2x; it can't be burned; Fire power against it is halved."
  },
  "watercompaction": {
    "flags": {},
    "name": "Water Compaction",
    "rating": 1.5,
    "num": 195,
    "desc": "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move.",
    "shortDesc": "This Pokemon's Defense is raised 2 stages after it is damaged by a Water-type move."
  },
  "waterveil": {
    "flags": {
      "breakable": 1
    },
    "name": "Water Veil",
    "rating": 2,
    "num": 41,
    "desc": "This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
    "shortDesc": "This Pokemon cannot be burned. Gaining this Ability while burned cures it."
  },
  "weakarmor": {
    "flags": {},
    "name": "Weak Armor",
    "rating": 1,
    "num": 133,
    "desc": "If a physical attack hits this Pokemon, its Defense is lowered by 1 stage and its Speed is raised by 2 stages.",
    "shortDesc": "If a physical attack hits this Pokemon, Defense is lowered by 1, Speed is raised by 2."
  },
  "wellbakedbody": {
    "flags": {
      "breakable": 1
    },
    "name": "Well-Baked Body",
    "rating": 3.5,
    "num": 273,
    "desc": "This Pokemon is immune to Fire-type moves and raises its Defense by 2 stages when hit by a Fire-type move.",
    "shortDesc": "This Pokemon's Defense is raised 2 stages if hit by a Fire move; Fire immunity."
  },
  "whitesmoke": {
    "flags": {
      "breakable": 1
    },
    "name": "White Smoke",
    "rating": 2,
    "num": 73,
    "desc": "Prevents other Pokemon from lowering this Pokemon's stat stages.",
    "shortDesc": "Prevents other Pokemon from lowering this Pokemon's stat stages."
  },
  "wimpout": {
    "flags": {},
    "name": "Wimp Out",
    "rating": 1,
    "num": 193,
    "desc": "When this Pokemon has more than 1/2 its maximum HP and takes damage bringing it to 1/2 or less of its maximum HP, it immediately switches out to a chosen ally. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability. This effect applies to both direct and indirect damage, except Curse and Substitute on use, Belly Drum, Pain Split, and confusion damage.",
    "shortDesc": "This Pokemon switches out when it reaches 1/2 or less of its maximum HP."
  },
  "windpower": {
    "onDamagingHitOrder": 1,
    "flags": {},
    "name": "Wind Power",
    "rating": 1,
    "num": 277,
    "desc": "This Pokemon gains the Charge effect when it takes a hit from a wind move or when Tailwind begins on this Pokemon's side.",
    "shortDesc": "This Pokemon gains the Charge effect when hit by a wind move or Tailwind begins."
  },
  "windrider": {
    "flags": {
      "breakable": 1
    },
    "name": "Wind Rider",
    "rating": 3.5,
    "num": 274,
    "desc": "This Pokemon is immune to wind moves and raises its Attack by 1 stage when hit by a wind move or when Tailwind begins on this Pokemon's side.",
    "shortDesc": "Attack raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity."
  },
  "wonderguard": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "failskillswap": 1,
      "breakable": 1
    },
    "name": "Wonder Guard",
    "rating": 5,
    "num": 25,
    "desc": "This Pokemon can only be damaged by supereffective moves and indirect damage.",
    "shortDesc": "This Pokemon can only be damaged by supereffective moves and indirect damage."
  },
  "wonderskin": {
    "onModifyAccuracyPriority": 10,
    "flags": {
      "breakable": 1
    },
    "name": "Wonder Skin",
    "rating": 2,
    "num": 147,
    "desc": "Non-damaging moves that check accuracy have their accuracy changed to 50% when used against this Pokemon. This effect comes before other effects that modify accuracy.",
    "shortDesc": "Status moves with accuracy checks are 50% accurate when used on this Pokemon."
  },
  "zenmode": {
    "onResidualOrder": 29,
    "condition": {},
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1
    },
    "name": "Zen Mode",
    "rating": 0,
    "num": 161,
    "desc": "If this Pokemon is a Darmanitan or Galarian Darmanitan, it changes to Zen Mode if it has 1/2 or less of its maximum HP at the end of a turn. If Darmanitan's HP is above 1/2 of its maximum HP at the end of a turn, it changes back to Standard Mode.",
    "shortDesc": "If Darmanitan, at end of turn changes Mode to Standard if > 1/2 max HP, else Zen."
  },
  "zerotohero": {
    "flags": {
      "failroleplay": 1,
      "noreceiver": 1,
      "noentrain": 1,
      "notrace": 1,
      "failskillswap": 1,
      "cantsuppress": 1,
      "notransform": 1
    },
    "name": "Zero to Hero",
    "rating": 5,
    "num": 278,
    "desc": "If this Pokemon is a Palafin in Zero Form, switching out has it change to Hero Form.",
    "shortDesc": "If this Pokemon is a Palafin in Zero Form, switching out has it change to Hero Form."
  },
  "mysticcharm": {
    "flags": {},
    "rating": 0,
    "num": 311,
    "name": "Mystic Charm",
    "desc": "Special moves used by this Pokemon reduce their target's Speed by 1 stage.",
    "shortDesc": "Special moves used by this Pokemon reduce their targets' Speed by 1 stage."
  }
}
