import { Text, View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'

export default function FoodEditingHeader () {
  return (
    <View style={headerStyles.headerContainer}>
      <View style={headerStyles.headerItem}>
        <Text>Editing...</Text>
      </View>
    </View>
  )
}
