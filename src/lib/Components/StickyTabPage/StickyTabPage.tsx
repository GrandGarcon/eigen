import { useUpdadeShouldHideBackButton } from "lib/utils/hideBackButtonOnScroll"
import { Schema } from "lib/utils/track"
import { useAutoCollapsingMeasuredView } from "lib/utils/useAutoCollapsingMeasuredView"
import { useGlobalState } from "lib/utils/useGlobalState"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { times } from "lodash"
import { Box } from "palette"
import React, { EffectCallback, useEffect, useMemo, useRef, useState } from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"
import { useTracking } from "react-tracking"
import { useAnimatedValue } from "./reanimatedHelpers"
import { StickyTabPageContext, useStickyTabPageContext } from "./SitckyTabPageContext"
import { SnappyHorizontalRail } from "./SnappyHorizontalRail"
import { StickyTabPageFlatListContext } from "./StickyTabPageFlatList"
import { StickyTabPageTabBar } from "./StickyTabPageTabBar"

const MAX_TABS_LENGTH = 20

export interface TabProps {
  initial?: boolean
  title: string
  content: JSX.Element | ((tabIndex: number) => JSX.Element)
}

/**
 * This page wrapper encapsulates a disappearing header and sticky tabs each with their own content
 *
 * At the moment all tabs are rendered at all times, as this isn't designed for more than 3 tabs
 * but if we need to have conditional rendering of tab content in the future it should be possible.
 *
 * Each tab optionally consumes a 'scroll view context' which could potentialy contain information
 * about whether the tab is being shown currently etc.
 */
export const StickyTabPage: React.FC<{
  tabs: TabProps[]
  staticHeaderContent: JSX.Element
  stickyHeaderContent?: JSX.Element
  loading?: boolean
}> = ({ tabs, staticHeaderContent, stickyHeaderContent = <StickyTabPageTabBar />, loading = false }) => {
  const tracking = useTracking()
  const { width } = useScreenDimensions()
  const initialTabIndex = useMemo(
    () =>
      Math.max(
        tabs.findIndex((tab) => tab.initial),
        0
      ),
    [tabs]
  )

  const setActiveTab = (index: number) => {
    setActiveTabIndex(index)
    activeTabIndexNative.setValue(index)
    railRef.current?.setOffset(index * width)
    stickyRailRef.current?.setOffset(index * width)
  }

  useEffect(() => {
    console.log("CHANGING TAB INDEX", initialTabIndex)
    setActiveTab(initialTabIndex)
  }, [initialTabIndex])

  const activeTabIndexNative = useAnimatedValue(initialTabIndex)
  const [activeTabIndex, setActiveTabIndex] = useGlobalState(initialTabIndex)
  const [tabSpecificStickyHeaderContent, setTabSpecificStickyHeaderContent] = useState<JSX.Element[]>([])
  const { jsx: staticHeader, nativeHeight: staticHeaderHeight } = useAutoCollapsingMeasuredView(staticHeaderContent)

  const stickyRailRef = useRef<SnappyHorizontalRail>(null)

  // This breaks the rules of hooks - you're not supposed to call them inside loops. We're doing it anyway because
  // useAutoCollapsingMeasuredView is a pure function and all we're doing with tabSpecificStickyHeaderContentArray is
  // rendering; it's not involved in any conditionals. We're reasonably confident it will be deterministic, and
  // the alternative (making the hook take in an array of tabs) gets very complicated very quickly
  const tabSpecificStickyHeaderContentArray = tabs.map((_, i) => {
    return useAutoCollapsingMeasuredView(tabSpecificStickyHeaderContent[i])
  })

  // Making sure to always call the same number of hooks even when loading.
  times(MAX_TABS_LENGTH - tabs.length, () => useAutoCollapsingMeasuredView(<></>))

  const { jsx: stickyHeader, nativeHeight: stickyHeaderHeight } = useAutoCollapsingMeasuredView(stickyHeaderContent)
  const headerOffsetY = useAnimatedValue(0)
  const railRef = useRef<SnappyHorizontalRail>(null)

  const shouldHideBackButton = Animated.lessOrEq(headerOffsetY, -10)
  const updateShouldHideBackButton = useUpdadeShouldHideBackButton()

  Animated.useCode(
    () =>
      Animated.onChange(
        shouldHideBackButton,
        Animated.call([shouldHideBackButton], ([shouldHide]) => {
          updateShouldHideBackButton(!!shouldHide)
        })
      ),
    []
  )

  return (
    <StickyTabPageContext.Provider
      value={{
        activeTabIndex,
        staticHeaderHeight,
        stickyHeaderHeight,
        headerOffsetY,
        loading,
        tabLabels: tabs.map((tab) => tab.title),
        setActiveTabIndex(index) {
          setActiveTab(index)
          tracking.trackEvent({
            action_name: tabs[index].title,
            action_type: Schema.ActionTypes.Tap,
          })
        },
      }}
    >
      <View style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* put tab content first because we want the header to be absolutely positioned _above_ it */}

        {!!Animated.neq(stickyHeaderHeight, new Animated.Value(-1)) &&
          !!Animated.neq(staticHeaderHeight, new Animated.Value(-1)) && (
            <SnappyHorizontalRail ref={railRef} initialOffset={initialTabIndex * width} width={width * tabs.length}>
              {tabs.map(({ content }, index) => {
                return (
                  <View style={{ flex: 1, width }} key={index}>
                    <StickyTabPageFlatListContext.Provider
                      value={{
                        tabIsActive: Animated.eq(index, activeTabIndexNative),
                        tabSpecificContentHeight: tabSpecificStickyHeaderContentArray[index].nativeHeight!,
                        setJSX: (jsx) =>
                          setTabSpecificStickyHeaderContent((prev) => {
                            const newArray = prev.slice(0)
                            newArray[index] = jsx
                            return newArray
                          }),
                      }}
                    >
                      {typeof content === "function" ? content(index) : content}
                    </StickyTabPageFlatListContext.Provider>
                  </View>
                )
              })}
            </SnappyHorizontalRail>
          )}
        <Animated.View
          style={{
            width,
            position: "absolute",
            transform: [{ translateY: headerOffsetY as any }],
          }}
          pointerEvents="box-none"
        >
          <Box backgroundColor="white">
            {staticHeader}
            {stickyHeader}
          </Box>
          <SnappyHorizontalRail
            width={width * tabs.length}
            ref={stickyRailRef}
            initialOffset={initialTabIndex * width}
            style={{ flex: undefined, alignItems: "flex-start" }}
          >
            {tabSpecificStickyHeaderContentArray.map((t, i) => (
              <Box key={i} width={width} backgroundColor="white">
                {t.jsx}
              </Box>
            ))}
          </SnappyHorizontalRail>
        </Animated.View>
      </View>
    </StickyTabPageContext.Provider>
  )
}

export function useOnTabFocusedEffect(effect: EffectCallback, tabIndex: number) {
  const { activeTabIndex } = useStickyTabPageContext()
  activeTabIndex.useUpdates()

  useEffect(() => {
    if (activeTabIndex.current === tabIndex) {
      effect()
    }
  }, [activeTabIndex.current])
}
