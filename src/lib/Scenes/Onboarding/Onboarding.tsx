import { NavigationContainer } from "@react-navigation/native"
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import {
  ArtsyKeyboardAvoidingView,
  ArtsyKeyboardAvoidingViewContext,
} from "lib/Components/ArtsyKeyboardAvoidingView"
import { ArtsyWebViewPrivacy, ArtsyWebViewTerms } from "lib/Components/ArtsyReactWebViewPolicy"
import { GlobalStore } from "lib/store/GlobalStore"
import { NetworkAwareProvider } from "lib/utils/NetworkAwareProvider"
import React from "react"
import { View } from "react-native"
import { useFeatureFlag } from "../../store/GlobalStore"
import { ForgotPassword } from "./ForgotPassword"
import {
  OnboardingCreateAccount,
  OnboardingCreateAccountWithEmail,
} from "./OnboardingCreateAccount/OnboardingCreateAccount"
import { OnboardingLogin, OnboardingLoginWithEmail } from "./OnboardingLogin"
import { OnboardingLoginWithOTP, OTPMode } from "./OnboardingLoginWithOTP"
import { OnboardingPersonalization } from "./OnboardingPersonalization/OnboardingPersonalization"
import { AppleToken, GoogleOrFacebookToken, OnboardingSocialLink } from "./OnboardingSocialLink"
import { OnboardingWelcome } from "./OnboardingWelcome"

// tslint:disable-next-line:interface-over-type-literal
export type OnboardingNavigationStack = {
  OnboardingWelcome: undefined
  OnboardingLogin: { withFadeAnimation: boolean } | undefined
  OnboardingLoginWithEmail: { withFadeAnimation: boolean; email: string } | undefined
  OnboardingLoginWithOTP: {
    email: string
    password: string
    otpMode: OTPMode
    onSignIn?: () => void
  }
  OnboardingCreateAccount: { withFadeAnimation: boolean } | undefined
  OnboardingCreateAccountWithEmail: undefined
  OnboardingSocialLink: {
    email: string
    name: string
    providers: string[]
    providerToBeLinked: string
    tokenForProviderToBeLinked: GoogleOrFacebookToken | AppleToken
  }
  ForgotPassword: undefined
  Terms: undefined
  Privacy: undefined
}

const StackNavigator = createStackNavigator<OnboardingNavigationStack>()

export const OnboardingWelcomeScreens = () => {
  return (
    <NavigationContainer independent>
      <StackNavigator.Navigator
        initialRouteName="OnboardingWelcome"
        headerMode="screen"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      >
        <StackNavigator.Screen name="OnboardingWelcome" component={OnboardingWelcome} />
        <StackNavigator.Screen
          name="OnboardingLogin"
          component={OnboardingLogin}
          options={({ route: { params } }) => ({
            cardStyleInterpolator: params?.withFadeAnimation
              ? CardStyleInterpolators.forFadeFromBottomAndroid
              : CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <StackNavigator.Screen
          name="OnboardingLoginWithEmail"
          component={OnboardingLoginWithEmail}
          options={({ route: { params } }) => ({
            cardStyleInterpolator: params?.withFadeAnimation
              ? CardStyleInterpolators.forFadeFromBottomAndroid
              : CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <StackNavigator.Screen name="OnboardingLoginWithOTP" component={OnboardingLoginWithOTP} />
        <StackNavigator.Screen
          name="OnboardingCreateAccount"
          component={OnboardingCreateAccount}
          options={({ route: { params } }) => ({
            cardStyleInterpolator: params?.withFadeAnimation
              ? CardStyleInterpolators.forFadeFromBottomAndroid
              : CardStyleInterpolators.forHorizontalIOS,
          })}
        />
        <StackNavigator.Screen
          name="OnboardingCreateAccountWithEmail"
          component={OnboardingCreateAccountWithEmail}
        />
        <StackNavigator.Screen name="OnboardingSocialLink" component={OnboardingSocialLink} />
        <StackNavigator.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen name="Terms" component={ArtsyWebViewTerms} />
        <StackNavigator.Screen name="Privacy" component={ArtsyWebViewPrivacy} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}
export const Onboarding = () => {
  const onboardingState = GlobalStore.useAppState((state) => state.auth.onboardingState)
  const showNetworkUnavailableModal = useFeatureFlag("ARShowNetworkUnavailableModal")

  return (
    <View style={{ flex: 1 }}>
      <ArtsyKeyboardAvoidingViewContext.Provider
        value={{ isVisible: true, isPresentedModally: false, bottomOffset: 0 }}
      >
        <ArtsyKeyboardAvoidingView>
          {onboardingState === "incomplete" ? (
            <OnboardingPersonalization />
          ) : (
            <OnboardingWelcomeScreens />
          )}
          {!!showNetworkUnavailableModal && <NetworkAwareProvider />}
        </ArtsyKeyboardAvoidingView>
      </ArtsyKeyboardAvoidingViewContext.Provider>
    </View>
  )
}
