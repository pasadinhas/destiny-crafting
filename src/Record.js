function bungie(path) {
  return `https://www.bungie.net${path}`
}

const WeaponTypes = {}
window.WeaponTypes = WeaponTypes
function getWeaponType(record, definitions) {
  if (!WeaponTypes[record.hash]) {
    WeaponTypes[record.hash] = Object.values(definitions.DestinyInventoryItemDefinition)
          .filter(definition => definition.displayProperties?.name == record.displayProperties.name)
          .filter(definition => definition.itemType == 3) // Weapon
          .filter(definition => definition.itemTypeDisplayName != null)
          .reduce((previousValue, currentValue) => currentValue.itemTypeDisplayName, "")
  }
  return WeaponTypes[record.hash]
}

function Record({weapon, definitions}) {
  return (<li className={weapon.state == 67 ? 'completed' : ''}>
    <div className='definition'>
      <div className='properties'>
        <div className='icon'>
          <div className='image' style={{
            backgroundImage: `url(${bungie(weapon.displayProperties.icon)})`
          }}></div>
        </div>
        <div className='text'>
          <div className='name'>{weapon.displayProperties.name}</div>
          <div className='type'>{getWeaponType(weapon, definitions)}</div>
        </div>
      </div>
      <div className='objectives'>
        {weapon.objectives.map(objective => 
          <div className='progress-bar'>
            <div className='check'></div>
            <div className='bar'>
              <div className='fill' style={{width: `${100 * objective.progress / objective.completionValue}%`}}></div>
              <div className='text'>
                <div className='description'>{definitions.DestinyObjectiveDefinition[objective.objectiveHash].progressDescription}</div>
                <div className='value'>{objective.progress}/{objective.completionValue}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </li>)
}

export default Record;
