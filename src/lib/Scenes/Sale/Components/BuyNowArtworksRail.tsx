import { BuyNowArtworksRail_sale } from "__generated__/BuyNowArtworksRail_sale.graphql"
import { SmallArtworkRail } from "lib/Components/ArtworkRail/SmallArtworkRail"
import { SectionTitle } from "lib/Components/SectionTitle"
import { navigate } from "lib/navigation/navigate"
import { extractNodes } from "lib/utils/extractNodes"
import { compact } from "lodash"
import { Flex } from "palette"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"

interface BuyNowArtworksRailProps {
  sale: BuyNowArtworksRail_sale
}

export const BuyNowArtworksRail: React.FC<BuyNowArtworksRailProps> = ({ sale }) => {
  const artworks = extractNodes(sale.promotedSale?.saleArtworksConnection).map(
    (saleArtwork) => saleArtwork.artwork
  )

  if (!artworks?.length) {
    return null
  }

  return (
    <Flex mt={3} testID="bnmo-rail-wrapper">
      <Flex mx={2}>
        <SectionTitle title="Artworks Available to Buy Now" />
      </Flex>
      <SmallArtworkRail
        artworks={compact(artworks)}
        onPress={(artwork) => {
          navigate(artwork?.href!)
        }}
      />
    </Flex>
  )
}

export const BuyNowArtworksRailContainer = createFragmentContainer(BuyNowArtworksRail, {
  sale: graphql`
    fragment BuyNowArtworksRail_sale on Sale
    @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, cursor: { type: "String" }) {
      internalID
      promotedSale {
        saleArtworksConnection(first: $count, after: $cursor)
          @connection(key: "Sale_saleArtworksConnection") {
          edges {
            node {
              artwork {
                ...SmallArtworkRail_artworks
              }
            }
          }
        }
      }
    }
  `,
})
