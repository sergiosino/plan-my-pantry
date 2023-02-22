import { useState } from 'react'
import { Pressable, TextInput, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { INGREDIENT_HEIGHT } from '../../constants/constants'

export default function IngredientItem (props) {
  const {
    id,
    onSelect,
    onUnselect,
    isSelected,
    selectOnPress,
    defaultText,
    onChange,
    onDelete,
    isItemToFocus
  } = props
  const [text, setText] = useState(defaultText)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const handleOnPress = () => {
    if (isSelected) {
      onUnselect(id)
    } else if (selectOnPress) {
      onSelect(id)
    }
  }

  const handleOnLongPress = () => {
    if (!isSelected) {
      onSelect(id)
    }
  }

  const handleTextFocus = () => {
    setShowDeleteIcon(true)
  }

  const handleTextFocusEnd = () => {
    setShowDeleteIcon(false)
    onChange(id, text)
  }

  const handleDeletePress = () => {
    onDelete(id)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: INGREDIENT_HEIGHT, paddingRight: 5, margin: 1, borderRadius: 4, backgroundColor: isSelected ? 'lightgray' : 'transparent' }}>
      <Pressable
        onPress={handleOnPress}
        onLongPress={handleOnLongPress}
        style={{ paddingVertical: 5, paddingLeft: 5 }}
      >
        <MaterialCommunityIcons name='drag' size={25} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <TextInput
          autoFocus={isItemToFocus}
          value={text}
          onChangeText={setText}
          maxLength={45}
          onFocus={handleTextFocus}
          onEndEditing={handleTextFocusEnd}
        />
      </View>
      <View />
      {showDeleteIcon &&
        <TouchableNativeFeedback
          onPress={handleDeletePress}
          background={TouchableNativeFeedback.Ripple('gray', true)}
        >
          <View style={{ height: 25, width: 25 }}>
            <Ionicons name='close' size={25} />
          </View>
        </TouchableNativeFeedback>}
    </View>
  )
}
