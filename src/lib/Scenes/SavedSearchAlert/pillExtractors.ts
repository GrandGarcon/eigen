import {
  aggregationForFilter,
  Aggregations,
  FilterParamName,
  getDisplayNameForTimePeriod,
} from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import { ATTRIBUTION_CLASS_OPTIONS } from "lib/Components/ArtworkFilter/Filters/AttributionClassOptions"
import { COLORS_INDEXED_BY_VALUE } from "lib/Components/ArtworkFilter/Filters/ColorsOptions"
import {
  inToCm,
  Numeric,
  parsePriceRangeLabel,
  parseRange,
  Unit,
} from "lib/Components/ArtworkFilter/Filters/helpers"
import { getSizeOptions } from "lib/Components/ArtworkFilter/Filters/SizesOptionsScreen"
import {
  WAYS_TO_BUY_OPTIONS,
  WAYS_TO_BUY_PARAM_NAMES,
} from "lib/Components/ArtworkFilter/Filters/WaysToBuyOptions"
import { shouldExtractValueNamesFromAggregation } from "lib/Components/ArtworkFilter/SavedSearch/constants"
import {
  SearchCriteria,
  SearchCriteriaAttributes,
} from "lib/Components/ArtworkFilter/SavedSearch/types"
import { compact, flatten, isNil, isUndefined, keyBy } from "lodash"
import { SavedSearchPill } from "./SavedSearchAlertModel"

export const extractPillFromAggregation = (
  paramName: SearchCriteria,
  values: string[],
  aggregations: Aggregations
) => {
  const aggregation = aggregationForFilter(paramName, aggregations)

  if (aggregation) {
    const aggregationByValue = keyBy(aggregation.counts, "value")

    return values.map((value) => {
      if (!isUndefined(aggregationByValue[value])) {
        return {
          label: aggregationByValue[value]?.name,
          value,
          paramName,
        } as SavedSearchPill
      }
    })
  }

  return []
}

const localizeDimension = (dimension: Numeric, unit: Unit) => {
  if (unit === "cm") {
    return inToCm(dimension)
  }
  return dimension
}

export const extractSizeLabel = ({
  prefix,
  value,
  unit,
}: {
  prefix: string
  value: string
  unit: Unit
}) => {
  const range = parseRange(value)
  const min = localizeDimension(range.min, unit)
  const max = localizeDimension(range.max, unit)
  let label

  console.log("[debug] value", value)
  console.log("[debug] min", min)
  console.log("[debug] max", max)

  if (max === "*") {
    label = `from ${min}`
  } else if (min === "*") {
    label = `to ${max}`
  } else {
    label = `${min}-${max}`
  }

  return `${prefix}: ${label} ${unit}`
}

export const extractSizesPill = (values: string[], unit: Unit): SavedSearchPill[] => {
  return values.map((value) => {
    const SIZES_OPTIONS = getSizeOptions(unit)
    const sizeOption = SIZES_OPTIONS.find((option) => option.paramValue === value)

    return {
      label: sizeOption?.displayText ?? "",
      value,
      paramName: SearchCriteria.sizes,
    }
  })
}

export const extractTimePeriodPills = (values: string[]): SavedSearchPill[] => {
  return values.map((value) => {
    return {
      label: getDisplayNameForTimePeriod(value),
      value,
      paramName: SearchCriteria.majorPeriods,
    }
  })
}

export const extractColorPills = (values: string[]): SavedSearchPill[] => {
  return values.map((value) => {
    const colorOption = COLORS_INDEXED_BY_VALUE[value]

    return {
      label: colorOption?.name ?? "",
      value,
      paramName: SearchCriteria.colors,
    }
  })
}

export const extractAttributionPills = (values: string[]): SavedSearchPill[] => {
  return values.map((value) => {
    const colorOption = ATTRIBUTION_CLASS_OPTIONS.find((option) => option.paramValue === value)

    return {
      label: colorOption?.displayText ?? "",
      value,
      paramName: SearchCriteria.attributionClass,
    }
  })
}

export const extractPriceRangePill = (value: string): SavedSearchPill => {
  const { min, max } = parseRange(value)

  return {
    label: parsePriceRangeLabel(min, max),
    value,
    paramName: SearchCriteria.priceRange,
  }
}

export const extractWaysToBuyPill = (paramName: SearchCriteria): SavedSearchPill => {
  const waysToBuyOption = WAYS_TO_BUY_OPTIONS.find(
    (option) => (option.paramName as unknown as SearchCriteria) === paramName
  )

  return {
    label: waysToBuyOption?.displayText ?? "",
    value: true,
    paramName,
  }
}

export const extractPills = ({
  attributes,
  aggregations,
  unit,
}: {
  attributes: SearchCriteriaAttributes
  aggregations: Aggregations
  unit: Unit
}): SavedSearchPill[] => {
  const pills = Object.entries(attributes).map((entry) => {
    const [paramName, paramValue] = entry as [SearchCriteria, any]

    if (isNil(paramValue)) {
      return null
    }

    if (paramName === SearchCriteria.width) {
      return {
        label: extractSizeLabel({ prefix: "w", value: paramValue, unit }),
        value: paramValue,
        paramName: SearchCriteria.width,
      } as SavedSearchPill
    }

    if (paramName === SearchCriteria.height) {
      return {
        label: extractSizeLabel({ prefix: "h", value: paramValue, unit }),
        value: paramValue,
        paramName: SearchCriteria.height,
      } as SavedSearchPill
    }

    if (paramName === SearchCriteria.sizes) {
      return extractSizesPill(paramValue, unit)
    }

    if (paramName === SearchCriteria.majorPeriods) {
      return extractTimePeriodPills(paramValue)
    }

    if (paramName === SearchCriteria.colors) {
      return extractColorPills(paramValue)
    }

    if (paramName === SearchCriteria.attributionClass) {
      return extractAttributionPills(paramValue)
    }

    if (paramName === SearchCriteria.priceRange) {
      return extractPriceRangePill(paramValue)
    }

    // Extract label from aggregations
    if (shouldExtractValueNamesFromAggregation.includes(paramName)) {
      return extractPillFromAggregation(paramName, paramValue, aggregations)
    }

    if (WAYS_TO_BUY_PARAM_NAMES.includes(paramName as unknown as FilterParamName)) {
      return extractWaysToBuyPill(paramName)
    }

    return null
  })

  const flattenedPills = flatten(pills)
  const compactedPills = compact(flattenedPills)
  const preparedPills = compactedPills.filter((pill) => {
    return pill.label !== "" && !isUndefined(pill.value)
  })

  return preparedPills
}

export const extractPillValue = (pills: SavedSearchPill[]) => {
  return pills.map((pill) => pill.value)
}
