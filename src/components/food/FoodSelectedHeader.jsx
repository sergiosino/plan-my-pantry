import { StyleSheet, View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import IconButton from '../IconButton'

export default function FoodSelectedHeader (props) {
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

const styles = StyleSheet.create({
  localHeaderContainer: {
    justifyContent: 'space-between'
  }
})
