import { ArtworksFiltersStore } from "lib/Components/ArtworkFilter/ArtworkFilterStore"
import { HeaderArtworksFilter } from "lib/Components/HeaderArtworksFilter/HeaderArtworksFilter"
import React from "react"
import { Animated } from "react-native"

interface HeaderArtworksFilterWithTotalArtworksProps {
  animationValue?: Animated.Value
  onPress: () => void
}

export const HeaderArtworksFilterWithTotalArtworks: React.FC<
  HeaderArtworksFilterWithTotalArtworksProps
> = (props) => {
  const artworksTotal = ArtworksFiltersStore.useStoreState((state) => state.counts.total) ?? 0

  return <HeaderArtworksFilter total={artworksTotal} {...props} />
}
