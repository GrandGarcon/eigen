import { ContextModule, OwnerType } from "@artsy/cohesion"
import { ArtworkActions_artwork } from "__generated__/ArtworkActions_artwork.graphql"
import { ArtworkActionsSaveMutation } from "__generated__/ArtworkActionsSaveMutation.graphql"
import { LegacyNativeModules } from "lib/NativeModules/LegacyNativeModules"
import { unsafe__getEnvironment } from "lib/store/GlobalStore"
import { cm2in } from "lib/utils/conversions"
import { Schema, track } from "lib/utils/track"
import { userHadMeaningfulInteraction } from "lib/utils/userHadMeaningfulInteraction"
import { take } from "lodash"
import {
  BellFillIcon,
  BellIcon,
  Box,
  ClassTheme,
  EyeOpenedIcon,
  Flex,
  HeartFillIcon,
  HeartIcon,
  Sans,
  ShareIcon,
  Touchable,
} from "palette"
import React from "react"
import { TouchableWithoutFeedback, View } from "react-native"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"
import styled from "styled-components/native"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
  relay?: RelayProp

  shareOnPress: () => void
}

export const shareContent = (
  title: string,
  href: string,
  artists: ArtworkActions_artwork["artists"]
) => {
  let computedTitle: string | null
  if (artists && artists.length) {
    // @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏
    const names = take(artists, 3).map((artist) => artist.name)
    computedTitle = `${title} by ${names.join(", ")} on Artsy`
  } else if (title) {
    computedTitle = `${title} on Artsy`
  }
  return {
    // @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏
    title: computedTitle,
    // @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏
    message: computedTitle,
    url: `${unsafe__getEnvironment().webURL}${href}?utm_content=artwork-share`,
  }
}

@track()
export class ArtworkActions extends React.Component<ArtworkActionsProps> {
  @track((props: ArtworkActionsProps) => {
    return {
      action_name: props.artwork.is_saved
        ? Schema.ActionNames.ArtworkUnsave
        : Schema.ActionNames.ArtworkSave,
      action_type: Schema.ActionTypes.Success,
      context_module: Schema.ContextModules.ArtworkActions,
    }
  })
  handleArtworkSave() {
    const { artwork, relay } = this.props
    // @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏
    commitMutation<ArtworkActionsSaveMutation>(relay.environment, {
      mutation: graphql`
        mutation ArtworkActionsSaveMutation($input: SaveArtworkInput!) {
          saveArtwork(input: $input) {
            artwork {
              id
              is_saved: isSaved
            }
          }
        }
      `,
      variables: { input: { artworkID: artwork.internalID, remove: artwork.is_saved } },
      // @ts-ignore RELAY 12 MIGRATION
      optimisticResponse: {
        saveArtwork: { artwork: { id: artwork.id, is_saved: !artwork.is_saved } },
      },
      onCompleted: () =>
        userHadMeaningfulInteraction({
          contextModule: ContextModule.artworkMetadata,
          contextOwnerType: OwnerType.artwork,
          contextOwnerId: artwork.internalID,
          contextOwnerSlug: artwork.slug,
        }),
    })
  }

  @track(() => ({
    action_name: Schema.ActionNames.ViewInRoom,
    action_type: Schema.ActionTypes.Tap,
    context_module: Schema.ContextModules.ArtworkActions,
  }))
  openViewInRoom() {
    const {
      artwork: { image, id, slug, heightCm, widthCm },
    } = this.props
    const heightIn = cm2in(heightCm!)
    const widthIn = cm2in(widthCm!)

    LegacyNativeModules.ARScreenPresenterModule.presentAugmentedRealityVIR(
      image?.url!,
      widthIn,
      heightIn,
      slug,
      id
    )
  }

  render() {
    const {
      artwork: { is_saved, is_hangable, sale },
    } = this.props

    const isOpenSale = sale && sale.isAuction && !sale.isClosed

    return (
      <View>
        <Flex flexDirection="row">
          {isOpenSale ? (
            <Touchable haptic onPress={() => this.handleArtworkSave()}>
              <UtilButton pr={2}>
                <Box mr={0.5}>{is_saved ? <BellFillIcon fill="blue100" /> : <BellIcon />}</Box>
                <ClassTheme>
                  {({ color }) => (
                    <Sans size="3" color={is_saved ? color("blue100") : color("black100")}>
                      Watch lot
                    </Sans>
                  )}
                </ClassTheme>
              </UtilButton>
            </Touchable>
          ) : (
            <Touchable haptic onPress={() => this.handleArtworkSave()}>
              <UtilButton pr={2}>
                <Box mr={0.5}>{is_saved ? <HeartFillIcon fill="blue100" /> : <HeartIcon />}</Box>
                <ClassTheme>
                  {({ color }) => (
                    <Sans size="3" color={is_saved ? color("blue100") : color("black100")}>
                      {is_saved ? "Saved" : "Save"}
                    </Sans>
                  )}
                </ClassTheme>
              </UtilButton>
            </Touchable>
          )}

          {!!(LegacyNativeModules.ARCocoaConstantsModule.AREnabled && is_hangable) && (
            <TouchableWithoutFeedback onPress={() => this.openViewInRoom()}>
              <UtilButton pr={2}>
                <Box mr={0.5}>
                  <EyeOpenedIcon />
                </Box>
                <Sans size="3">View in Room</Sans>
              </UtilButton>
            </TouchableWithoutFeedback>
          )}
          <Touchable haptic onPress={() => this.props.shareOnPress()}>
            <UtilButton>
              <Box mr={0.5}>
                <ShareIcon />
              </Box>
              <Sans size="3">Share</Sans>
            </UtilButton>
          </Touchable>
        </Flex>
      </View>
    )
  }
}

const UtilButton = styled(Flex)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const ArtworkActionsFragmentContainer = createFragmentContainer(ArtworkActions, {
  artwork: graphql`
    fragment ArtworkActions_artwork on Artwork {
      id
      internalID
      slug
      title
      href
      is_saved: isSaved
      is_hangable: isHangable
      artists {
        name
      }
      image {
        url
      }
      sale {
        isAuction
        isClosed
      }
      widthCm
      heightCm
    }
  `,
})
