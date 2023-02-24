import { StyleSheet } from 'react-native'

const gap = 20

export const headerStyles = StyleSheet.create({
  header: {
    height: 82
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: gap,
    margin: -(gap / 2),
    height: 95
  },
  headerItem: {
    margin: (gap / 2)
  }
})
