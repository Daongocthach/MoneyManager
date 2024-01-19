import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CircleChart from '../components/Chart/CircleChart'
import DatePicker from '../components/DatePicker'
import { formatCurrency } from '../utils/price'
import ListBottles from '../components/Bottles/ListBottles'

const Statistic = memo(() => {
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  const [total, setTotal] = useState(0)
  const bottles = useSelector(state => state.bottles.bottles)
  const handleSwitch = () => {
    setIsExpense(!isExpense)
    setIsIncome(!isIncome)
  }
  useEffect(() => {
    const totalIncome = incomes.reduce((acc, income) => acc + income.total, 0)
    setIncome(totalIncome)
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.total, 0)
    setExpense(totalExpense)
  }, [incomes, expenses])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Báo cáo</Text>
      </View>
      <View style={styles.body}>
        <View style={{ height: 50 }}>
          <DatePicker />
        </View>
        <ScrollView>
          <View style={styles.expenseIncome}>
            <View style={styles.income}>
              <View>
                <Text style={styles.text}>Thu nhập</Text>
                <Text style={{ ...styles.price, color: 'green' }}>{formatCurrency(income)}</Text>
              </View>
            </View>
            <View style={styles.expense}>
              <View>
                <Text style={styles.text}>Chi tiêu</Text>
                <Text style={styles.price}>{formatCurrency(expense)}</Text>
              </View>
            </View>
          </View>
          <View style={{ ...styles.total, marginBottom: 5 }}>
            <Text style={styles.text}>Số dư khả dụng: </Text>
            <Text style={{ fontSize: 20, color: '#363636', fontWeight: 'bold' }}>{formatCurrency(income - expense)}</Text>
          </View>
          {/* Switch */}
          <View style={styles.flexView}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? '#eff0f1' : '#1E90FF' }} onPress={handleSwitch}>
              <Text style={{ ...styles.text, color: isIncome ? '#1E90FF' : 'white' }}>Chi tiêu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? '#eff0f1' : '#1E90FF' }} onPress={handleSwitch}>
              <Text style={{ ...styles.text, color: isExpense ? '#1E90FF' : 'white' }}>Thu nhập</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}><CircleChart /></View>
          <ListBottles bottles={bottles} />

        </ScrollView>
      </View>

    </View>
  )

})

export default Statistic

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbff'
  },
  header: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  expenseIncome: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 2,
    marginTop: 5,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  income: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  expense: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  text: {
    color: '#646e79',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  price: {
    color: '#EE6363',
    fontSize: 20,
    fontWeight: 'bold',
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

})