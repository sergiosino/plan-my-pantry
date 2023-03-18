import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { INGREDIENT_HEIGHT } from '../../constants/constants'
import { useIngredient } from '../../hooks/useIngredient'
import IconButton from '../IconButton'

export default function Ingredient (props) {
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
  } = useIngredient(props)

  return (
    <View style={{ ...styles.container, backgroundColor: isSelected ? 'lightgray' : 'transparent' }}>
      <Pressable
        onPress={handleOnPress}
        onLongPress={handleOnLongPress}
      >
        <View style={styles.dragIconContainer}>
          <MaterialCommunityIcons name='drag' size={25} />
        </View>
      </Pressable>
      <View style={styles.textInputContainer}>
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
      {showDeleteIcon && <IconButton onPress={handleDeletePress} iconName='close' />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: INGREDIENT_HEIGHT,
    paddingRight: 5,
    marginVertical: 2,
    borderRadius: 4
  },
  dragIconContainer: {
    paddingVertical: 5,
    paddingLeft: 5
  },
  textInputContainer: {
    flex: 1
  },
  closeInconContainer: {
    height: 25,
    width: 25
  }
})
