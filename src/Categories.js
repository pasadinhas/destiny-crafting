import ActivityCard from "./components/activities/ActivityCard"
import VendorUnlock from "./components/activities/VendorUnlock"
import ActivityCompletion from "./components/activities/ActivityCompletion"
import CheckboxItem from "./components/activities/CheckboxItem"

const GROUP_WORLD_AND_ACTIVITIES = "World / Activities"
const GROUP_RAID = "Raid"

const Uncategorized = {
  name: "Uncategorized",
  icon: "https://www.bungie.net/common/destiny2_content/icons/528d5264b28c155e1bba26afb427aba0.png",
  hashes: [],
  activities: [
    <ActivityCard
      name="Unobtainable"
      description="These weapons have crafting patterns in the Destiny manifest, but are not obtainable in-game."
    ></ActivityCard>,
    <ActivityCard
      name="Content Release"
      description="When new content is released, new weapons can appear here before they are manually categorized."
    ></ActivityCard>
  ]
}

const SeasonOfPlunder = {
  name: "Season of Plunder",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_b358e1c398ec9f74b1f90318b0b08c21.png",
  group: "Season",
  hashes: [
    146759633, // Tarnished Mettle
    1544481626, // Brigand's Law
    2158979729, // Blood Feud
    3587005520, // No Reprieve
    1389390726, // Sailspy Pitchglass
    3257403871, // Planck's Stride
  ],
  activities: [
    <ActivityCard 
      name="Guaranteed Ketchcrash Drop" 
      description="Each week, get a guaranteed Deepsight weapon in Ketchcrash."
    >
      <VendorUnlock
        name="Unlock 'Hidden Compartment'" 
        description="Unlocked in the Seasonal Vendor, guarantees a Deepsight on the first Ketchcrash completion of the week." 
        inventoryItemHash={3809407685}
      />
      <ActivityCompletion 
        name="Ketchcrash"
        description="Complete a Ketchcrash activity."
        hashes={[287709797, 3594496514]} />
    </ActivityCard>,
    <ActivityCard
      name="Guaranteed Focusing"
      description="Each week, get a guaranteed Deepsight weapon via focusing."
    >
      <VendorUnlock 
        name="Unlock 'Double Perk Weapon Spoils'"
        description="Unlocked in the Seasonal Vendor, guarantees that the first focused weapon of the week has Deepsight Resonance."
        inventoryItemHash={3797270607} 
      />
      <CheckboxItem
        name="Focus a Weapon"
        description="Go to the Star Chart in the H.E.L.M. and focus a weapon."
        checked={false}
      />
    </ActivityCard>,
  ]
}

const QuestWeapons = {
  name: "Quest Weapons",
  icon: "https://www.bungie.net/common/destiny2_content/icons/df7279bf5cd0f99fe5f1e0b8a8967e5e.png", // questionable icon
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    403175710, // Osteo Striga
    96042291, // Edge of Intent
    1955149226, // Edge of Action
    3296489718, // Edge of Concurrence
    1446423643, // The Enigma
    2627701916, //Vexcalibur

  ]
}

const WorldLootPool = {
  name: "World Loot Pool",
  icon: "https://www.bungie.net/common/destiny2_content/icons/e240a280715a7b761aa5e37d10eaa505.png", // questionable icon
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    122415725, // Ammit AR2
    220342896, // Ragnhild-D
    292832740, // Palmyra-B
    953028525, // Syncopation-53
    4013775975, // Taipan-4fr
    2292557505, // Marsilion-C
  ],
  activities: [
    <ActivityCard
      name="Play the Game"
      description="World Loot Pool weapons can drop from most activities."
    ></ActivityCard>
  ]
}

const Wellspring = {
  name: "Wellspring",
  //icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_feb5aecca544ab023ecf3b74ac8f509b.png", // removed from bungie
  icon: "https://www.bungie.net/common/destiny2_content/icons/b480945e13f700b4fa510a6fc79b92b2.png", // bad icon: item perk
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    3863516258, // Come to Pass
    311360599, // Father's Sins
    1507884969, // Tarnation
    3907981638, // Fel Taradiddle
  ]
}

const DaresOfEternity = {
  name: "Dares of Eternity",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyActivityModeDefinition_97b3f044ae55f744afa0148aa7b6ca21.png",
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    385553757, // BxR-55 Battler
    834963888, // Pardon Our Dust
    631089354, // Wastelander M5
    1254331510, // Retraced Path
    3735490332, // Half-Truths
    3735490333, // The Other Half
  ]
}

