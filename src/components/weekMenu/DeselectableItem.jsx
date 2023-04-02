import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export default function DeselectableItem (props) {
  const { onPress, text } = props

  return (
    <View style={styles.rowSelectedItem}>
      <RectButton style={styles.rectButton} onPress={() => onPress && onPress(text)}>
        <View style={styles.selectedItem}>
          <Text style={styles.selectedTextLeftItem}>
            {text}
          </Text>
          <Text style={styles.selectedTextItem}>
            ⓧ
          </Text>
        </View>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  rowSelectedItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 4
  },
  rectButton: {
    borderRadius: 4
  },
  selectedItem: {
    borderRadius: 4,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row'
  },
  selectedTextLeftItem: {
    fontSize: 12,
    color: 'gray',
    writingDirection: 'row'
  },
  selectedTextItem: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 16,
    writingDirection: 'row'
  }
})
