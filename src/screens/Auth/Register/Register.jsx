import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Progress from 'react-native-progress'
import getStyles from './styles'
import showAlertOk from '../../../components/Alert/AlertOk'
import { FIREBASE_AUTH } from '../../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Register() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH
  const handleRegister = async () => {
    if (email == '' || password == '') {
      showAlertOk('Bạn chưa điền đầy đủ thông tin', 'Bấm Ok để tiếp tục')
    }
    else if (password !== rePassword) {
      showAlertOk('Mật khẩu không trùng khớp', 'Bấm Ok để tiếp tục')
    }
    else if (password.length < 6) {
      showAlertOk('Mật khẩu tối thiểu 6 ký tự', 'Bấm Ok để tiếp tục')
    }
    else {
      setLoading(true)
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response)
        setTimeout(() => {
          showAlertOk('Đăng ký thành công', 'Đăng nhập để tiếp tục')
          navigation.navigate('Login')
        }, 1000)
      } catch (error) {
        console.log(error)
        showAlertOk('Đăng ký thất bại', 'Vui lòng kiểm tra lại thông tin')
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Icon name='keyboard-arrow-left' size={40} style={styles.icon} onPress={() => { navigation.navigate('Cài đặt') }} />
        <Text style={styles.title}>Đăng ký</Text>
      </View>
      <View style={styles.body}>
        <View style={{ justifyContent: 'center', height: '200', alignItems: 'center' }}>
          <Icon name='person-add' size={150} color={'orange'} />
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
        <View style={{ ...styles.flexView, marginHorizontal: 10 }}>
          <Text style={styles.textTitle}>Xác nhận: </Text>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='Xác nhận mật khẩu ...' placeholderTextColor={'gray'} onChangeText={setRePassword} value={rePassword} />
        </View>
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegister}>
          <Icon name='login' size={30} color={'white'} />
          <Text style={{ ...styles.text, color: 'white' }}>Đăng Ký</Text>
        </TouchableOpacity>
        <View style={{ ...styles.flexView, marginHorizontal: 10 }}>
          <Text style={{ ...styles.textTitle, fontSize: 16 }} >Bạn đã có tài khoản ?</Text>
          <Text style={{ ...styles.textTitle, textAlign: 'right' }} onPress={() => { navigation.navigate('Login') }}>Đăng nhập ?</Text>
        </View>
      </View>
    </View >
  )
}

export default Register