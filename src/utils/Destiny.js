const WeaponHashes = {}
window.WeaponHashes = WeaponHashes
function getWeaponHashes(record, definitions) {
  if (!definitions) {
    return '' // definitions are not loaded yet
  }

  if (!WeaponHashes[record.hash]) {
    WeaponHashes[record.hash] = Object.values(definitions.DestinyInventoryItemDefinition)
          .filter(definition => definition.displayProperties?.name === record.displayProperties.name)
          .filter(definition => definition.itemType === 3) // Weapon
          .map(definition => definition.hash)
  }
  return WeaponHashes[record.hash]
}

export {
    getWeaponHashes
}