import { useDefinitions, useOwnedItemInstances, useProfile } from "./customHooks"

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
  
  console.log({ownedWeapons, weaponHashes})

  const completed = weapon?.state == 67
  const icon = bungie(weapon?.displayProperties?.icon ?? "/common/destiny2_content/icons/528d5264b28c155e1bba26afb427aba0.png")
  const name = weapon?.displayProperties?.name ?? "..."
  const type = getWeaponType(weapon, definitions)
  const progress = (weapon?.objectives ?? [])[0]?.progress ?? '?'
  const completionValue = (weapon?.objectives ?? [])[0]?.completionValue ?? '?'
  const progressPercentage = weapon.objectives == null
    ? 0 : 100 * weapon.objectives[0].progress / weapon.objectives[0].completionValue

  return (<li className={completed ? 'completed' : ''}>
    <div className='icon image' style={{
      backgroundImage: `url(${icon})`
    }}></div>
    <div className='text'>
      <div className='name'>{name}</div>
      <div className='type'>{type}</div>
    </div>
    <div className='progress'>
      <span>{progress}</span>/<span>{completionValue}</span>
    </div>
    <div className='progress-bar-background' style={{width: `${progressPercentage}%`}}></div>
  </li>)
}

export default Weapon;
