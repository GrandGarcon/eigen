import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { MyCollectionArtworkArtistAuctionResults_artwork$key } from "__generated__/MyCollectionArtworkArtistAuctionResults_artwork.graphql"
import { AuctionResultListItemFragmentContainer } from "lib/Components/Lists/AuctionResultListItem"
import { SectionTitle } from "lib/Components/SectionTitle"
import { navigate } from "lib/navigation/navigate"
import { extractNodes } from "lib/utils/extractNodes"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { Flex, Separator } from "palette"
import React from "react"
import { FlatList } from "react-native"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface MyCollectionArtworkArtistAuctionResultsProps {
  artwork: MyCollectionArtworkArtistAuctionResults_artwork$key
}

export const MyCollectionArtworkArtistAuctionResults: React.FC<
  MyCollectionArtworkArtistAuctionResultsProps
> = (restProps) => {
  const { trackEvent } = useTracking()

  const artwork = useFragment<MyCollectionArtworkArtistAuctionResults_artwork$key>(
    artworkFragment,
    restProps.artwork
  )

  const artist = artwork.artist
  const auctionResults = extractNodes(artist?.auctionResultsConnection)

  if (!auctionResults.length) {
    return null
  }

  return (
    <Flex>
      <SectionTitle
        title="Similar Works Sold at Auctions"
        onPress={() => {
          trackEvent(
            tracks.tappedShowMore(artwork?.internalID, artwork?.slug, "Explore auction results")
          )
          navigate(`artist/${artist?.slug}/auction-results`)
        }}
      />

      <FlatList
        data={auctionResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <AuctionResultListItemFragmentContainer
              auctionResult={item}
              onPress={() => navigate(`/artist/${artist?.slug!}/auction-result/${item.internalID}`)}
            />
          </>
        )}
        ItemSeparatorComponent={() => (
          <Flex px={2}>
            <Separator />
          </Flex>
        )}
        style={{ width: useScreenDimensions().width, left: -20 }}
      />
    </Flex>
  )
}

const artworkFragment = graphql`
  fragment MyCollectionArtworkArtistAuctionResults_artwork on Artwork {
    internalID
    slug
    artist {
      slug
      name
      auctionResultsConnection(first: 3, sort: DATE_DESC) {
        edges {
          node {
            id
            internalID
            ...AuctionResultListItem_auctionResult
          }
        }
      }
    }
  }
`

const tracks = {
  tappedShowMore: (internalID: string, slug: string, subject: string) => ({
    action: ActionType.tappedShowMore,
    context_module: ContextModule.auctionResults,
    context_screen_owner_type: OwnerType.myCollectionArtwork,
    context_screen_owner_id: internalID,
    context_screen_owner_slug: slug,
    subject,
  }),
}
