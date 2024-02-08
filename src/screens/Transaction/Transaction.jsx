import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useColorScheme } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import DatePicker from '../../components/DatePicker/DatePicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatCurrency } from '../../utils/price'
import { filterTransactionsByMonth, groupTransactionsByDay } from '../../utils/filter'
import { images } from '../../utils/image'
import getStyles from './styles'

const Transaction = () => {
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const navigation = useNavigation()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)
  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  const bottles = useSelector(state => state.bottles.bottles)
  const [filteredIncomes, setFilteredIncomes] = useState([])
  const [filteredExpenses, setFilteredExpenses] = useState([])
  const categoriesIncome = useSelector(state => state.categoriesIncome.categoriesIncome)
  const categoriesExpense = useSelector(state => state.categoriesExpense.categoriesExpense)
  const handleClickExpense = () => {
    if (isExpense == false) {
      setIsIncome(false)
      setIsExpense(true)
    }
  }
  const handleClickIncome = () => {
    if (isIncome == false) {
      setIsIncome(true)
      setIsExpense(false)
    }
  }
  useEffect(() => {
    if (incomes && incomes.length > 0) {
      setFilteredIncomes(groupTransactionsByDay(filterTransactionsByMonth(incomes, currentDate.getMonth(), currentDate.getFullYear())))
    }
    else {
      setFilteredIncomes([])
    }
    if (expenses && expenses.length > 0) {
      setFilteredExpenses(groupTransactionsByDay(filterTransactionsByMonth(expenses, currentDate.getMonth(), currentDate.getFullYear())))
    }
    else {
      setFilteredExpenses([])
    }
  }, [incomes, expenses, currentDate])

  const renderTransactionGroup = (transactionGroup) => {
    return transactionGroup.map((transaction, index) => (
      <ScrollView key={index}>
        <TouchableOpacity style={styles.transaction} onPress={() => {
          isIncome ?
            navigation.navigate('EditIncome', {
              income: {
                ...transaction,
                date: transaction.date.toString()
              }, categoriesIncome
            }) :
            navigation.navigate('EditExpense', {
              expense: {
                ...transaction,
                date: transaction.date.toString()
              }, categoriesExpense, bottles
            })
        }}>
          <View style={{ ...styles.flexView, justifyContent: 'space-between' }}>
            {isIncome ?
              <View style={{ ...styles.flexView, gap: 5 }}>
                <Icon name={categoriesIncome[transaction.category]?.icon || 'bank'} color={categoriesIncome[transaction.category]?.color} size={30} />
                <Text style={styles.text}>{categoriesIncome[transaction.category]?.name}</Text>
              </View>
              :
              <View style={{ ...styles.flexView, gap: 5 }}>
                <Icon name={categoriesExpense[transaction.category]?.icon || 'bank'} color={categoriesExpense[transaction.category]?.color} size={30} />
                <Text style={styles.text}>{categoriesExpense[transaction.category]?.name}</Text>
              </View>}
            <View>
              {isExpense && <View style={{ ...styles.flexView, justifyContent: 'flex-start' }}>
                <Text style={styles.text}>{bottles[transaction.bottle]?.name}</Text>
                <Image source={images[bottles[transaction.bottle]?.image]} style={styles.image} />
              </View>}
              <View style={{ ...styles.flexView, height: isIncome ? 50 : 30 }}>
                <Text style={{ ...styles.text, color: transaction?.total >= 0 ? '#008B00' : '#FF6A6A' }} >{formatCurrency(transaction?.total)}</Text>
                <Icon name={'chevron-right'} style={{ ...styles.icon, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }} />
              </View>
            </View>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.text}>Ghi chú: </Text>
            <Text style={styles.text} >{transaction.note}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    ))
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giao dịch</Text>
      </View>
      <View style={styles.body}>
        <View style={{ height: 40 }}>
          <DatePicker setCurrentDate={setCurrentDate} isMonth={true} />
        </View>
        <ScrollView>
          {/* Switch */}
          <View style={{ ...styles.flexView, marginTop: 10, justifyContent: 'center' }}>
            {colorScheme == 'light' ?
              <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? 'black' : 'white' }} onPress={handleClickExpense}>
                <Text style={{ ...styles.text, color: isExpense ? 'white' : 'black' }}>Chi tiêu</Text>
              </TouchableOpacity> :
              <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? '#AAAAAA' : 'black' }} onPress={handleClickExpense}>
                <Text style={{ ...styles.text, color: isExpense ? 'black' : 'white' }}>Chi tiêu</Text>
              </TouchableOpacity>
            }
            {colorScheme == 'light' ?
              <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? 'black' : 'white' }} onPress={handleClickIncome}>
                <Text style={{ ...styles.text, color: isIncome ? 'white' : 'black' }}>Thu nhập</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? '#AAAAAA' : 'black' }} onPress={handleClickIncome}>
                <Text style={{ ...styles.text, color: isIncome ? 'black' : 'white' }}>Thu nhập</Text>
              </TouchableOpacity>
            }
          </View>
          {/* Transaction */}
          <View style={{ gap: 5, margin: 5, marginTop: 10 }}>
            {isIncome &&
              Object.keys(filteredIncomes).map((date, index) => (
                <View key={index} >
                  <Text style={{ ...styles.text, textAlign: 'left' }}>{date}</Text>
                  {renderTransactionGroup(filteredIncomes[date])}
                </View>
              ))}
            {isExpense &&
              Object.keys(filteredExpenses).map((date, index) => (
                <View key={index}>
                  <Text style={{ ...styles.text, textAlign: 'left' }}>{date}</Text>
                  {renderTransactionGroup(filteredExpenses[date])}
                </View>
              ))}
          </View>
        </ScrollView>
      </View>

    </View>
  )

}

export default Transaction
