import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Button from '../Button'
import DeselectableItem from '../multiSelect/DeselectableItem'

export default function DayIngredientsForGroceryList () {
  const handleAddGroceryList = () => {
    console.log('handleAddGroceryList')
  }

  const handleErasableItemPressed = () => {
    console.log('handleErasableItemPressed')
  }

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <View>
        <Text style={{ fontWeight: 'bold' }}>Ingredients for the grocery list:</Text>
      </View>
      <ScrollView>
        <View style={{ flex: 1, marginTop: 5, flexWrap: 'wrap', flexDirection: 'row' }}>
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 1' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 2' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 3' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 4' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 5' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 6' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 7' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 8' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 9' }} onPress={handleErasableItemPressed} />
          <DeselectableItem item={{ id: 1, text: 'Ingrediente 10' }} onPress={handleErasableItemPressed} />
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Button style={{ backgroundColor: 'gray' }} onPress={handleAddGroceryList}>
          <Text style={{ color: 'white' }}>Add</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
})
