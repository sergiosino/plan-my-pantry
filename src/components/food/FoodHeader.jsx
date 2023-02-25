import { View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import { ROUTE_NAME_RECIPES, ROUTE_NAME_INGREDIENTS } from '../../constants/routes'
import FoodHeaderItem from './FoodHeaderItem'

const FOOD_HEADER_ITEMS = [
  {
    routeName: ROUTE_NAME_RECIPES,
    iconName: 'book-outline'
  },
  {
    routeName: ROUTE_NAME_INGREDIENTS,
    iconName: 'basket-outline'
  }
]

export default function FoodHeader () {
  return (
    <View style={[headerStyles.headerContainer]}>
      {FOOD_HEADER_ITEMS.map(item => {
        const { routeName, iconName } = item
        return <FoodHeaderItem key={routeName} routeName={routeName} iconName={iconName} />
      })}
    </View>
  )
}
