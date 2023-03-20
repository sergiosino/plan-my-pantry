import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Text } from 'react-native'

export function getTabBarStyle (navigation, route) {
  const actualRoute = getFocusedRouteNameFromRoute(route)
  if (actualRoute?.includes('modal')) {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
      headerTitle: () => (
        <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
          <Ionicons name='arrow-back-outline' size={25} />
        </TouchableWithoutFeedback>
      )
    })
  } else {
    navigation.setOptions({
      tabBarStyle: { display: 'flex' },
      headerTitle: () => (<Text style={{ fontSize: 16, fontWeight: '600' }}>{actualRoute}</Text>)
    })
  }
}
