import { useState } from 'react'
import { Pressable, TextInput, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function IngredientItem (props) {
  const {
    id,
    handleSelect,
    handleUnselect,
    isSelected,
    selectOnPress,
    defaultText,
    handleChange,
    handleDelete
  } = props
  const [text, setText] = useState(defaultText)

  const handleOnPress = () => {
    if (isSelected) {
      handleUnselect(id)
    } else if (selectOnPress) {
      handleSelect(id)
    }
  }

  const handleOnLongPress = () => {
    if (!isSelected) {
      handleSelect(id)
    }
  }

  const handleTextFocusEnd = () => {
    handleChange(id, text)
  }

  const handleDeletePress = () => {
    handleDelete(id)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 5, margin: 1, borderRadius: 4, backgroundColor: isSelected ? 'lightgray' : 'transparent' }}>
      <Pressable
        onPress={handleOnPress}
        onLongPress={handleOnLongPress}
        style={{ paddingVertical: 5, paddingLeft: 5 }}
      >
        <MaterialCommunityIcons name='drag' size={25} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <TextInput
          value={text}
          onChange={setText}
          maxLength={45}
          onEndEditing={handleTextFocusEnd}
        />
      </View>
      <View />
      <TouchableNativeFeedback
        onPress={handleDeletePress}
        background={TouchableNativeFeedback.Ripple('gray', true)}
      >
        <View style={{ height: 25, width: 25 }}>
          <Ionicons name='close' size={25} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}
