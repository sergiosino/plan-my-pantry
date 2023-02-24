import { Text, View } from 'react-native'

import { FoodHeader } from '../../components/food/FoodHeader'

export default function RecipesView (props) {
  const { navigation } = props
  return (
    <View style={{ flex: 1 }}>
      <FoodHeader navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recipes: Work in progress!</Text>
      </View>
    </View>
  )
}
