import { Text, View, TouchableOpacity, Alert, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { set, ref, onValue } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { resetBottles, listBottles } from '../../redux/actions/bottles'
import { resetExpenses, listExpenses } from '../../redux/actions/expenses'
import { resetIncomes, listIncomes } from '../../redux/actions/incomes'
import { resetCategoriesIncome, listCategoriesIncome } from '../../redux/actions/categoriesIncome'
import { resetCategoriesExpense, listCategoriesExpense } from '../../redux/actions/categoriesExpense'
import getStyles from './styles'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase'
import showAlertOk from '../../components/Alert/AlertOk'
import { logout } from '../../redux/actions/auth'

const Setting = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme, toggleColorScheme } = useColorScheme()
  let currentUser = useSelector(state => state.auth)
  const categoriesIncome = useSelector(state => state.categoriesIncome.categoriesIncome)
  const categoriesExpense = useSelector(state => state.categoriesExpense.categoriesExpense)
  const bottles = useSelector(state => state.bottles.bottles)
  const incomes = useSelector(state => state.incomes.incomes)
  const expenses = useSelector(state => state.expenses.expenses)
  const styles = getStyles(colorScheme)
  const onClickLeft = () => {
    navigation.navigate('Trang chủ')
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

  const handleBackup = () => {
    if (currentUser?.email && currentUser?.uid) {
      const userId = currentUser?.uid
      const data = {
        bottles,
        categoriesExpense,
        categoriesIncome,
        incomes,
        expenses
      }
      set(ref(FIREBASE_DB, 'users/' + userId), {
        data
      })
        .then(() => {
          console.log('Data saved successfully')
          showAlertOk('Bạn đã lưu dữ liệu thành công', 'Dữ liệu đã lưu sẽ được tải xuống')
        })
        .catch((error) => {
          console.error('Error saving data:', error.message)
          showAlertOk('Lưu dữ liệu thất bại', 'Vui lòng thử lại')
        })
    } else {
      showAlertOk('Lưu dữ liệu thất bại', 'Bạn chưa đăng nhập')
    }
  }

  const onClickReset = () => {
    Alert.alert(
      'Xóa dữ liệu',
      'Bạn có chắc chắn muốn xóa dữ liệu?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(resetBottles())
            dispatch(resetExpenses())
            dispatch(resetIncomes())
            dispatch(resetCategoriesIncome())
            dispatch(resetCategoriesExpense())
            showAlertOk('Xóa dữ liệu', 'Xóa dữ liệu thành công')
          },
          style: 'default'
        }
      ]
    )
  }
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        const starCountRef = ref(FIREBASE_DB, 'users/' + user.uid + '/data')
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val()
          if (data?.bottles && data?.categoriesExpense && data?.categoriesIncome) {
            dispatch(listBottles(data?.bottles))
            dispatch(listCategoriesExpense(data?.categoriesExpense))
            dispatch(listCategoriesIncome(data?.categoriesIncome))
            dispatch(listExpenses(data?.expenses || []))
            dispatch(listIncomes(data?.incomes || []))
          }
        })
        currentUser = user
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon1 name='keyboard-arrow-left' size={40} style={styles.icon} onPress={onClickLeft} />
        <Text style={styles.title}>Cài đặt</Text>
        <StatusBar style='auto' />
      </View>
      <View style={{ ...styles.body, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
        <TouchableOpacity style={styles.flexView} onPress={() => { navigation.navigate('Login') }}>
          <Icon1 name='account-circle' size={40} style={styles.icon} />
          {currentUser?.email ?
            <Text style={styles.text} >{currentUser?.email}</Text>
            :
            <Text style={styles.text}>Đăng nhập</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={onClickReset}>
          <Icon name='database-remove' size={40} style={styles.icon} />
          <Text style={styles.text}>Xóa dữ liệu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={handleBackup}>
          <Icon name='database-sync' size={40} style={styles.icon} />
          <Text style={styles.text}>Lưu dữ liệu</Text>
        </TouchableOpacity>
        <View style={{ ...styles.flexView, justifyContent: 'space-between' }}>
          <View style={styles.flexView}>
            <Icon name='theme-light-dark' size={40} style={styles.icon} />
            <Text style={styles.text}>Giao diện tối</Text>
          </View>
          <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme} style={{ marginRight: 10 }} />
        </View>
        {currentUser?.email && <TouchableOpacity style={styles.flexView} onPress={handleLogout}>
          <Icon name='logout' size={40} style={styles.icon} />
          <Text style={styles.text}>Đăng xuất</Text>
        </TouchableOpacity>}
      </View>
    </View>
  )

}

export default Setting
