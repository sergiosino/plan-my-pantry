import { Alert, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function IngredientsHeader (props) {
  const { handleDeleteChecked, enableDeleteAll, handleUnselectAll } = props

  const confirmationAlert = (title, message, onOK) => {
    Alert.alert(title, message, [
      { text: 'Cancel' },
      { text: 'OK', onPress: onOK }
    ])
  }

  const alertDeleteChecked = () => {
    if (enableDeleteAll) { confirmationAlert('Delete', 'Delete selected ingredients?', handleDeleteChecked) }
  }

  const touchableColor = enableDeleteAll ? 'gray' : 'transparent'
  const deleteIconColor = enableDeleteAll ? 'black' : 'gray'
  const headerContentJustify = enableDeleteAll ? 'space-between' : 'flex-end'

  return (
    <View style={{ ...styles.headerContainer, justifyContent: headerContentJustify }}>
      {enableDeleteAll &&
        <View style={styles.headerItem}>
          <TouchableNativeFeedback
            onPress={handleUnselectAll}
            background={TouchableNativeFeedback.Ripple(touchableColor, true, 20)}
          >
            <View>
              <Ionicons color={deleteIconColor} name='close' size={20} />
            </View>
          </TouchableNativeFeedback>
        </View>}
      <View style={styles.headerItem}>
        <TouchableNativeFeedback
          onPress={alertDeleteChecked}
          background={TouchableNativeFeedback.Ripple(touchableColor, true, 20)}
        >
          <View>
            <Ionicons color={deleteIconColor} name='md-trash-outline' size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}

const gap = 20

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: gap,
    margin: -(gap / 2)
  },
  headerItem: {
    margin: (gap / 2)
  }
})
