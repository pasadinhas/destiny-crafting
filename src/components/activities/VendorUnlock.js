import { useOwnedVendorItems } from "../../hooks/customHooks"
import CheckboxItem from "./CheckboxItem"

function VendorUnlock({ name, description, inventoryItemHash }) {
    const result = useOwnedVendorItems()
    const unlocked = result.indexOf(inventoryItemHash) >= 0

    console.log(unlocked)
    return <CheckboxItem name={name} description={description} checked={unlocked} />
}

export default VendorUnlock