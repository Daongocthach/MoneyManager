import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { updateExpense, deleteExpense } from '../../redux/actions/expenses'
import { updateExpenseToBottles } from '../../redux/actions/bottles'
import showAlertOk from '../../components/Alert/AlertOk'
import CategoryExpense from '../../components/Category/CategoriesToInput/CategoryExpense'
import DatePicker from '../../components/DatePicker/DatePicker'
import ListBottles from '../../components/Bottles/ListBottles'
import { useColorScheme } from 'nativewind'
import getStyles from './styles'

const EditExpense = ({ route }) => {
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    let expense
    let categoriesExpense
    let bottles
    if (route.params.expense) {
        expense = route.params.expense
        categoriesExpense = route.params.categoriesExpense
        bottles = route.params.bottles
    }
    const [note, setNote] = useState(expense?.note || '')
    const [currentDate, setCurrentDate] = useState(new Date(expense?.date))
    const [total, setTotal] = useState(expense?.total.toString() || '')
    const [bottle, setBottle] = useState(expense?.bottle || 0)
    const [categoryExpense, setCategoryExpense] = useState(expense?.category || 0)
    const onClickLeft = () => {
        navigation.navigate('Giao dịch')
    }
    const handleSubmit = () => {
        if (total == '') {
            showAlertOk('Không được để trống số tiền', 'Bấm Ok để tiếp tục')
        }
        else {
            const updatedExpense = {
                id: expense?.id,
                date: currentDate,
                note: note,
                category: categoryExpense,
                bottle: bottle,
                total: parseInt(total)
            }
            const updateBottle = {
                id: expense?.id,
                oldBottle: expense?.bottle,
                newBottle: bottle,
                oldExpense: expense?.total,
                newExpense: parseInt(total)
            }
            dispatch(updateExpense(updatedExpense))
            dispatch(updateExpenseToBottles(updateBottle))
            showAlertOk('Cập nhật chi tiêu', 'Cập nhật thành công')
            navigation.navigate('Giao dịch')
        }
    }
    const handleDelete = () => {
        if (expense) {
            Alert.alert(
                'Xóa chi tiêu',
                'Bạn chắc chắn muốn xóa chi tiêu này!',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            const updateBottle = {
                                oldExpense: expense?.total,
                                newExpense: 0,
                                oldBottle: expense?.bottle,
                                newBottle: expense?.bottle
                            }
                            dispatch(deleteExpense(expense))
                            dispatch(updateExpenseToBottles(updateBottle))
                            showAlertOk('Xóa chi tiêu', 'Xóa thành công')
                            navigation.navigate('Giao dịch')
                        },
                        style: 'default'
                    }
                ]
            )
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name='keyboard-arrow-left' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={onClickLeft} />
                <Text style={styles.title}>Cập nhật chi tiêu</Text>
            </View>
            <View style={{ ...styles.body, gap: 10, marginTop: 10 }}>

                <View style={{ ...styles.flexView, marginVertical: 10 }}>
                    <Text style={styles.textTitle}>Ngày: </Text>
                    <DatePicker setCurrentDate={setCurrentDate} isMonth={false} currentDate={currentDate} />
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.textTitle}>Ghi chú : </Text>
                    <TextInput style={styles.textInput} placeholderTextColor={'gray'} placeholder='Nhập ghi chú...' value={note} onChangeText={(value) => { setNote(value) }} />
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.textTitle}>Expense : </Text>
                    <NumericFormat value={total} displayType={'text'} thousandSeparator={true} renderText={(formattedValue) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder='0 đ' placeholderTextColor={'gray'}
                            onChangeText={(value) => {
                                const numericValue = value.replace(/\D/g, '')
                                setTotal(numericValue)
                            }}
                            value={formattedValue}
                            keyboardType='numeric'
                        />
                    )}
                    />
                </View>

                <View >
                    <CategoryExpense categoriesExpense={categoriesExpense} setCategoryExpense={setCategoryExpense} />
                </View>
                <ScrollView>
                    <View >
                        <ListBottles bottles={bottles} setBottle={setBottle} bottle={bottle} />
                    </View>
                </ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Icon name='delete' size={40} color={'#CD5C5C'} onPress={handleDelete} />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={{ ...styles.text, color: 'white' }}>Nhập</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default EditExpense

