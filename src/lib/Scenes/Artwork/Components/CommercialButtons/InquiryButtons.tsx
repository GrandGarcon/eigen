import { ActionType, OwnerType, TappedContactGallery } from "@artsy/cohesion"
import { InquiryButtons_artwork } from "__generated__/InquiryButtons_artwork.graphql"
import { InquirySuccessNotification } from "lib/Scenes/Artwork/Components/CommercialButtons/InquirySuccessNotification"
import {
  ArtworkInquiryContext,
  ArtworkInquiryStateProvider,
} from "lib/utils/ArtworkInquiry/ArtworkInquiryStore"
import { InquiryTypes } from "lib/utils/ArtworkInquiry/ArtworkInquiryTypes"
import { InquiryOptions } from "lib/utils/ArtworkInquiry/ArtworkInquiryTypes"
import { Button, ButtonProps } from "palette"
import React, { useContext, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { InquiryModalFragmentContainer } from "./InquiryModal"
export interface InquiryButtonsProps {
  artwork: InquiryButtons_artwork
  // EditionSetID is passed down from the edition selected by the user
  editionSetID?: string
  variant?: ButtonProps["variant"]
}

export interface InquiryButtonsState {
  modalIsVisible: boolean
}

const InquiryButtons: React.FC<InquiryButtonsProps> = ({ artwork, variant }) => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const { trackEvent } = useTracking()
  const [notificationVisibility, setNotificationVisibility] = useState(false)
  const { dispatch } = useContext(ArtworkInquiryContext)
  const dispatchAction = (buttonText: string) => {
    dispatch({
      type: "selectInquiryType",
      payload: buttonText as InquiryTypes,
    })

    setModalVisibility(true)
  }

  return (
    <>
      <InquirySuccessNotification
        modalVisible={notificationVisibility}
        toggleNotification={(state: boolean) => setNotificationVisibility(state)}
      />
      <Button
        onPress={() => {
          trackEvent(tracks.trackTappedContactGallery(artwork.slug, artwork.internalID))
          dispatchAction(InquiryOptions.ContactGallery)
        }}
        variant={variant}
        size="large"
        block
        width={100}
        haptic
      >
        {InquiryOptions.ContactGallery}
      </Button>
      <InquiryModalFragmentContainer
        artwork={artwork}
        modalIsVisible={modalVisibility}
        toggleVisibility={() => setModalVisibility(!modalVisibility)}
        onMutationSuccessful={(state: boolean) => setNotificationVisibility(state)}
      />
    </>
  )
}

const InquiryButtonsWrapper: React.FC<InquiryButtonsProps> = (props) => (
  <ArtworkInquiryStateProvider>
    <InquiryButtons {...props} />
  </ArtworkInquiryStateProvider>
)

export const InquiryButtonsFragmentContainer = createFragmentContainer(InquiryButtonsWrapper, {
  artwork: graphql`
    fragment InquiryButtons_artwork on Artwork {
      image {
        url
        width
        height
      }
      slug
      internalID
      isPriceHidden
      title
      date
      medium
      dimensions {
        in
        cm
      }
      editionOf
      signatureInfo {
        details
      }
      artist {
        name
      }
      ...InquiryModal_artwork
    }
  `,
})

const tracks = {
  trackTappedContactGallery: (slug: string, internalID: string): TappedContactGallery => ({
    action: ActionType.tappedContactGallery,
    context_owner_type: OwnerType.artwork,
    context_owner_slug: slug,
    context_owner_id: internalID,
  }),
}
