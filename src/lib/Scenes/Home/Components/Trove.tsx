import { Trove_trove } from "__generated__/Trove_trove.graphql"
import { HeroUnit } from "lib/Components/Home/HeroUnit"
import { navigate } from "lib/navigation/navigate"
import { Flex } from "palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface TroveProps {
  trove: Trove_trove
  mb?: number
}

const Trove: React.FC<TroveProps> = ({ trove, mb }) => {
  const troveUnit = trove?.heroUnits?.find((itm) => itm?.title === "Trove")

  const showTrove = !!troveUnit && !!troveUnit.backgroundImageURL && !!troveUnit.href

  if (!showTrove) {
    return null
  }

  const handleOnPress = () => {
    const path = troveUnit!.href!
    navigate(path)
  }

  return (
    <Flex mb={mb}>
      <HeroUnit unit={troveUnit!} onPress={handleOnPress} isTrove />
    </Flex>
  )
}

export const TroveFragmentContainer = createFragmentContainer(Trove, {
  trove: graphql`
    fragment Trove_trove on HomePage
    @argumentDefinitions(heroImageVersion: { type: "HomePageHeroUnitImageVersion" }) {
      heroUnits(platform: MOBILE) {
        title
        subtitle
        creditLine
        href
        backgroundImageURL(version: $heroImageVersion)
      }
    }
  `,
})
