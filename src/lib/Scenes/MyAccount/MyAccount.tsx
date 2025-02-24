import { MyAccount_me } from "__generated__/MyAccount_me.graphql"
import { MyAccountQuery } from "__generated__/MyAccountQuery.graphql"
import { MenuItem } from "lib/Components/MenuItem"
import { PageWithSimpleHeader } from "lib/Components/PageWithSimpleHeader"
import { SectionTitle } from "lib/Components/SectionTitle"
import { navigate } from "lib/navigation/navigate"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { useFeatureFlag } from "lib/store/GlobalStore"
import { useAppleLink } from "lib/utils/LinkedAccounts/apple"
import { useFacebookLink } from "lib/utils/LinkedAccounts/facebook"
import { useGoogleLink } from "lib/utils/LinkedAccounts/google"
import { PlaceholderText } from "lib/utils/placeholders"
import { renderWithPlaceholder } from "lib/utils/renderWithPlaceholder"
import { times } from "lodash"
import { Box, Flex, Text } from "palette"
import React from "react"
import { ActivityIndicator, Image, Platform, ScrollView } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer, RelayProp } from "react-relay"

const MyAccount: React.FC<{ me: MyAccount_me; relay: RelayProp }> = ({ me, relay }) => {
  const hasOnlyOneAuth = me.authentications.length + (me.hasPassword ? 1 : 0) < 2

  const onlyExistingAuthFor = (provider: "FACEBOOK" | "GOOGLE" | "APPLE") => {
    return (
      hasOnlyOneAuth && me.authentications.length > 0 && me.authentications[0].provider === provider
    )
  }

  const showLinkGoogle = useFeatureFlag("ARGoogleAuth") && !onlyExistingAuthFor("GOOGLE")
  const showLinkApple = Platform.OS === "ios" && !onlyExistingAuthFor("APPLE")
  const showLinkFacebook = !onlyExistingAuthFor("FACEBOOK")

  const showLinkedAccounts =
    useFeatureFlag("ARShowLinkedAccounts") &&
    !me.secondFactors?.length &&
    (showLinkGoogle || showLinkApple || showLinkFacebook)

  const {
    link: linkFB,
    unlink: unlinkFB,
    isLoading: fbLoading,
  } = useFacebookLink(relay.environment)
  const {
    link: linkGoogle,
    unlink: unlinkGoogle,
    isLoading: googleLoading,
  } = useGoogleLink(relay.environment)
  const {
    link: linkApple,
    unlink: unlinkApple,
    isLoading: appleLoading,
  } = useAppleLink(relay.environment)

  const facebookLinked = me.authentications.map((a) => a.provider).includes("FACEBOOK")
  const googleLinked = me.authentications.map((a) => a.provider).includes("GOOGLE")
  const appleLinked = me.authentications.map((a) => a.provider).includes("APPLE")

  const linkOrUnlink = (provider: "facebook" | "google" | "apple") => {
    switch (provider) {
      case "apple":
        return appleLinked ? unlinkApple() : linkApple()
      case "facebook":
        return facebookLinked ? unlinkFB() : linkFB()
      case "google":
        return googleLinked ? unlinkGoogle() : linkGoogle()
      default:
        return
    }
  }

  return (
    <PageWithSimpleHeader title="Account">
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <MenuItem
          title="Full Name"
          value={me.name}
          onPress={() => navigate("my-account/edit-name")}
        />
        <MenuItem
          title="Email"
          value={me.email}
          ellipsizeMode="middle"
          onPress={() => {
            navigate("my-account/edit-email")
          }}
        />
        <MenuItem
          title="Phone"
          value={me.phone || "Add phone"}
          onPress={() => navigate("my-account/edit-phone")}
        />
        {!!me.hasPassword && (
          <MenuItem
            title="Password"
            value="Change password"
            onPress={() => navigate("my-account/edit-password")}
          />
        )}
        {!!me.paddleNumber && <MenuItem title="Paddle Number" value={me.paddleNumber} />}
        {!!showLinkedAccounts && (
          <Flex mt={3}>
            <Box mx={2}>
              <SectionTitle title="LINKED ACCOUNTS" />
            </Box>

            {!!showLinkFacebook && (
              <MenuItem
                title="Facebook"
                disabled={
                  hasOnlyOneAuth &&
                  me.authentications.length > 0 &&
                  me.authentications[0].provider === "FACEBOOK"
                }
                rightView={
                  fbLoading ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Flex flexDirection="row" alignItems="center">
                      <Image
                        source={require(`@images/facebook.webp`)}
                        resizeMode="contain"
                        style={{ marginRight: 10 }}
                      />
                      <Text variant="md" color="black60" lineHeight={18}>
                        {facebookLinked ? "Unlink" : "Link"}
                      </Text>
                    </Flex>
                  )
                }
                onPress={fbLoading ? () => null : () => linkOrUnlink("facebook")}
              />
            )}

            {!!showLinkGoogle && (
              <MenuItem
                title="Google"
                disabled={
                  hasOnlyOneAuth &&
                  me.authentications.length > 0 &&
                  me.authentications[0].provider === "GOOGLE"
                }
                rightView={
                  googleLoading ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Flex flexDirection="row" alignItems="center">
                      <Image
                        source={require(`@images/google.webp`)}
                        resizeMode="contain"
                        style={{ marginRight: 10 }}
                      />
                      <Text variant="md" color="black60" lineHeight={18}>
                        {googleLinked ? "Unlink" : "Link"}
                      </Text>
                    </Flex>
                  )
                }
                onPress={googleLoading ? () => null : () => linkOrUnlink("google")}
              />
            )}
            {!!showLinkApple && (
              <MenuItem
                title="Apple"
                disabled={
                  hasOnlyOneAuth &&
                  me.authentications.length > 0 &&
                  me.authentications[0].provider === "APPLE"
                }
                rightView={
                  appleLoading ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Flex flexDirection="row" alignItems="center">
                      <Image
                        source={require(`@images/apple.webp`)}
                        resizeMode="contain"
                        style={{ marginRight: 10, tintColor: "black" }}
                      />
                      <Text variant="md" color="black60" lineHeight={18}>
                        {appleLinked ? "Unlink" : "Link"}
                      </Text>
                    </Flex>
                  )
                }
                onPress={appleLoading ? () => null : () => linkOrUnlink("apple")}
              />
            )}
          </Flex>
        )}
      </ScrollView>
    </PageWithSimpleHeader>
  )
}

const MyAccountPlaceholder: React.FC<{}> = ({}) => {
  return (
    <PageWithSimpleHeader title="Account">
      <Flex px={2} py={1}>
        {times(5).map((index: number) => (
          <Flex key={index} py={7.5}>
            <PlaceholderText width={100 + Math.random() * 100} />
          </Flex>
        ))}
      </Flex>
    </PageWithSimpleHeader>
  )
}

export const MyAccountContainer = createFragmentContainer(MyAccount, {
  me: graphql`
    fragment MyAccount_me on Me {
      name
      email
      phone
      paddleNumber
      hasPassword
      authentications {
        provider
      }
      secondFactors(kinds: [sms, app, backup]) {
        kind
      }
    }
  `,
})

export const MyAccountQueryRenderer: React.FC<{}> = () => {
  return (
    <QueryRenderer<MyAccountQuery>
      environment={defaultEnvironment}
      query={graphql`
        query MyAccountQuery {
          me {
            ...MyAccount_me
          }
        }
      `}
      render={renderWithPlaceholder({
        Container: MyAccountContainer,
        renderPlaceholder: () => <MyAccountPlaceholder />,
      })}
      variables={{}}
    />
  )
}