const VowOfTheDisciple = {
  name: "Vow of the Disciple",
  icon: "https://www.bungie.net/common/destiny2_content/icons/b84b6ea72dd05de7123aa2ae87ba0d6a.png", // Vow of the Disciple // Record
  group: GROUP_RAID,
  hashes: [
    422252754, // Forbearance
    876397380, // Lubrae's Ruin
    989023188, // Cataclysmic
    1057921323, // Submission
    2896258222, // Deliverance
    3868889639, // Insidious
  ]
}

const KingsFall = {
  name: "King's Fall",
  icon: "https://www.bungie.net/common/destiny2_content/icons/ada298d79d9f74befb055e2454f33af0.png", // King's Fall // Record
  group: GROUP_RAID,
  hashes: [
    437884069, // Zaouli's Bane
    750389420, // Qullim's Terminus
    2069837521, // Smite of Merain
    2546821156, // Midha's Reckoning
    3650227809, // Doom of Chelchis
    3255215894, // Defiance of Yasmin
  ]
}

const OpulentWeapons = {
  name: "Season of the Haunted: Opulent",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_3847a7f2241ce39588bfc2c85239b055.png",
  group: "Season",
  hashes: [
    1444412985, // Austringer
    826543773, // Drang (Baroque)
    2258742229, // CALUS Mini-Tool
    662547074, // Beloved
  ]
}

const SeasonOfTheRisen = {
  name: "Season of the Risen",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_0f47a186cf0cb88d2388d811a6ec89cb.png",
  group: "Season",
  hashes: [
    930979915, // Under Your Skin
    1701593813, // Sweet Sorrow
    2115207174, // Explosive Personality
    3343946430, // Piece of Mind
    3357460834, // Recurrent Impact
    3842442685, // Thoughtless
  ]
}

const SeasonOfTheHaunted = {
  name: "Season of the Haunted",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_3847a7f2241ce39588bfc2c85239b055.png",
  group: "Season",
  hashes: [
    2511032639, // Firefright
    3693097974, // Tears of Contrition
    1691359215, // Nezarec's Whisper
    2126241222, // Without Remorse
    2177815995, // Hollow Denial
    2330294643, // Bump in the Night
  ]
}

const Duality = {
  name: "Duality",
  icon: "https://www.bungie.net/common/destiny2_content/icons/dfc73de54b0ed12b55fdf09e1b3b9726.png",
  group: "Dungeon",
  hashes: [
    1968204778, // The Epicurean
    2547048326, // Fixed Odds
  ]
}

const ThroneWorld = {
  name: "Throne World",
  icon: "https://www.bungie.net/common/destiny2_content/icons/e17d13013bad7d53c47b0231b9784e1e.png",
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    689439417, // Pointed Inquiry
    1615038969, // Forensic Nightmare
    2107474614, // Likely Suspect
    3770251030, // Red Herring
    4205772441, // Empirical Evidence
  ]
}

const DeepStoneCrypt = {
  name: "Deep Stone Crypt",
  icon: "https://www.bungie.net/common/destiny2_content/icons/9d6744eed9fa9b55f8190ce975f1872d.png",
  group: GROUP_RAID,
  hashes: [
    200612470, // Posterity
    633869177, // Commemoration
    924334687, // Succession
    3370786210, // Trustee
    4170453731, // Heritage
    399865831, // Bequest
  ]
}

const SeasonOfTheSeraph = {
  name: "Season of the Seraph",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_dd9fe0539a0c29c9e6f5f4d257d3c15a.png",
  group: "Season",
  hashes: [
    204031420, // Tripwire Canary
    1506999309, // Path of Least Resistance
    1778902326, // Judgment of Kelgorath
    3172595571, // Fire and Forget
    3835559140, // Disparity
    3862297426, // Retrofit Escapade
  ]
}

const IkelosWeapons = {
  name: "Season of the Seraph: Ikelos",
  icon: "https://www.bungie.net/common/destiny2_content/icons/44efbb5de18ddc290c38e12dca746c7b.png",
  group: "Season",
  hashes: [
    622035212, // IKELOS_SR_v1.0.3
    692035983, // IKELOS_SMG_v1.0.3
    1366529950, // IKELOS_SG_v1.0.3
    4070327399, // IKELOS_HC_v1.0.3
  ]
}

const Neomuna = {
  name: "Neomuna",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_67326996f903b5961421421e60ba128c.png",
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    2839479882, // Round Robin
    1167176444, // Phyllotactic Spiral
    1517724383, // Volta Bracket
    777254375, // Iterative Loop
    170523067, // Dimensional Hypotrochoid
  ]
}

const SeasonOfDefiance = {
  name: "Season of Defiance",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_50d80a655bccddfd26e954dbfc3b9746.png",
  group: "Season",
  hashes: [
    3845305795, // Raconteur
    2514059564, // Perpetualis
    3393054854, // Royal Executioner
    2324218515, // Prodigal Return
    752104278, // Regnant
    3171877617, // Caretaker
  ]
}

