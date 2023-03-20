import { StyleSheet } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'
import DeselectableItem from './DeselectableItem'

export default function MultiSelectStyled (props) {
  const { data, selected, onSelect } = props

  return (
    <MultiSelect
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle}
      search
      data={data}
      labelField='text'
      valueField='id'
      placeholder='Select'
      searchPlaceholder='Search...'
      value={selected}
      onChange={onSelect}
      renderSelectedItem={(item, unSelect) => (
        <DeselectableItem item={item} onPress={unSelect} />
      )}
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
  inputSearchStyle: {
    height: 40
  },
  itemTextStyle: {
    fontSize: 14
  }
})
