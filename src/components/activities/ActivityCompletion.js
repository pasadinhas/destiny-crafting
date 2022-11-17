import { useAllCharacterActivitiesSinceLastReset } from "../../hooks/customHooks"
import CheckboxItem from "./CheckboxItem"

function ActivityCompletion({ name, description, hash, hashes = [] }) {
  hashes = hash ? [...hashes, hash] : hashes
  const activities = useAllCharacterActivitiesSinceLastReset()
  const completed = activities.reduce(
    (result, activity) => result || hashes.indexOf(activity.activityDetails.directorActivityHash) >= 0,
    false
  )

  return <CheckboxItem name={name} description={description} checked={completed} />
}

export default ActivityCompletion