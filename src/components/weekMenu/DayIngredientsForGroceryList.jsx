import { StyleSheet, Text, View } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import Button from '../Button'

function ErasableItem (props) {
  const { text, onPress } = props

  return (
    <View style={styles.rowSelectedItem}>
      <RectButton onPress={onPress}>
        <View style={styles.selectedItem}>
          <Text style={styles.selectedTextLeftItem}>
            {text}
          </Text>
          <Text style={styles.selectedTextItem}>
            ⓧ
          </Text>
        </View>
      </RectButton>
    </View>
  )
}

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
          <ErasableItem text='Ingrediente 1' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 2' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 3' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 4' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 5' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 6' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 7' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 8' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 9' onPress={handleErasableItemPressed} />
          <ErasableItem text='Ingrediente 10' onPress={handleErasableItemPressed} />
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
  rowSelectedItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6,
    marginRight: 8
  },
  selectedItem: {
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row'
  },
  selectedTextLeftItem: {
    fontSize: 12,
    color: 'gray',
    writingDirection: 'row'
  },
  selectedTextItem: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 16,
    writingDirection: 'row'
  }
})
