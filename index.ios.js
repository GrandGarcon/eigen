global.__TEST__ = false
global.__STORYBOOK__ = false

let metaflags = {
  startStorybook: false,
}
if (__DEV__) {
  try {
    const fileContents = require("./metaflags.json")
    metaflags = { ...metaflags, ...fileContents }
  } catch {}
}

if (metaflags.startStorybook) {
  global.__STORYBOOK__ = true
  require("./src/storybook")
} else {
  require("react-native-gesture-handler")
  require("react-native-screens").enableScreens()
  require("./src/lib/ErrorReporting").setupSentry()
  require("./src/lib/AppRegistry")
}
