import { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'

import FoodHeader from '../../components/food/FoodHeader'
import AddButton from '../../components/AddButton'
import RecipeItem from '../../components/recipes/RecipeItem'
import SwipeableRow from '../../components/SwippeableRow'
import Divider from '../../components/Divider'
import Button from '../../components/Button'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const RECIPES_MOCK = [
  { id: 1, title: 'Receta 1', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 2, title: 'Receta 2', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 3, title: 'Receta 3', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 4, title: 'Receta 4', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 5, title: 'Receta 5', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 6, title: 'Receta 6', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 7, title: 'Receta 7', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' },
  { id: 8, title: 'Receta 8', ingredients: 'ingrediente 1, ingrediente 2, ingrediente 3' }
]

export default function RecipesView () {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleSwipeableRightClick = () => {
    console.log('right click')
  }

  const handleSwipeableLeftClick = () => {
    console.log('left click')
  }

  const handleAddRecipe = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View style={styles.container}>
      <FoodHeader />
      <FlatList
        contentContainerStyle={styles.flatListContent}
        initialNumToRender={15}
        data={RECIPES_MOCK}
        ItemSeparatorComponent={<Divider />}
        renderItem={({ item: recipe }) => {
          const { title, ingredients } = recipe
          return (
            <SwipeableRow
              onLeftActionPress={handleSwipeableLeftClick}
              onRightActionPress={handleSwipeableRightClick}
            >
              <RecipeItem
                title={title}
                ingredients={ingredients}
              />
            </SwipeableRow>
          )
        }}
      />
      <Modal
        animationType='fade'
        transparent
        visible={isModalVisible}
        onRequestClose={handleAddRecipe}
      >
        <GestureHandlerRootView style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginHorizontal: -15, marginBottom: -15 }}>
              <Text style={styles.modalText}>RECIPE NAME HERE</Text>
              <Text style={styles.modalText}>INGREDIENTS HERE</Text>
              <Text style={styles.modalText}>SOME NOTES ABOUT THE RECIPE HERE</Text>
              <View style={{ flexDirection: 'row', marginHorizontal: 30, marginBottom: 30 }}>
                <Button style={styles.buttonClose} onPress={handleAddRecipe}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Button>
                <Button style={styles.buttonClose} onPress={handleAddRecipe}>
                  <Text style={styles.textStyle}>Save</Text>
                </Button>
              </View>
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>

      <AddButton onAddItem={handleAddRecipe} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContent: {
    paddingBottom: 70
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    borderRadius: 20,
    padding: 15,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    margin: 15,
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
