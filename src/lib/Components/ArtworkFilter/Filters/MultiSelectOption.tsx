import { ParamListBase } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { FilterData } from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import { ArtworkFilterBackHeader } from "lib/Components/ArtworkFilter/components/ArtworkFilterBackHeader"
import { FancyModalHeader, FancyModalHeaderProps } from "lib/Components/FancyModal/FancyModalHeader"
import { SearchInput } from "lib/Components/SearchInput"
import { TouchableRow } from "lib/Components/TouchableRow"
import { useFeatureFlag } from "lib/store/GlobalStore"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { Box, Check, CHECK_SIZE, Flex, Text, useSpace } from "palette"
import React, { useState } from "react"
import { FlatList, ScrollView } from "react-native"
import styled from "styled-components/native"

const OPTIONS_MARGIN_LEFT = 0.5
const OPTION_PADDING = 15

interface MultiSelectOptionScreenProps extends FancyModalHeaderProps {
  navigation: StackNavigationProp<ParamListBase>
  filterHeaderText: string
  onSelect: (filterData: FilterData, updatedValue: boolean) => void
  filterOptions: FilterData[]
  isSelected?: (item: FilterData) => boolean
  isDisabled?: (item: FilterData) => boolean
  /** Utilize a search input to further filter results */
  searchable?: boolean
  noResultsLabel?: string
  footerComponent?: React.ComponentType<any> | React.ReactElement | null
  useScrollView?: boolean
}

export const MultiSelectOptionScreen: React.FC<MultiSelectOptionScreenProps> = ({
  filterHeaderText,
  onSelect,
  filterOptions,
  navigation,
  isSelected,
  isDisabled,
  children,
  searchable,
  noResultsLabel = "No results",
  footerComponent,
  useScrollView = false,
  ...rest
}) => {
  const space = useSpace()
  const { width } = useScreenDimensions()
  const isEnabledImprovedAlertsFlow = useFeatureFlag("AREnableImprovedAlertsFlow")
  const [query, setQuery] = useState("")
  const optionTextMaxWidth = width - OPTION_PADDING * 3 - space(OPTIONS_MARGIN_LEFT) - CHECK_SIZE

  const filteredOptions = filterOptions.filter((option) =>
    option.displayText.toLowerCase().includes(query.toLowerCase())
  )

  const handleBackNavigation = () => {
    navigation.goBack()
  }

  const itemIsSelected = (item: FilterData): boolean => {
    if (isSelected) {
      return isSelected(item)
    } else {
      return !!item.paramValue
    }
  }

  const itemIsDisabled = (item: FilterData): boolean => {
    if (isDisabled) {
      return isDisabled(item)
    } else {
      return false
    }
  }

  const keyExtractor = (_item: FilterData, index: number) => {
    return String(index)
  }

  const renderItem = (item: FilterData) => {
    const disabled = itemIsDisabled(item)
    const selected = itemIsSelected(item)

    return (
      <Box ml={OPTIONS_MARGIN_LEFT}>
        <TouchableRow
          onPress={() => {
            const currentParamValue = item.paramValue as boolean
            onSelect(item, !currentParamValue)
          }}
          disabled={disabled}
          testID="multi-select-option-button"
          accessibilityState={{ checked: selected }}
        >
          <OptionListItem>
            <Box maxWidth={optionTextMaxWidth}>
              <Text variant="xs" color="black100">
                {item.displayText}
              </Text>
            </Box>

            <Check selected={selected} disabled={disabled} />
          </OptionListItem>
        </TouchableRow>
      </Box>
    )
  }

  return (
    <Flex flexGrow={1}>
      {isEnabledImprovedAlertsFlow ? (
        <ArtworkFilterBackHeader
          title={filterHeaderText}
          onLeftButtonPress={handleBackNavigation}
          onRightButtonPress={rest.onRightButtonPress}
          rightButtonText={rest.rightButtonText}
        />
      ) : (
        <FancyModalHeader onLeftButtonPress={handleBackNavigation} {...rest}>
          {filterHeaderText}
        </FancyModalHeader>
      )}

      {!!searchable && (
        <>
          <Flex m={2}>
            <SearchInput
              onChangeText={setQuery}
              testID="multi-select-search-input"
              placeholder="Filter results"
            />
          </Flex>

          {filteredOptions.length === 0 && (
            <Flex my={1.5} mx={2} alignItems="center">
              <Text variant="xs">{noResultsLabel}</Text>
            </Flex>
          )}
        </>
      )}

      <Flex flexGrow={1}>
        {useScrollView ? (
          <ScrollView style={{ flex: 1 }}>
            {filteredOptions.map((option, index) => (
              <React.Fragment key={keyExtractor(option, index)}>
                {renderItem(option)}
              </React.Fragment>
            ))}
            {footerComponent}
          </ScrollView>
        ) : (
          <FlatList<FilterData>
            style={{ flex: 1 }}
            keyExtractor={keyExtractor}
            data={filteredOptions}
            ListFooterComponent={footerComponent}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
      </Flex>
    </Flex>
  )
}

export const OptionListItem = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  align-items: flex-start;
  padding: ${OPTION_PADDING}px;
`
