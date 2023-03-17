import { useNavigation } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { IngredientsContext } from '../../contexts/IngredientsContext'
import Button from '../Button'
import MultipleSelect from '../MultipleSelect'

export default function RecipesModal () {
  const { ingredients } = useContext(IngredientsContext)
  const navigation = useNavigation()
  const [selected, setSelected] = useState([])
  const [text, setText] = useState([])

  return (
    <View style={{ padding: 15, backgroundColor: 'white', flex: 1, justifyContent: 'space-between' }}>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.modalText}>Recipe name</Text>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
          />
          <Text style={styles.modalText}>Ingredients</Text>
          <MultipleSelect data={ingredients} selected={selected} onSelect={setSelected} />
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Button style={styles.buttonClose} onPress={() => navigation.goBack()}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Button>
        <Button style={styles.buttonClose} onPress={() => navigation.goBack()}>
          <Text style={styles.textStyle}>Save</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray'
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
    marginTop: 15,
    marginBottom: 5
  }
})
