import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Progress from 'react-native-progress'
import { set, ref, onValue } from 'firebase/database'
import getStyles from './styles'
import showAlertOk from '../../../components/Alert/AlertOk'
import { FIREBASE_AUTH } from '../../../../firebase'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { login } from '../../../redux/actions/auth'
import { FIREBASE_DB } from '../../../../firebase'
import { listBottles } from '../../../redux/actions/bottles'
import { listExpenses } from '../../../redux/actions/expenses'
import { listIncomes } from '../../../redux/actions/incomes'
import { listCategoriesIncome } from '../../../redux/actions/categoriesIncome'
import { listCategoriesExpense } from '../../../redux/actions/categoriesExpense'

function Login() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector(state => state.auth)
  const auth = FIREBASE_AUTH
  const handleLogin = async () => {
    if (email == '' || password == '') {
      showAlertOk('Bạn chưa điền đầy đủ thông tin', 'Bấm Ok để tiếp tục')
    }
    else {
      setLoading(true)
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        const data = {
          uid: response.user.uid,
          email: response.user.email
        }
        dispatch(login(data))
        // const starCountRef = ref(FIREBASE_DB, 'users/' + response.user.uid + '/data')
        // onValue(starCountRef, (snapshot) => {
        //   const data1 = snapshot.val()
        //   if (data1?.bottles) {
        //     dispatch(listBottles(data1?.bottles))
        //     dispatch(listCategoriesExpense(data1?.categoriesExpense))
        //     dispatch(listCategoriesIncome(data1?.categoriesIncome))
        //     dispatch(listExpenses(data1?.expenses || []))
        //     dispatch(listIncomes(data1?.incomes || []))
        //   }
        // })
        showAlertOk('Đăng nhập thành công', 'Bấm Ok để tiếp tục')
        navigation.navigate('Cài đặt')
      } catch (error) {
        console.log(error)
        showAlertOk('Lỗi đăng nhập', 'Sai tài khoản hoặc mật khẩu')
      } finally {
        setLoading(false)
      }
    }
  }
  const handleResetPassword = async () => {
    if (email == '') {
      showAlertOk('Điền thông tin Email để nhận mật khẩu mới', 'Bấm Ok để tiếp tục')
    } else {
      setLoading(true)
      try {
        await sendPasswordResetEmail(auth, email)
        showAlertOk('Gửi thành công', 'Email đặt lại password đã được gửi đến mail của bạn. Vui lòng kiểm tra hộp thư.')
      } catch (error) {
        console.error('Error sending password reset email:', error.message)
        showAlertOk('Gửi thất bại', 'Bấm Ok để tiếp tục.')
      }
      finally {
        setLoading(false)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Icon name='keyboard-arrow-left' size={40} style={styles.icon} onPress={() => { navigation.navigate('Cài đặt') }} />
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={styles.body}>
        <View style={{ justifyContent: 'center', height: '200', alignItems: 'center' }}>
          <Icon name='lock' size={150} color={'orange'} />
        </View>
        {loading && <View style={{ alignItems: 'center' }}>
          <Progress.Circle size={80} indeterminate={true} borderWidth={3} />
        </View>}
        <View style={{ ...styles.flexView, marginHorizontal: 10 }}>
          <Text style={styles.textTitle}>Email: </Text>
          <TextInput style={styles.input} placeholder='Nhập email ...' placeholderTextColor={'gray'} onChangeText={setEmail} value={email} />
        </View>
        <View style={{ ...styles.flexView, marginHorizontal: 10 }}>
          <Text style={styles.textTitle}>Mật khẩu: </Text>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='Nhập mật khẩu ...' placeholderTextColor={'gray'} onChangeText={setPassword} value={password} />
        </View>
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleLogin}>
          <Icon name='login' size={30} color={'white'} />
          <Text style={{ ...styles.text, color: 'white' }}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={{ ...styles.flexView, marginHorizontal: 10 }}>
          <Text style={styles.textTitle} onPress={handleResetPassword}>Quên mật khẩu ?</Text>
          <Text style={{ ...styles.textTitle, textAlign: 'right' }} onPress={() => { navigation.navigate('Register') }}>Đăng ký ?</Text>
        </View>
      </View>
    </View >
  )
}

export default Login