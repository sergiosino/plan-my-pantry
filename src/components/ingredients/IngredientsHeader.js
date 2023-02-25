import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { confirmationAlert } from '../../utils/confirmationAlert'
import { FoodHeader } from '../food/FoodHeader'
import { headerStyles } from '../../styles/headerStyles'

function Header (props) {
  const { onUnselectAll, alertDeleteChecked } = props

  return (
    <View style={[headerStyles.headerContainer, styles.localHeader]}>
      <View style={headerStyles.headerItem}>
        <TouchableNativeFeedback
          onPress={onUnselectAll}
          background={TouchableNativeFeedback.Ripple('gray', true, 20)}
        >
          <View>
            <Ionicons name='close' size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={headerStyles.headerItem}>
        <TouchableNativeFeedback
          onPress={alertDeleteChecked}
          background={TouchableNativeFeedback.Ripple('gray', true, 20)}
        >
          <View>
            <Ionicons name='md-trash-outline' size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

export default function IngredientsHeader (props) {
  const {
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
        ? <Header onUnselectAll={onUnselectAll} alertDeleteChecked={alertDeleteChecked} />
        : <FoodHeader />}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeader: {
    justifyContent: 'space-between'
  }
})
