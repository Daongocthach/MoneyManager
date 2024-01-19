import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CategoryExpense from '../components/Category/CategoriesToEdit/CategoriesExpense'
import CategoryIncome from '../components/Category/CategoriesToEdit/CategoriesIncome'

const EditCategory = () => {
  const navigation = useNavigation()
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)

  const handleSwitch = () => {
    setIsExpense(!isExpense)
    setIsIncome(!isIncome)
  }
  const handleClickAdd = () => {
    setIsExpense(!isExpense)
    setIsIncome(!isIncome)
  }
  const onClickLeft = () => {
    navigation.navigate('Trang chủ')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name='keyboard-arrow-left' size={30} color={'#1E90FF'} onPress={onClickLeft} />
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: isIncome ? '#eff0f1' : '#1E90FF' }}
          onPress={handleSwitch}
        >
          <Text style={{ ...styles.text, color: isIncome ? '#1E90FF' : 'white' }}>Chi tiêu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: isExpense ? '#eff0f1' : '#1E90FF' }}
          onPress={handleSwitch}
        >
          <Text style={{ ...styles.text, color: isExpense ? '#1E90FF' : 'white' }}>Thu nhập</Text>
        </TouchableOpacity>
        <Icon name='add' size={30} color={'#1E90FF'} />
      </View>
      <View style={styles.body}>
        {isExpense && <CategoryExpense />}
        {isIncome && <CategoryIncome />}
      </View>
    </View>
  )
}

export default EditCategory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbff'
  },
  header: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    gap: 10
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    flex: 1,
    backgroundColor: '#1E90FF',
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  body: {
    flex: 9,
    backgroundColor: '#fafbff'
  }
})
