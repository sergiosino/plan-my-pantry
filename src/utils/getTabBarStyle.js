import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

export function getTabBarStyle (navigation, route) {
  const actualRoute = getFocusedRouteNameFromRoute(route)
  if (actualRoute?.includes('modal')) {
    navigation.setOptions({ tabBarStyle: { display: 'none' } })
  } else {
    navigation.setOptions({ tabBarStyle: { display: 'flex' } })
  }
}
