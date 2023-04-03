import { Image, StyleSheet, Text, View } from 'react-native'
import Divider from '../../components/Divider'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const HELPS = [
  {
    id: 1,
    text: '\u2023 To ADD a new recipe press the bottom right button:',
    image: require('../../../assets/button-add.png'),
    style: { height: 60, width: 60 }
  },
  {
    id: 2,
    text: '\u2023 To EDIT a recipe, press on it:',
    image: require('../../../assets/recipe-edit.png'),
    style: { height: 100, width: 300 }
  },
  {
    id: 3,
    text: '\u2023 To DELETE a recipe, press and drag to the right:',
    image: require('../../../assets/recipe-delete.png'),
    style: { height: 100, width: 300 }
  }
]

export default function RecipesHelpView () {
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
