import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

import Divider from './Divider'

export default function Tutorial (props) {
  const { instructions } = props

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Help!'
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-tutorial.png')} style={{ height: 80, width: 80 }} />
      </View>
      <Divider />
      <ScrollView style={styles.scrollView}>
        {instructions.map((help) => {
          const { id, text, image, style } = help
          return (
            <View key={id}>
              <Text style={styles.text}>{text}</Text>
              <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                  <Image source={image} style={style} />
                </View>
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
  imageBorder: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: 'gray'
  },
  text: {
    marginBottom: 15,
    fontSize: 16
  },
  divider: {
    marginVertical: 20
  }
})
