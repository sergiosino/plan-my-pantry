import { StyleSheet } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'

export default function MultipleSelect (props) {
  const { data, selected, onSelect } = props

  return (
    <MultiSelect
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      selectedStyle={styles.selectedStyle}
      itemTextStyle={styles.itemTextStyle}
      search
      data={data}
      labelField='text'
      valueField='id'
      placeholder='Select'
      searchPlaceholder='Search...'
      value={selected}
      onChange={onSelect}
    />
  )
}

const styles = StyleSheet.create({
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
  }
})
