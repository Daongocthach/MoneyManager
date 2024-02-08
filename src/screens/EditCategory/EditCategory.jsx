import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CategoriesExpense from '../../components/Category/CategoriesToEdit/CategoriesExpense'
import CategoriesIncome from '../../components/Category/CategoriesToEdit/CategoriesIncome'
import { useColorScheme } from 'nativewind'
import getStyles from './styles'

const EditCategory = () => {
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const navigation = useNavigation()
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)

  const handleClickExpense = () => {
    if (isExpense == false) {
      setIsExpense(true)
      setIsIncome(false)
    }
  }
  const handleClickIncome = () => {
    if (isIncome == false) {
      setIsIncome(true)
      setIsExpense(false)
    }
  }
  const onClickLeft = () => {
    navigation.navigate('Trang chủ')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name='keyboard-arrow-left' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={onClickLeft} />
        <Text style={styles.title}>Chỉnh sửa danh mục</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.select}>
          {colorScheme == 'light' ?
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? 'black' : 'white' }} onPress={handleClickExpense}>
              <Text style={{ ...styles.text, color: isExpense ? 'white' : 'black' }}>Chi tiêu</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? '#AAAAAA' : 'black' }} onPress={handleClickExpense}>
              <Text style={{ ...styles.text, color: isExpense ? 'black' : '#AAAAAA' }}>Chi tiêu</Text>
            </TouchableOpacity>
          }
          {colorScheme == 'light' ?
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? 'black' : 'white' }} onPress={handleClickIncome}>
              <Text style={{ ...styles.text, color: isIncome ? 'white' : 'black' }}>Thu nhập</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? '#AAAAAA' : 'black' }} onPress={handleClickIncome}>
              <Text style={{ ...styles.text, color: isIncome ? 'black' : '#AAAAAA' }}>Thu nhập</Text>
            </TouchableOpacity>
          }
        </View>
        {isExpense && <CategoriesExpense />}
        {isIncome && <CategoriesIncome />}

      </View>
    </View>

  )
}

export default EditCategory
