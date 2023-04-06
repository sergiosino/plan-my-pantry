import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import IconButton from '../buttons/IconButton'

import { useUserConfig } from '../../hooks/useUserConfig'

import { ROUTE_NAME_DAY_MENU_EDIT_HELP } from '../../constants/routes'

const GAP = 20

export default function DayMenuEditHeaderRight () {
  const navigation = useNavigation()
  const { showHeaderHelpIcon } = useUserConfig()

  const handlePressHelp = () => {
    navigation.navigate(ROUTE_NAME_DAY_MENU_EDIT_HELP)
  }

  return showHeaderHelpIcon && (
    <View style={styles.localHeaderContainer}>
      <View style={styles.headerItem}>
        <IconButton onPress={handlePressHelp} iconName='help-outline' />
      </View>
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
  },
  headerItem: {
    margin: (GAP / 2)
  }
})
