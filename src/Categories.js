import ActivityCard from "./components/activities/ActivityCard"
import VendorUnlock from "./components/activities/VendorUnlock"
import ActivityCompletion from "./components/activities/ActivityCompletion"
import CheckboxItem from "./components/activities/CheckboxItem"

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
  hashes: [
    403175710, // Osteo Striga
    96042291, // Edge of Intent
    1955149226, // Edge of Action
    3296489718, // Edge of Concurrence
    1446423643, // The Enigma
  ]
}

const WorldLootPool = {
  name: "World Loot Pool",
  icon: "https://www.bungie.net/common/destiny2_content/icons/e240a280715a7b761aa5e37d10eaa505.png", // questionable icon
  hashes: [
    122415725, // Ammit AR2
    220342896, // Ragnhild-D
    292832740, // Palmyra-B
    953028525, // Syncopation-53
    4013775975, // Taipan-4fr
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
  icon: "https://www.bungie.net/common/destiny2_content/icons/DestinyMilestoneDefinition_feb5aecca544ab023ecf3b74ac8f509b.png",
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
  icon: "https://www.bungie.net/common/destiny2_content/icons/5a90815a3600626978102d6c6ba3582f.png",
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
  icon: "https://www.bungie.net/common/destiny2_content/icons/bc809878e0c2ed8fd32feb62aaae690c.png",
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
  name: "Opulent Weapons",
  icon: "https://www.bungie.net/common/destiny2_content/icons/525ebce0b78615a94b62e5969afd1485.png", // bad icon :(
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
  hashes: [
    1968204778, // The Epicurean
    2547048326, // Fixed Odds
  ]
}

const ThroneWorld = {
  name: "Throne World",
  icon: "https://www.bungie.net/common/destiny2_content/icons/e17d13013bad7d53c47b0231b9784e1e.png",
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
  icon: "https://www.bungie.net/common/destiny2_content/icons/f71c1a6ab05d2c287352c8ee0aae644e.png",
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
  name: "Ikelos Weapons",
  icon: "https://www.bungie.net/common/destiny2_content/icons/3dbef7e84474fa68bcc01c7f4c9c77b0.png",
  hashes: [
    622035212, // IKELOS_SR_v1.0.3
    692035983, // IKELOS_SMG_v1.0.3
    1366529950, // IKELOS_SG_v1.0.3
    4070327399, // IKELOS_HC_v1.0.3
  ]
}

const Categories = [
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

