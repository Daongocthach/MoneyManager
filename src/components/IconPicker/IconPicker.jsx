import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
const expenseIcons = [
  'bank', 'car', 'food', 'home', 'music', 'shopping', 'tshirt-v',
  'credit-card', 'piggy-bank-outline', 'book-education',
  'shoe-sneaker', 'airplane', 'yoga', 'gift', 'movie', 'hospital-box', 'train-car', 'note-outline'
]
const incomeIcons = [
  'alien', 'briefcase', 'wallet', 'hand-coin-outline', 'account-cash', 'trending-up', 'briefcase-account',
  'cash', 'alarm-plus', 'bank', 'gift', 'cash-refund', 'credit-card', 'bitcoin', 'piggy-bank-outline'
]

const IconPicker = ({ onSelectIcon, icon, isExpense }) => {
  const { colorScheme } = useColorScheme()
  const [selectedIcon, setSelectedIcon] = useState(icon || expenseIcons[0])
  let datas
  if (isExpense) {
    datas = expenseIcons
  }
  else {
    datas = incomeIcons
  }
  const handleIconSelect = (item) => {
    setSelectedIcon(item)
    onSelectIcon(item)
  }
  return (
    <ScrollView style={{
      ...styles.container, backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
      borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black'
    }}>
      <View style={styles.flexRow}>
        {Array.isArray(datas) && datas.map((data, index) => (
          <TouchableOpacity
            style={{ borderWidth: selectedIcon == data ? 2: 0, borderColor: selectedIcon == data ? '#8DEEEE' : 'white' }}
            key={index} onPress={() => { handleIconSelect(data) }}>
            <Icon name={data} size={50}
              style={{
                margin: 2,
                color: colorScheme == 'dark' ? '#AAAAAA' : 'black'
              }} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default IconPicker

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