import { StyleSheet, View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import FoodHeaderButton from './FoodHeaderButton'
import { FOOD_HEADER_BUTTONS } from '../../constants/constants'

export default function FoodNormalHeader (props) {
  const { actualView, setActualView } = props

  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      {FOOD_HEADER_BUTTONS.map(item => {
        const { name, iconName } = item
        const isActualView = actualView === name
        return (
          <View key={name} style={headerStyles.headerItem}>
            <FoodHeaderButton name={name} iconName={iconName} isActualView={isActualView} setActualView={setActualView} />
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