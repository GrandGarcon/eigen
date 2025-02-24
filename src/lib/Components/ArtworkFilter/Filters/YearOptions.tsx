import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { StackScreenProps } from "@react-navigation/stack"
import { ArtworkFilterNavigationStack } from "lib/Components/ArtworkFilter"
import {
  aggregationForFilter,
  FilterData,
  FilterParamName,
} from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import {
  ArtworksFiltersStore,
  useSelectedOptionsDisplay,
} from "lib/Components/ArtworkFilter/ArtworkFilterStore"
import { ArtworkFilterBackHeader } from "lib/Components/ArtworkFilter/components/ArtworkFilterBackHeader"
import { CircleWithBorder } from "lib/Components/CircleWithBorder/CircleWithBorder"
import { FancyModalHeader } from "lib/Components/FancyModal/FancyModalHeader"
import { TouchableRow } from "lib/Components/TouchableRow"
import { useFeatureFlag } from "lib/store/GlobalStore"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { Box, CheckIcon, Flex, Separator, Text, useColor } from "palette"
import React, { useState } from "react"
import Haptic from "react-native-haptic-feedback"
import styled from "styled-components/native"

interface YearOptionsScreenProps
  extends StackScreenProps<ArtworkFilterNavigationStack, "YearOptionsScreen"> {}

export const ALLOW_EMPTY_CREATED_DATES_FILTER: FilterData = {
  displayText: "Include Lots without Artwork Date Listed",
  paramName: FilterParamName.allowEmptyCreatedDates,
  paramValue: true,
}

export const YearOptionsScreen: React.FC<YearOptionsScreenProps> = ({ navigation }) => {
  const color = useColor()
  const screenWidth = useScreenDimensions().width
  const isEnabledImprovedAlertsFlow = useFeatureFlag("AREnableImprovedAlertsFlow")

  const appliedFilters = ArtworksFiltersStore.useStoreState((state) => state.appliedFilters)
  const selectedFilters = ArtworksFiltersStore.useStoreState((state) => state.selectedFilters)

  const aggregations = ArtworksFiltersStore.useStoreState((state) => state.aggregations)
  const selectFiltersAction = ArtworksFiltersStore.useStoreActions(
    (state) => state.selectFiltersAction
  )

  const artistEarliestCreatedYear = Number(
    aggregationForFilter(FilterParamName.earliestCreatedYear, aggregations)?.counts[0].value
  )
  const artistLatestCreatedYear = Number(
    aggregationForFilter(FilterParamName.latestCreatedYear, aggregations)?.counts[0].value
  )

  const selectedOptions = useSelectedOptionsDisplay()

  const appliedEarliestCreatedYear = selectedOptions.find(
    (option) => option.paramName === FilterParamName.earliestCreatedYear
  )?.paramValue
  const appliedLatestCreatedYear = selectedOptions.find(
    (option) => option.paramName === FilterParamName.latestCreatedYear
  )?.paramValue

  const appliedAllowEmptyCreatedDates = appliedFilters.find(
    (option) => option.paramName === FilterParamName.allowEmptyCreatedDates
  )?.paramValue as boolean
  const selectedAllowEmptyCreatedDates = selectedFilters.find(
    (option) => option.paramName === FilterParamName.allowEmptyCreatedDates
  )?.paramValue as boolean

  const [sliderValues, setSliderValues] = useState([
    appliedEarliestCreatedYear || artistEarliestCreatedYear,
    appliedLatestCreatedYear || artistLatestCreatedYear,
  ])

  const [allowEmptyCreatedDates, setAllowEmptyCreatedDates] = useState<boolean>(
    selectedAllowEmptyCreatedDates ?? appliedAllowEmptyCreatedDates ?? true
  )

  const onValuesChangeFinish = (values: number[]) => {
    const earliestCreatedYear = values[0]
    const latestCreatedYear = values[1]

    selectFiltersAction({
      displayText: earliestCreatedYear.toString(),
      paramValue: earliestCreatedYear,
      paramName: FilterParamName.earliestCreatedYear,
    })

    selectFiltersAction({
      displayText: latestCreatedYear.toString(),
      paramValue: latestCreatedYear,
      paramName: FilterParamName.latestCreatedYear,
    })
  }

  const handleAllowEmptyCreatedDatesPress = () => {
    selectFiltersAction({
      displayText: ALLOW_EMPTY_CREATED_DATES_FILTER.displayText,
      paramValue: !allowEmptyCreatedDates,
      paramName: FilterParamName.allowEmptyCreatedDates,
    })

    setAllowEmptyCreatedDates(!allowEmptyCreatedDates)
  }

  return (
    <Flex flexGrow={1}>
      {isEnabledImprovedAlertsFlow ? (
        <ArtworkFilterBackHeader title="Year created" onLeftButtonPress={navigation.goBack} />
      ) : (
        <FancyModalHeader onLeftButtonPress={navigation.goBack}>Year created</FancyModalHeader>
      )}
      <Flex flexGrow={1} py={2}>
        <YearText variant="xs" mb={15} mx={2}>
          {sliderValues[0]} – {sliderValues[1]}
        </YearText>
        <Flex alignItems="center" mx={2}>
          <MultiSlider
            values={[Number(sliderValues[0]), Number(sliderValues[1])]}
            sliderLength={screenWidth - 40}
            onValuesChange={(values) => {
              Haptic.trigger("impactLight")
              setSliderValues(values)
            }}
            onValuesChangeFinish={onValuesChangeFinish}
            min={artistEarliestCreatedYear}
            max={artistLatestCreatedYear}
            step={1}
            allowOverlap
            snapped
            customMarker={() => (
              <CircleWithBorder
                borderWidth={2}
                backgroundColor={color("black100")}
                borderColor={color("white100")}
                diameter={24}
                top="2px"
              />
            )}
            selectedStyle={{
              backgroundColor: "black",
              height: 5,
            }}
            unselectedStyle={{
              backgroundColor: color("black10"),
              height: 5,
            }}
            containerStyle={{
              height: 40,
            }}
          />
        </Flex>
        <Separator mt={2} />
        <OptionItem
          onPress={handleAllowEmptyCreatedDatesPress}
          text={ALLOW_EMPTY_CREATED_DATES_FILTER.displayText}
          selected={allowEmptyCreatedDates}
        />
      </Flex>
    </Flex>
  )
}

interface OptionItemProps {
  onPress: () => void
  text: string
  selected: boolean
}

export const OptionItem = ({ onPress, text, selected }: OptionItemProps) => (
  <TouchableRow onPress={onPress}>
    <Flex flexGrow={1} justifyContent="space-between" flexDirection="row" height={60}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        flexGrow={1}
        alignItems="center"
        pl={2}
        pr={2}
      >
        <Text variant="xs">{text}</Text>
        {!!selected && (
          <Box mb={0.1}>
            <CheckIcon fill="black100" />
          </Box>
        )}
      </Flex>
    </Flex>
  </TouchableRow>
)

export const YearText = styled(Text)`
  margin-bottom: 15;
`
