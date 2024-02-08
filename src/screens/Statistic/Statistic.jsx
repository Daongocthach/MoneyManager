import { Text, View, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useColorScheme } from 'nativewind'
import CircleChart from '../../components/Chart/CircleChart'
import { formatCurrency } from '../../utils/price'
import ListBottles from '../../components/Bottles/ListBottles'
import getStyles from './styles'

const Statistic = () => {
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  let total = income - expense
  const bottles = useSelector(state => state.bottles.bottles)
  useEffect(() => {
    if (incomes && incomes.length > 0) {
      const totalIncome = incomes.reduce((acc, income) => acc + income.total, 0)
      setIncome(totalIncome)
    }
    else { setIncome(0) }
    if (expenses && expenses.length > 0) {
      const totalExpense = expenses.reduce((acc, expense) => acc + expense.total, 0)
      setExpense(totalExpense)
    }
    else { setExpense(0) }
  }, [incomes, expenses])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Báo cáo</Text>
      </View>
      <View style={styles.body}>
        <ScrollView >
          <View style={styles.flexView}>
            <Text style={styles.text}>Thu nhập: </Text>
            <Text style={{ ...styles.price, color: '#008B00' }}>{formatCurrency(income)}</Text>
          </View>
          <View style={styles.flexView}>
            <Text style={{ ...styles.text }}>Chi tiêu: </Text>
            <Text style={styles.price}>- {formatCurrency(expense)}</Text>
          </View>
          <View style={{ ...styles.flexView, marginBottom: 5 }}>
            <Text style={styles.text}>Số dư khả dụng: </Text>
            <Text style={{ ...styles.price, color: '#008B00' }}>{formatCurrency(total)}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <CircleChart bottles={bottles} total={total} />
          </View>
          <ListBottles bottles={bottles} />
        </ScrollView>
      </View>

    </View>
  )

}

export default Statistic