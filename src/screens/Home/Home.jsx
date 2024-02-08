import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { NumericFormat } from 'react-number-format'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useColorScheme } from 'nativewind'
import DatePicker from '../../components/DatePicker/DatePicker'
import CategoryExpense from '../../components/Category/CategoriesToInput/CategoryExpense'
import CategoryIncome from '../../components/Category/CategoriesToInput/CategoryIncome'
import ListBottles from '../../components/Bottles/ListBottles'
import { incomeToBottles, expenseToBottle } from '../../redux/actions/bottles'
import { addIncome } from '../../redux/actions/incomes'
import { addExpense } from '../../redux/actions/expenses'
import showAlertOk from '../../components/Alert/AlertOk'
import getStyles from './styles'
import { FIREBASE_AUTH } from '../../../firebase'
import { logout } from '../../redux/actions/auth'

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [categoryIncome, setCategoryIncome] = useState(0)
  const [categoryExpense, setCategoryExpense] = useState(0)
  const [bottle, setBottle] = useState(0)

  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)
  const [note, setNote] = useState('')
  const [expense, setExpense] = useState('')
  const [income, setIncome] = useState('')
  const currentUser = useSelector(state => state.auth.email)
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
  const handleSubmit = () => {
    if (isExpense && expense !== '') {
      try {
        const newExpense = {
          id: expenses?.length,
          date: currentDate.toISOString(),
          note: note,
          category: categoryExpense,
          bottle: bottle,
          total: parseInt(expense)
        }
        const newBottle = {
          id: bottle,
          total: parseInt(expense)
        }
        dispatch(addExpense(newExpense))
        dispatch(expenseToBottle(newBottle))
        setExpense('')
        setNote('')
        showAlertOk('Nhập thành công', 'Bạn đã nhập thành công chi tiêu, bấm OK để tiếp tục.')
      } catch (error) {
        console.log(error)
      }
    }
    else if (income !== '') {
      const newIncome = {
        id: incomes?.length,
        date: currentDate.toISOString(),
        note: note,
        category: categoryIncome,
        total: parseInt(income)
      }
      dispatch(addIncome(newIncome))
      dispatch(incomeToBottles(parseInt(income)))
      setIncome('')
      setNote('')
      showAlertOk('Nhập thành công', 'Bấm OK để tiếp tục.')
    } else {
      showAlertOk('Bạn chưa điền đủ thông tin', 'Bấm OK để tiếp tục.')
    }
  }
  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            FIREBASE_AUTH.signOut()
            dispatch(logout())
            showAlertOk('Bạn đã đăng xuất thành công', 'Bấm Ok để tiếp tục')
          },
          style: 'default'
        }
      ]
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Icon name='home-outline' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} />
        <Text style={styles.title}>Trang chủ</Text>
        {currentUser ?
          <Icon name='logout' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={handleLogout} /> :
          <Icon name='login' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={() => { navigation.navigate('Login') }} />
        }
      </View>
      <View style={styles.body}>
        {/* Switch */}
        <View style={styles.flexView}>
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
        {/* Date Note Input */}
        <View style={styles.flexView}>
          <Text style={styles.textTitle}>Ngày: </Text>
          <DatePicker setCurrentDate={setCurrentDate} isMonth={false} />
        </View>
        <View style={styles.flexView}>
          <Text style={styles.textTitle}>Ghi chú: </Text>
          <TextInput style={styles.input} placeholder='Nhập ghi chú ...' placeholderTextColor={'gray'} onChangeText={setNote} value={note} />
        </View>
        {isExpense && <View style={styles.flexView}>
          <Text style={styles.textTitle} >Chi tiêu: </Text>
          <NumericFormat value={expense} displayType={'text'} thousandSeparator={true} renderText={(formattedValue) => (
            <TextInput
              style={styles.input}
              placeholder='0 đ' placeholderTextColor={'gray'}
              onChangeText={(value) => {
                const numericValue = value.replace(/\D/g, '')
                setExpense(numericValue)
              }}
              value={formattedValue}
              keyboardType='numeric'
            />
          )}
          />
        </View>}
        {isIncome && <View style={styles.flexView}>
          <Text style={styles.textTitle}>Thu nhập: </Text>
          <NumericFormat value={income} displayType={'text'} thousandSeparator={true} renderText={(formattedValue) => (
            <TextInput
              style={styles.input}
              placeholder='0 đ' placeholderTextColor={'gray'}
              onChangeText={(value) => {
                const numericValue = value.replace(/\D/g, '')
                setIncome(numericValue)
              }}
              value={formattedValue}
              keyboardType='numeric'
            />
          )}
          />
        </View>}
        {/* Category */}
        <ScrollView >
          <Text style={{ ...styles.textTitle, marginTop: 10 }}>Danh mục: </Text>
          {isExpense && <CategoryExpense setCategoryExpense={setCategoryExpense} />}
          {isIncome && <CategoryIncome setCategoryIncome={setCategoryIncome} />}
          {/* Bottle */}
          {isExpense && <Text style={{ ...styles.textTitle, marginTop: 10 }}>Danh sách hũ: </Text>}
          {isExpense && <ListBottles setBottle={setBottle} bottle={bottle}/>}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
          <Text style={{ ...styles.text, color: colorScheme == 'light' ? 'white' : 'white' }}>Nhập</Text>
        </TouchableOpacity>
      </View>
    </View >
  )

}

export default Home
