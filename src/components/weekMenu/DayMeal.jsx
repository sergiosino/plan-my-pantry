import { Text, View } from 'react-native'

export default function DayMeal ({ meal, recipe }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold' }}>{meal}</Text>
      <Text style={{ marginTop: 5 }}>{recipe}</Text>
    </View>
  )
}
