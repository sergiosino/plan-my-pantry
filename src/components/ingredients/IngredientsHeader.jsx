import { StyleSheet, View } from 'react-native'

import { confirmationAlert } from '../../utils/confirmationAlert'
import FoodHeader from '../food/FoodHeader'
import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'

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

export default function IngredientsHeader (props) {
  const {
    actualView,
    setActualView,
    onDeleteSelected,
    enableDeleteAll,
    onUnselectAll
  } = props

  const alertDeleteChecked = () => {
    if (enableDeleteAll) { confirmationAlert('Delete', 'Delete selected ingredients?', onDeleteSelected) }
  }

  return (
    <View>
      {enableDeleteAll
        ? <FoodSelectedHeader onUnselectAll={onUnselectAll} alertDeleteChecked={alertDeleteChecked} />
        : <FoodHeader actualView={actualView} setActualView={setActualView} />}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    justifyContent: 'space-between'
  }
})
