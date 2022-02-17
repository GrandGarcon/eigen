import { LOCALIZED_UNIT } from "lib/Components/ArtworkFilter/Filters/helpers"
import { GlobalStore } from "lib/store/GlobalStore"

export const useLocalizedUnit = () => {
  const userPreferredMetric =
    GlobalStore.useAppState((state) => state.userPreferences.metric) || LOCALIZED_UNIT

  return {
    localizedUnit: userPreferredMetric,
  }
}
