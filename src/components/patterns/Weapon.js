import { useDefinitions, useOwnedItemInstances } from "../../hooks/customHooks"
import PatternProgressWireframe from "./PatternProgressWireframe"

function bungie(path) {
  return `https://www.bungie.net${path}`
}

const WeaponTypes = {}
window.WeaponTypes = WeaponTypes
function getWeaponType(record, definitions) {
  if (!definitions) {
    return '' // definitions are not loaded yet
  }

  if (!WeaponTypes[record.hash]) {
    WeaponTypes[record.hash] = Object.values(definitions.DestinyInventoryItemDefinition)
          .filter(definition => definition.displayProperties?.name == record.displayProperties.name)
          .filter(definition => definition.itemType == 3) // Weapon
          .filter(definition => definition.itemTypeDisplayName != null)
          .reduce((previousValue, currentValue) => currentValue.itemTypeDisplayName, "")
  }
  return WeaponTypes[record.hash]
}

const WeaponHashes = {}
window.WeaponHashes = WeaponHashes
function getWeaponHashes(record, definitions) {
  if (!definitions) {
    return '' // definitions are not loaded yet
  }

  if (!WeaponHashes[record.hash]) {
    WeaponHashes[record.hash] = Object.values(definitions.DestinyInventoryItemDefinition)
          .filter(definition => definition.displayProperties?.name == record.displayProperties.name)
          .filter(definition => definition.itemType == 3) // Weapon
          .map(definition => definition.hash)
  }
  return WeaponHashes[record.hash]
}

function Weapon({weapon}) {
  const { data: definitions } = useDefinitions()
  const weaponHashes = getWeaponHashes(weapon, definitions)
  const ownedWeapons = useOwnedItemInstances(weaponHashes)
  
  const completed = weapon?.state == 67
  const icon = bungie(weapon?.displayProperties?.icon ?? "/common/destiny2_content/icons/528d5264b28c155e1bba26afb427aba0.png")
  const name = weapon?.displayProperties?.name ?? "..."
  const type = getWeaponType(weapon, definitions)
  const progress = (weapon?.objectives ?? [])[0]?.progress ?? '?'
  const completionValue = (weapon?.objectives ?? [])[0]?.completionValue ?? '?'
  const progressPercentage = weapon.objectives == null
    ? 0 : 100 * weapon.objectives[0].progress / weapon.objectives[0].completionValue

  return <PatternProgressWireframe
    completed={completed}
    icon={icon}
    name={name}
    type={type}
    progress={progress}
    completionValue={completionValue}
    progressPercentage={progressPercentage}
  />
}

export default Weapon;
