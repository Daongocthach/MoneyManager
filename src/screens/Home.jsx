import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState, useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from '../components/DatePicker'
import CategoryExpense from '../components/Category/CategoriesToInput/CategoryExpense'
import CategoryIncome from '../components/Category/CategoriesToInput/CategoryIncome'
import ListBottles from '../components/Bottles/ListBottles'
import avatar from '../../assets/favicon.png'
import { incomeToBottles, expenseToBottle, resetBottles } from '../redux/actions/bottles'
import { addIncome, resetIncome } from '../redux/actions/incomes'
import { addExpense, resetExpense } from '../redux/actions/expenses'

const Home = memo(() => {
  const dispatch = useDispatch()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [categoryIncome, setCategoryIncome] = useState(0)
  const [categoryExpense, setCategoryExpense] = useState(0)
  const [bottle, setBottle] = useState(0)
  const categoriesIncome = useSelector(state => state.categoriesIncome.categoriesIncome)
  const categoriesExpense = useSelector(state => state.categoriesExpense.categoriesExpense)
  const bottles = useSelector(state => state.bottles.bottles)
  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)
  const [note, setNote] = useState('')
  const [expense, setExpense] = useState('')
  const [income, setIncome] = useState('')

  const handleSwitch = useCallback(() => {
    setIsExpense((prev) => !prev)
    setIsIncome((prev) => !prev)
  }, [])
  const handleSubmit = () => {
    if (isExpense) {
      try {
        const newExpense = {
          id: expenses.length,
          date: currentDate,
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
        showAlert()
        // dispatch(resetExpense())
        // dispatch(resetBottles())
        // dispatch(resetIncome())
      } catch (error) {
        console.log(error)
      }
      

    }
    else {
      try {
        const newIncome = {
          id: incomes.length,
          date: currentDate,
          note: note,
          category: categoryIncome,
          total: parseInt(income)
        }
        dispatch(addIncome(newIncome))
        dispatch(incomeToBottles(parseInt(income)))
        showAlert()
      } catch (error) {
        console.log(error)
      }
    }
  }
  const showAlert = () =>
    Alert.alert(
      'Add Successed',
      'Thêm thành công',
      [
        {
          text: 'Ok',
          style: 'default'
        }
      ]
    )
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Icon name='menu' size={30} />
        <Text style={styles.title}>Trang chủ</Text>
        <Image source={avatar} height={30} width={30} borderRadius={15} />
      </View>
      <View style={styles.body}>
        {/* Switch */}
        <View style={styles.flexView}>
          <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? '#eff0f1' : '#1E90FF' }} onPress={handleSwitch}>
            <Text style={{ ...styles.text, color: isIncome ? '#1E90FF' : 'white' }}>Chi tiêu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? '#eff0f1' : '#1E90FF' }} onPress={handleSwitch}>
            <Text style={{ ...styles.text, color: isExpense ? '#1E90FF' : 'white' }}>Thu nhập</Text>
          </TouchableOpacity>
        </View>
        {/* Date Note Input */}
        <View style={{ ...styles.flexView, marginVertical: 10 }}>
          <Text style={styles.textTitle}>Ngày: </Text>
          <DatePicker setCurrentDate={setCurrentDate} />
        </View>
        <View style={{ ...styles.flexView, marginVertical: 10 }}>
          <Text style={styles.textTitle}>Ghi chú: </Text>
          <TextInput style={styles.input} placeholder='Nhập ghi chú ...' onChangeText={setNote} value={note} />
        </View>
        {isExpense && <View style={{ ...styles.flexView, marginVertical: 10 }}>
          <Text style={styles.textTitle}>Chi tiêu: </Text>
          <TextInput style={styles.input} placeholder='0 đ' onChangeText={(value) => { setExpense(value) }} value={expense} keyboardType='numeric' />
        </View>}
        {isIncome && <View style={{ ...styles.flexView, marginVertical: 10 }}>
          <Text style={styles.textTitle}>Thu nhập: </Text>
          <TextInput style={styles.input} placeholder='0 đ' onChangeText={(value) => { setIncome(value) }} value={income} keyboardType='numeric' />
        </View>}
        {/* Category */}
        <ScrollView>
          <Text style={{ color: '#777777', fontSize: 18, marginLeft: 15, fontWeight: 'bold', marginTop: 10 }}>Danh mục</Text>
          {isExpense && <CategoryExpense categoriesExpense={categoriesExpense} setCategoryExpense={setCategoryExpense} />}
          {isIncome && <CategoryIncome categoriesIncome={categoriesIncome} setCategoryIncome={setCategoryIncome} />}
          {/* Bottle */}
          {isExpense && <Text style={{ color: '#777777', fontSize: 18, marginLeft: 15, fontWeight: 'bold', marginTop: 10 }}>Danh sách hũ</Text>}
          {isExpense && <ListBottles bottles={bottles} setBottle={setBottle}/>}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Nhập</Text>
        </TouchableOpacity>
      </View>
    </View >
  )

})

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbff'
  },
  header: {
    marginTop: 20,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafbff'
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  body: {
    flex: 8,
    backgroundColor: '#fafbff'
  },
  footer: {
    flex: 0.5,
    backgroundColor: '#eff0f1'
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    backgroundColor: '#1E90FF',
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 40,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  input: {
    flex: 3,
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
    marginRight: 10,
    fontSize: 18,
    color: '#777777'
  },
  textTitle: {
    color: '#777777',
    flex: 1,
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold'
  }

})