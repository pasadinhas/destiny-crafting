import { useOwnedVendorItems } from "./customHooks"

function VendorUnlock({ inventoryItemHash }) {
    const result = useOwnedVendorItems()
    const unlocked = result.indexOf(inventoryItemHash)

    return (<li className={unlocked ? 'completed' : ''}>
    <div className='text'>
      <div className='name'>{unlocked}</div>
    </div>
  </li>)
}

export default VendorUnlock