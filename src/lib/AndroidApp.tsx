import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { GlobalStore } from "lib/store/GlobalStore"
import { AdminMenuWrapper } from "lib/utils/AdminMenuWrapper"
import { addTrackingProvider } from "lib/utils/track"
import {
  SEGMENT_TRACKING_PROVIDER,
  SegmentTrackingProvider,
} from "lib/utils/track/SegmentTrackingProvider"
import { useDeepLinks } from "lib/utils/useDeepLinks"
import { useStripeConfig } from "lib/utils/useStripeConfig"
import React, { useEffect } from "react"
import { UIManager, View } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import { AppProviders } from "./AppProviders"
import { useWebViewCookies } from "./Components/ArtsyReactWebView"
import { useSentryConfig } from "./ErrorReporting"
import { ArtsyNativeModule } from "./NativeModules/ArtsyNativeModule"
import { ModalStack } from "./navigation/ModalStack"
import { BottomTabsNavigator } from "./Scenes/BottomTabs/BottomTabsNavigator"
import { ForceUpdate } from "./Scenes/ForceUpdate/ForceUpdate"
import { Onboarding } from "./Scenes/Onboarding/Onboarding"
import { createAllChannels, savePendingToken } from "./utils/PushNotification"
import { useInitializeQueryPrefetching } from "./utils/queryPrefetching"
import { ConsoleTrackingProvider } from "./utils/track/ConsoleTrackingProvider"
import { useExperiments } from "./utils/useExperiments"
import { useFreshInstallTracking } from "./utils/useFreshInstallTracking"
import { useInitialNotification } from "./utils/useInitialNotification"
import { usePreferredThemeTracking } from "./utils/usePreferredThemeTracking"
import { useScreenReaderTracking } from "./utils/useScreenReaderTracking"

addTrackingProvider(SEGMENT_TRACKING_PROVIDER, SegmentTrackingProvider)
addTrackingProvider("console", ConsoleTrackingProvider)

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Main: React.FC = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "673710093763-hbj813nj4h3h183c4ildmu8vvqc0ek4h.apps.googleusercontent.com",
    })
  }, [])
  const isHydrated = GlobalStore.useAppState((state) => state.sessionState.isHydrated)
  const isLoggedIn = GlobalStore.useAppState((state) => !!state.auth.userAccessToken)
  const onboardingState = GlobalStore.useAppState((state) => state.auth.onboardingState)
  const forceUpdateMessage = GlobalStore.useAppState(
    (state) => state.config.echo.forceUpdateMessage
  )

  useSentryConfig()
  useStripeConfig()
  useWebViewCookies()
  useDeepLinks()
  useInitialNotification()
  useExperiments()
  useInitializeQueryPrefetching()

  useEffect(() => {
    createAllChannels()
  }, [])
  usePreferredThemeTracking()
  useScreenReaderTracking()
  useFreshInstallTracking()

  useEffect(() => {
    if (isHydrated) {
      // We wait a bit until the UI finishes drawing behind the splash screen
      setTimeout(() => {
        RNBootSplash.hide().then(() => {
          requestAnimationFrame(() => {
            ArtsyNativeModule.lockActivityScreenOrientation()
          })
        })
        ArtsyNativeModule.setAppStyling()
        if (isLoggedIn) {
          ArtsyNativeModule.setNavigationBarColor("#FFFFFF")
          ArtsyNativeModule.setAppLightContrast(false)
        }
      }, 500)
    }
  }, [isHydrated])

  useEffect(() => {
    if (isLoggedIn) {
      savePendingToken()
    }
  }, [isLoggedIn])

  if (!isHydrated) {
    return <View />
  }

  if (forceUpdateMessage) {
    return <ForceUpdate forceUpdateMessage={forceUpdateMessage} />
  }

  if (!isLoggedIn || onboardingState === "incomplete") {
    return <Onboarding />
  }

  return (
    <ModalStack>
      <BottomTabsNavigator />
    </ModalStack>
  )
}

export const App = () => (
  <AppProviders>
    <AdminMenuWrapper>
      <Main />
    </AdminMenuWrapper>
  </AppProviders>
)
