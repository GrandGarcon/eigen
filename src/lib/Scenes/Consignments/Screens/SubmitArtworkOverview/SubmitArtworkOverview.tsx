import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { BackButton } from "lib/navigation/BackButton"
import { CollapsibleMenuItem, Flex, Join, Separator, Spacer } from "palette"
import React, { useRef, useState } from "react"
import { ScrollView } from "react-native"
import { ArtworkDetails } from "./ArtworkDetails/ArtworkDetails"
import { ArtworkSubmittedScreen } from "./ArtworkSubmitted"
import { ContactInformationQueryRenderer } from "./ContactInformation/ContactInformation"
import { UploadPhotos } from "./UploadPhotos/UploadPhotos"

interface SubmitArtworkScreenNavigationProps
  extends StackScreenProps<SubmitArtworkOverviewNavigationStack, "SubmitArtworkScreen"> {}

export const SubmitArtworkScreen: React.FC<SubmitArtworkScreenNavigationProps> = ({
  navigation,
}) => {
  const items = [
    {
      overtitle: "Step 1 of 3",
      title: "Artwork Details",
      Content: (
        <ArtworkDetails
          handlePress={() => {
            expandCollapsibleMenuContent(1)
            enableStep(1)
          }}
        />
      ),
    },
    {
      overtitle: "Step 2 of 3",
      title: "Upload Photos",
      Content: (
        <UploadPhotos
          handlePress={() => {
            expandCollapsibleMenuContent(2)
            enableStep(2)
          }}
        />
      ),
    },
    {
      overtitle: "Step 3 of 3",
      title: "Contact Information",
      Content: (
        <ContactInformationQueryRenderer
          handlePress={() => {
            navigation.navigate("ArtworkSubmittedScreen")
          }}
        />
      ),
    },
  ]

  const TOTAL_STEPS = items.length

  // This is a temporary logic that will be removed later
  const [validSteps, setValidSteps] = useState([true, ...new Array(TOTAL_STEPS - 1).fill(false)])

  const stepsRefs = useRef<CollapsibleMenuItem[]>(new Array(TOTAL_STEPS).fill(null)).current

  // This will also be removed, it's temporary for the boilerplate
  const enableStep = (stepIndex: number) => {
    const newValidSteps = [...validSteps]
    newValidSteps[stepIndex] = true
    setValidSteps(newValidSteps)
  }

  const expandCollapsibleMenuContent = (indexToExpand: number) => {
    items.forEach((_, index) => {
      if (indexToExpand !== index) {
        stepsRefs[index].collapse()
      } else {
        if (index > 0) {
          stepsRefs[index - 1].completed()
        }
        stepsRefs[index].expand()
      }
    })
  }

  return (
    <Flex>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <Spacer mb={3} />
        <Join separator={<Separator my={2} marginTop="40" marginBottom="20" />}>
          {items.map(({ overtitle, title, Content }, index) => {
            const disabled = !validSteps[index]
            return (
              <CollapsibleMenuItem
                key={index}
                overtitle={overtitle}
                title={title}
                onExpand={() => expandCollapsibleMenuContent(index)}
                isExpanded={index === 0}
                disabled={disabled}
                ref={(ref) => {
                  if (ref) {
                    stepsRefs[index] = ref
                  }
                }}
              >
                {Content}
              </CollapsibleMenuItem>
            )
          })}
        </Join>
      </ScrollView>
      <Flex position="absolute" top={-50} left={0}>
        <BackButton />
      </Flex>
    </Flex>
  )
}

// tslint:disable-next-line:interface-over-type-literal
export type SubmitArtworkOverviewNavigationStack = {
  SubmitArtworkScreen: undefined
  ArtworkSubmittedScreen: undefined
}

const StackNavigator = createStackNavigator<SubmitArtworkOverviewNavigationStack>()

export const SubmitArtworkOverview = () => {
  return (
    <NavigationContainer independent>
      <StackNavigator.Navigator
        headerMode="screen"
        detachInactiveScreens={false}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "white" },
        }}
      >
        <StackNavigator.Screen name="SubmitArtworkScreen" component={SubmitArtworkScreen} />
        <StackNavigator.Screen
          name="ArtworkSubmittedScreen"
          component={ArtworkSubmittedScreen}
          options={{ gestureEnabled: false, headerLeft: () => <></> }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}