const RootOfNightmares = {
  name: "Root of Nightmares",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_d3dc8747ee63f991c6a56ac7908047ba.png",
  group: GROUP_RAID,
  hashes: [
    3743137436, // Rufus's Fury
    1164396532, // Mykel's Reverence
    3838502045, // Acasia's Dejection
    700218081, // Nessa's Oblation
    2742412203, // Koraxis's Distress
    417302779, // Briar's Contempt
  ]
}

const RecoveredLeviathanWeapons = {
  name: "Season of Defiance: Leviathan",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_50d80a655bccddfd26e954dbfc3b9746.png",
  group: "Season",
  hashes: [
    1388873285, // Imperial Decree
    3091520689, // Throne-Cleaver
    3091520690, // Death's Razor
    3091520691, // Goldtusk
  ]
}

const SeasonOfTheDeep = {
  name: "Season of the Deep",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_f82759315a8d05fc597778d2086acee4.png",
  group: "Season",
  hashes: [
    673861429, // Different Times
    1195933113, // Targeted Redaction
    1585307805, // Rapacious Appetite
    3159538778, // A Distant Pull
    3328286012, // Until Its Return
    2119725732, // Thin Precipice
  ]
}

const LastWishRaid = {
  name: "Last Wish",
  icon: "https://www.bungie.net/common/destiny2_content/icons/fed7eab7b03a03cc1389c907f8fbe316.png", // Spirit of Riven Reputation // Item
  group: GROUP_RAID,
  hashes: [
    950932825, // Tyranny of Heaven
    1029956969, // Nation of Beasts
    2610512925, // Chattering Bone
    2906615623, // Age-Old Bond
    3363925957, // Transfiguration
    2360742598, // The Supremacy
    4104745812, // Techeun Force
    2585307516, // Apex Predator
  ]
}

const ExoticMission = {
  name: "Exotic Mission",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_fbba06b79fd1752af47e133cce7a3f45.png",
  group: GROUP_WORLD_AND_ACTIVITIES,
  hashes: [
    2708276045, // Dead Man's Tale
    3027110436, // Dead Messenger
    929449757, // Revision Zero
    1079246704, // Wish-Keeper
    428827874, // Whisper of the Worm
    2156240610, // Outbreak Perfected
  ]
}

const SeasonOfTheWitch = {
  name: "Season of the Witch",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_fdbb36bb7f4f81c0170ca0b2cced22d6.png",
  group: "Season",
  hashes: [
    3113198670, // Kept Confidence
    4112659123, // Brya's Love
    1452920131, // Locus Locutus
    1526803724, // The Eremite
    1610063585, // Eleatic Principle
    2949440399, // Semiotician
  ]
}

const CrotasEnd = {
  name: "Crota's End",
  icon: "https://www.bungie.net/common/destiny2_content/icons/d89e12c918cb0c6b1087b073ad14d6c2.png",
  group: GROUP_RAID,
  hashes: [
    583710954, // Fang of Ir Yût
    1294327154, // Abyss Defiant
    1741156110, // Word of Crota
    3250738778, // Oversoul Edict
    411909019, // Swordbreaker
    3859670341, // Song of Ir Yût
  ]
}

const SeasonOfTheWish = {
  name: "Season of the Wish",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinySeasonDefinition_7026238c20605a7e6842a5d799732d4b.png",
  group: "Season",
  hashes: [
    4176053351, // Lethophobia
    758696970, // Scalar Potential
    17045790, // Scatter Signal
    1646851114, // Supercluster
    2735697733, // Appetence
    3920309636, // Doomed Petitioner
  ]
}

const SeasonOfTheWishUndying = {
  name: "Season of the Wish: Undying",
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyActivityModeDefinition_aff433243d91cbbfa53a1c181fb2ee47.png", // Vex Offensive
  group: "Season",
  hashes: [
    684104318, // Subjunctive
    2942958578, // Imperative
    3129699814, // Optative
    3188823614, // Adhortative
  ]
}

const Categories = [
  SeasonOfTheWish,
  SeasonOfTheWishUndying,
  CrotasEnd,
  SeasonOfTheWitch,
  LastWishRaid,
  ExoticMission,
  SeasonOfTheDeep,
  RootOfNightmares,
  SeasonOfDefiance,
  RecoveredLeviathanWeapons,
  Neomuna,
  SeasonOfTheSeraph,
  IkelosWeapons,
  DeepStoneCrypt,
  SeasonOfPlunder,
  DaresOfEternity,
  SeasonOfTheHaunted,
  OpulentWeapons,
  Duality,
  KingsFall,
  SeasonOfTheRisen,
  VowOfTheDisciple,
  Wellspring,
  ThroneWorld,
  WorldLootPool,  
  QuestWeapons,
  Uncategorized
]

export {Categories, Uncategorized};

