import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from '../components/DatePicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatCurrency } from '../utils/price'
import ListBottles from '../components/Bottles/ListBottles'

const Transaction = memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isExpense, setIsExpense] = useState(true)
  const [isIncome, setIsIncome] = useState(false)
  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  const categoriesIncome = useSelector(state => state.categoriesIncome.categoriesIncome)
  const categoriesExpense = useSelector(state => state.categoriesExpense.categoriesExpense)
  const handleSwitch = () => {
    setIsExpense(!isExpense)
    setIsIncome(!isIncome)
  }
  const handleSubmit = () => {
    console.log(incomes)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giao dịch</Text>
      </View>
      <View style={styles.body}>
        <View style={{ height: 50 }}>
          <DatePicker setCurrentDate={setCurrentDate}/>
        </View>
        <ScrollView>
          {/* Switch */}
          <View style={{ ...styles.flexView, marginTop: 10, justifyContent: 'center' }}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isIncome ? '#eff0f1' : '#1E90FF' }} onPress={handleSwitch}>
              <Text style={{ ...styles.text, color: isIncome ? '#1E90FF' : 'white' }}>Chi tiêu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: isExpense ? '#eff0f1' : '#1E90FF' }} onPress={handleSwitch}>
              <Text style={{ ...styles.text, color: isExpense ? '#1E90FF' : 'white' }}>Thu nhập</Text>
            </TouchableOpacity>
          </View>
          {/* Transaction */}
          <View >
            {isIncome && incomes.map((income, index) => (
              <View key={index} style={styles.transaction}>
                <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' }}>{new Date(income.date).toLocaleDateString()}</Text>
                <View style={{ ...styles.flexView, justifyContent: 'space-between' }}>
                  <View style={{ ...styles.flexView, gap: 5 }}>
                    <Icon name={categoriesIncome[income.category].icon} color={categoriesIncome[income.category].color} size={30} />
                    <Text style={{ ...styles.text, color: '#4F4F4F' }}>{categoriesIncome[income.category].name}</Text>
                  </View>
                  <Text style={{ ...styles.text, color: '#FF6A6A' }}>{formatCurrency(income.total)}</Text>
                </View>
                <View style={styles.flexView}>
                  <Text style={{ color: '#4F4F4F', fontSize: 14, fontWeight: 'bold' }}>Note: </Text>
                  <Text style={{ color: '#4F4F4F' }}>{income.note}</Text>
                </View>
              </View>
            ))
            }
            {isExpense && expenses.map((expense, index) => (
              <View key={index} style={styles.transaction}>
                <Text style={{ color: 'gray', fontSize: 14, fontWeight: 'bold' }}>{new Date(expense.date).toLocaleDateString()}</Text>
                <View style={{ ...styles.flexView, justifyContent: 'space-between' }}>
                  <View style={{ ...styles.flexView, gap: 5 }}>
                    <Icon name={categoriesIncome[expense.category].icon} color={categoriesIncome[expense.category].color} size={30} />
                    <Text style={{ ...styles.text, color: '#4F4F4F' }}>{categoriesExpense[expense.category].name}</Text>
                  </View>
                  <Text style={{ ...styles.text, color: '#FF6A6A' }}>{formatCurrency(expense.total)}</Text>
                </View>
                <View style={styles.flexView}>
                  <Text style={{ color: '#4F4F4F', fontSize: 14, fontWeight: 'bold' }}>Note: </Text>
                  <Text style={{ color: '#4F4F4F' }}>{expense.note}</Text>
                </View>
              </View>
            ))
            }
          </View>
          {/* <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.text}>Nhập</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>

    </View>
  )

})

export default Transaction

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
  text: {
    color: '#646e79',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center'
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
  transaction: {
    padding: 10,
    borderColor: '#BEBEBE',
    borderBottomWidth: 1,
    gap: 2
  }

})