import { TouchableNativeFeedback, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function IconButton (props) {
  const { onPress, iconName } = props

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('gray', true, 20)}
    >
      <View>
        <Ionicons name={iconName} size={20} />
      </View>
    </TouchableNativeFeedback>
  )
}
