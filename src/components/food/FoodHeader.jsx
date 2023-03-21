import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import FoodButtonsHeader from './FoodButtonsHeader'
import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'
import { FOOD_HEADER_RECIPES } from '../../constants/constants'

function FoodSelectedHeader (props) {
  const { onUnselectAll, alertDeleteChecked } = props

  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={onUnselectAll} iconName='close' />
      </View>
      <View style={headerStyles.headerItem}>
        <IconButton onPress={alertDeleteChecked} iconName='md-trash-outline' />
      </View>
    </View>
  )
}

export default function FoodHeader (props) {
  const {
    actualView,
    setActualView,
    enableDeleteAll,
    onDeleteSelectedIngredient,
    onUnselectAllIngredients
  } = props

  const onDeleteSelected = () => {
    actualView === FOOD_HEADER_RECIPES
      ? onDeleteSelectedIngredient()
      : onDeleteSelectedIngredient()
  }

  const onUnselectAll = () => {
    actualView === FOOD_HEADER_RECIPES
      ? onUnselectAllIngredients()
      : onUnselectAllIngredients()
  }

  const alertDeleteChecked = () => {
    if (enableDeleteAll) {
      actualView === FOOD_HEADER_RECIPES
        ? confirmationAlert('Delete', 'Delete selected ingredients?', onDeleteSelected)
        : confirmationAlert('Delete', 'Delete selected ingredients?', onDeleteSelected)
    }
  }

  return (
    <View>
      {enableDeleteAll
        ? <FoodSelectedHeader onUnselectAll={onUnselectAll} alertDeleteChecked={alertDeleteChecked} />
        : <FoodButtonsHeader actualView={actualView} setActualView={setActualView} />}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    justifyContent: 'space-between'
  }
})
