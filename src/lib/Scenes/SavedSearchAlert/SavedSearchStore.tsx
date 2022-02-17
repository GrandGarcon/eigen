import { action, Action, createContextStore, State } from "easy-peasy"
import { Aggregations } from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import {
  SearchCriteria,
  SearchCriteriaAttributes,
} from "lib/Components/ArtworkFilter/SavedSearch/types"

interface SavedSearchModel {
  attributes: SearchCriteriaAttributes
  aggregations: Aggregations
  dirty: boolean

  removeValueFromAttributesByKeyAction: Action<
    this,
    {
      key: SearchCriteria
      value: string | number | boolean
    }
  >
}

export type SavedSearchState = State<SavedSearchModel>

const savedSearchModel: SavedSearchModel = {
  attributes: {},
  aggregations: [],
  dirty: false,

  removeValueFromAttributesByKeyAction: action((state, payload) => {
    const prevValue = state.attributes[payload.key]

    if (Array.isArray(prevValue)) {
      ;(state.attributes[payload.key] as string[]) = prevValue.filter(
        (value) => value !== payload.value
      )
    } else {
      state.attributes[payload.key] = null
    }

    state.dirty = true
  }),

  // pills: computed((state) => extractPills(state.attributes, state.aggregations)),
}

export const SavedSearchStore = createContextStore<SavedSearchModel>(
  (initialData: SavedSearchModel) => ({
    ...savedSearchModel,
    ...initialData,
  }),
  { name: "SavedSearchStore" }
)
export const SavedSearchStoreProvider = SavedSearchStore.Provider
