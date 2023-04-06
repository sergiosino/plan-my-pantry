import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

import Divider from './Divider'

export default function Tutorial (props) {
  const { instructions } = props

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/chick-tutorial.png')} style={styles.chickImg} />
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
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  chickImg: {
    height: 80,
    width: 80
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
