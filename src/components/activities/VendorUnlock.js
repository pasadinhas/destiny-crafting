import { useDefinitions, useOwnedVendorItems } from "../../hooks/customHooks"

function VendorUnlock({ inventoryItemHash }) {
    const { data } = useDefinitions()
    const result = useOwnedVendorItems()
    const unlocked = result.indexOf(inventoryItemHash)
    const completedClass = unlocked ? 'completed' : ''

    const name = data?.DestinyInventoryItemDefinition[inventoryItemHash]?.displayProperties?.name ?? 'no name'
    const description = data?.DestinyInventoryItemDefinition[inventoryItemHash]?.displayProperties?.description ?? 'no description'

    return (<li className="unlock span-2">
        <div className={'checkbox ' + completedClass}></div>
        <div className='content'>
            <div className='name'>{name}</div>
            <div className='description'>{description}</div>
        </div>
    </li>)
}

export default VendorUnlock