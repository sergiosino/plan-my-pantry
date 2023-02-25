import { TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function IconButton (props) {
  const {
    onPress,
    iconName,
    size = 20,
    style
  } = props

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('gray', true, size)}
    >
      <View style={{ ...style }}>
        <Ionicons name={iconName} size={size} />
      </View>
    </TouchableNativeFeedback>
  )
}
