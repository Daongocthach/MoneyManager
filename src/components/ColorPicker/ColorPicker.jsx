import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useColorScheme } from 'nativewind'
const colors = [
  '#F4A460',
  '#CDB38B',
  '#CDB7B5',
  '#1E90FF',
  '#7AC5CD',
  '#00CD66',
  '#CDC673',
  '#FFC125',
  '#8B658B',
  'gray',
  '#CDBE70',
  '#00EE76',
  '#98F5FF',
  '#00BFFF',
  '#8470FF',
  '#EE6363'
]

const ColorPicker = ({ onSelectColor, color }) => {
  const { colorScheme } = useColorScheme()
  const [selectedColor, setSelectedColor] = useState(color || colors[0])

  const handleColorSelect = (item) => {
    setSelectedColor(item)
    onSelectColor(item)
  }
  return (
    <ScrollView style={{
      ...styles.container, backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
      borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black'
    }}>
      <View style={styles.flexRow}>
        {Array.isArray(colors) && colors.map((data, index) => (
          <TouchableOpacity
            style={{ borderWidth: selectedColor == data ? 3: 0, borderColor: selectedColor == data ? '#8DEEEE' : 'white' }}
            key={index} onPress={() => { handleColorSelect(data) }}>
            <View
              style={{
                backgroundColor: data, width: 50, height: 50, margin: 5,
                borderRadius: 10
              }} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

  )
}

export default ColorPicker

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 5
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7
  }
})