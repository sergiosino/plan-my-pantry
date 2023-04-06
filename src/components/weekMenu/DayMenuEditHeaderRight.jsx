import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'

import { useUserConfig } from '../../hooks/useUserConfig'

import { ROUTE_DAY_MENU_EDIT_HELP } from '../../constants/routes'

const GAP = 15

export default function DayMenuEditHeaderRight () {
  const navigation = useNavigation()
  const { showHeaderHelpIcon } = useUserConfig()

  const handlePressHelp = () => {
    navigation.navigate(ROUTE_DAY_MENU_EDIT_HELP)
  }

  return showHeaderHelpIcon && (
    <View style={styles.localHeaderContainer}>
      <IconButton onPress={handlePressHelp} iconName='help-outline' />
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: GAP,
    margin: -(GAP),
    justifyContent: 'flex-end'
  }
})
