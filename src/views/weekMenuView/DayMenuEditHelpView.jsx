import { Image, StyleSheet, Text, View } from 'react-native'
import Divider from '../../components/Divider'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

const HELPS = [
  {
    id: 1,
    text: '\u2023 To CHANGE between lunch and dinner:',
    image: require('../../../assets/menu-day-change.png'),
    style: { height: 160, width: 300 }
  },
  {
    id: 2,
    text: '\u2023 To SELECT a recipe for the current meal:',
    image: require('../../../assets/menu-meal-change.png'),
    style: { height: 200, width: 300 }
  },
  {
    id: 3,
    text: '\u2023 To ADD the ingredients of the meals to the grocery list:',
    image: require('../../../assets/menu-add-ingredients.png'),
    style: { height: 255, width: 300 }
  }
]

export default function DayMenuEditHelpView () {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Help!'
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/chick-tutorial.png')} style={{ height: 80, width: 80 }} />
      </View>
      <Divider />
      <ScrollView style={styles.scrollView}>
        {HELPS.map((help) => {
          const { id, text, image, style } = help
          return (
            <View key={id}>
              <Text style={styles.text}>{text}</Text>
              <View style={styles.imageContainer}>
                <Image source={image} style={style} />
              </View>
              <Divider style={styles.divider} />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: 10,
    paddingTop: 20
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  text: {
    marginBottom: 15,
    fontSize: 16
  },
  divider: {
    marginVertical: 20
  }
})
