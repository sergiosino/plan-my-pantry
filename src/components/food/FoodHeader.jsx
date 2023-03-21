import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import FoodButtonsHeader from './FoodButtonsHeader'
import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'
import { FOOD_HEADER_RECIPES } from '../../constants/constants'
import { useIngredients } from '../../hooks/useIngredients'

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
    setActualView
  } = props

  const { selectedIngredientsList, handleDeleteSelectedIngredients, handleUnselectAllIngredients } = useIngredients()

  const isRecipesView = actualView === FOOD_HEADER_RECIPES
  const isSelectedListEmpty = isRecipesView
    ? true
    : selectedIngredientsList.length === 0

  const onDeleteSelected = () => {
    isRecipesView
      ? handleDeleteSelectedIngredients()
      : handleDeleteSelectedIngredients()
  }

  const onUnselectAll = () => {
    isRecipesView
      ? handleUnselectAllIngredients()
      : handleUnselectAllIngredients()
  }

  const alertDeleteChecked = () => {
    isRecipesView
      ? confirmationAlert('Delete', 'Delete selected ingredients?', onDeleteSelected)
      : confirmationAlert('Delete', 'Delete selected ingredients?', onDeleteSelected)
  }

  return (
    <View>
      {!isSelectedListEmpty
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
