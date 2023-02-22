import Checkbox from 'expo-checkbox'
import { StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { GROCERY_ITEM_HEIGHT } from '../../constants/constants'
import { useGroceryItem } from '../../hooks/useGroceryItem'

export default function GroceryItem (props) {
  const {
    id,
    defaultChecked,
    defaultText,
    onDeleteItem,
    isItemToFocus,
    onItemChange
  } = props

  const {
    text,
    setText,
    showDeleteIcon,
    handleTextFocus,
    handleTextFocusEnd,
    handleCheckboxChange,
    handleDelete
  } = useGroceryItem({ id, defaultChecked, defaultText, onItemChange, onDeleteItem })

  return (
    <View
      style={styles.container}
    >
      <Checkbox
        value={defaultChecked}
        onValueChange={handleCheckboxChange}
        color={defaultChecked ? 'gray' : undefined}
        style={styles.checkbox}
      />
      {defaultChecked
        ? (
          <Text style={styles.text}>
            {text}
          </Text>
          )
        : (
          <TextInput
            autoFocus={isItemToFocus}
            style={styles.textInput}
            value={text}
            maxLength={40}
            onChangeText={setText}
            onFocus={handleTextFocus}
            onEndEditing={handleTextFocusEnd}
          />
          )}
      {showDeleteIcon && !defaultChecked && (
        <TouchableNativeFeedback
          onPress={handleDelete}
          background={TouchableNativeFeedback.Ripple('gray', true)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name='close' size={25} />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    height: GROCERY_ITEM_HEIGHT
  },
  checkbox: {
    marginRight: 16,
    color: 'red'
  },
  text: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginVertical: 4.1
  },
  textInput: {
    flex: 1
  },
  iconContainer: {
    height: 25,
    width: 25
  }
})
