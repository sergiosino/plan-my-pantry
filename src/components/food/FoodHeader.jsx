import { StyleSheet, View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import FoodHeaderItem from './FoodHeaderItem'

// TODO: Make the name constants, they are used in other components
const FOOD_HEADER_ITEMS = [
  {
    name: 'Recipes',
    iconName: 'book-outline'
  },
  {
    name: 'Ingredients',
    iconName: 'basket-outline'
  }
]

export default function FoodHeader (props) {
  const { actualView, setActualView } = props

  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      {FOOD_HEADER_ITEMS.map(item => {
        const { name, iconName } = item
        const isActualView = actualView === name
        return (
          <View key={name} style={headerStyles.headerItem}>
            <FoodHeaderItem name={name} iconName={iconName} isActualView={isActualView} setActualView={setActualView} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    backgroundColor: '#f2f2f2'
  }
})
