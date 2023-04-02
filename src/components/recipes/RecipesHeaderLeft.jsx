import { Dimensions, StyleSheet, View } from 'react-native'

import TextInputSyled from '../forms/TextInputSyled'

const GAP = 25
const windowDimensions = Dimensions.get('window')

export default function RecipesHeaderLeft (props) {
  const { setSearch } = props

  return (
    <View style={styles.localHeaderContainer}>
      <TextInputSyled onChangeText={setSearch} autoFocus />
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    marginLeft: 16,
    backgroundColor: 'red',
    width: (windowDimensions.width - 120),
    justifyContent: 'center'
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
