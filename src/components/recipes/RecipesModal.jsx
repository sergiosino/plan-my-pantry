import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import Button from '../Button'

const data = [
  { label: 'Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1 Item 1', value: 1 },
  { label: 'Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2', value: 2 },
  { label: 'Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3 Item 3', value: 3 },
  { label: 'Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4 Item 4', value: 4 },
  { label: 'Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5', value: 5 },
  { label: 'Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6 Item 6', value: 6 },
  { label: 'Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7 Item 7', value: 7 },
  { label: 'Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8 Item 8', value: 8 }
]

export default function RecipesModal () {
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
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            selectedStyle={styles.selectedStyle}
            itemTextStyle={styles.itemTextStyle}
            search
            data={data}
            labelField='label'
            valueField='value'
            placeholder='Select'
            searchPlaceholder='Search...'
            value={selected}
            onChange={item => {
              setSelected(item)
            }}
          />
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
  dropdown: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray',
    marginBottom: 5
  },
  placeholderStyle: {
    fontSize: 14
  },
  selectedTextStyle: {
    fontSize: 14
  },
  inputSearchStyle: {
    height: 40
  },
  itemTextStyle: {
    fontSize: 14
  },
  selectedStyle: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 15
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
