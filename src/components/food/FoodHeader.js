import { View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import { ROUTE_NAME_RECIPES, ROUTE_NAME_INGREDIENTS } from '../../constants/routes'
import FoodHeaderItem from './FoodHeaderItem'

export default function FoodHeader () {
  return (
    <View style={[headerStyles.headerContainer]}>
      <FoodHeaderItem routeName={ROUTE_NAME_RECIPES} />
      <FoodHeaderItem routeName={ROUTE_NAME_INGREDIENTS} />
    </View>
  )
}
