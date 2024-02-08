import { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useColorScheme } from 'nativewind'
import { images } from '../../utils/image'

function ImagePicker({ setImage, image }) {
  const { colorScheme } = useColorScheme()
  const [focused, setFocused] = useState(image)
  const handleFocused = (index) => {
    setFocused(index)
    setImage(index)
  }
  return (
    <View style={{ backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
      <ScrollView>
        <View style={styles.flexRow}>
          {Array.isArray(images) && images.map((image, index) => (
            <TouchableOpacity
              style={{ ...styles.imageItem, borderWidth: focused == index ? 2 : 0, borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}
              key={index} onPress={() => { handleFocused(index) }}>
              <Image source={images[index]} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default ImagePicker
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7
  },
  imageItem: {
    height: 70,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
})