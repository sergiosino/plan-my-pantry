import { Pressable, TextInput, TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { INGREDIENT_HEIGHT } from '../../constants/constants'
import { useIngredientItem } from '../../hooks/useIngredientItem'

export default function IngredientItem (props) {
  const {
    isSelected,
    isItemToFocus
  } = props

  const {
    text,
    setText,
    showDeleteIcon,
    handleOnPress,
    handleOnLongPress,
    handleTextFocus,
    handleTextFocusEnd,
    handleDeletePress
  } = useIngredientItem(props)

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
