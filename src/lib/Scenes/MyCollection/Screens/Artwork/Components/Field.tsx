import { Flex, Text } from "palette"
import React from "react"

export const Field: React.FC<{ label: string; value: string | null }> = ({ label, value }) => {
  if (!value) {
    return null
  }
  return (
    <Flex flexDirection="row" justifyContent="space-between" my={1}>
      <Text color="black60" pr={1}>
        {label}
      </Text>
      <Text style={{ flex: 1, maxWidth: "60%" }} textAlign="right">
        {value}
      </Text>
    </Flex>
  )
}
