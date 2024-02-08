import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { updateIncome, deleteIncome } from '../../redux/actions/incomes'
import { updateIncomeToBottles } from '../../redux/actions/bottles'
import showAlertOk from '../../components/Alert/AlertOk'
import CategoryIncome from '../../components/Category/CategoriesToInput/CategoryIncome'
import DatePicker from '../../components/DatePicker/DatePicker'
import { useColorScheme } from 'nativewind'
import getStyles from './styles'

const EditIncome = ({ route, navigation }) => {
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const dispatch = useDispatch()
    let income
    let categoriesIncome
    if (route.params.income) {
        income = route.params.income
        categoriesIncome = route.params.categoriesIncome
    }
    const [note, setNote] = useState(income?.note || '')
    const [currentDate, setCurrentDate] = useState(new Date(income?.date))
    const [total, setTotal] = useState(income?.total.toString() || '')
    const [categoryIncome, setCategoryIncome] = useState(income?.category || 0)
    const onClickLeft = () => {
        navigation.navigate('Giao dịch')
    }
    const handleSubmit = () => {
        const updatedIncome = {
            id: income?.id,
            date: currentDate,
            note: note,
            category: categoryIncome,
            total: parseInt(total)
        }
        const updateBottle = {
            oldIncome: income?.total,
            newIncome: parseInt(total)
        }
        dispatch(updateIncome(updatedIncome))
        dispatch(updateIncomeToBottles(updateBottle))
        showAlertOk('Cập nhật thu nhập', 'Cập nhật thành công')
        navigation.navigate('Giao dịch')
    }
    const handleDelete = () => {
        if (income) {
            Alert.alert(
                'Xóa thu nhập',
                'Bạn chắc chắn muốn xóa thu nhập này!',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            const updateBottle = {
                                oldIncome: income?.total,
                                newIncome: 0
                            }
                            dispatch(deleteIncome(income))
                            dispatch(updateIncomeToBottles(updateBottle))
                            showAlertOk('Xóa thu nhập', 'Xóa thành công')
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
                <Text style={styles.title}>Cập nhật thu nhập</Text>
            </View>
            <View style={{ ...styles.body, gap: 10, marginTop: 10 }}>
                <View style={{ ...styles.flexView, marginVertical: 10 }}>
                    <Text style={styles.textTitle}>Ngày: </Text>
                    <DatePicker setCurrentDate={setCurrentDate} isMonth={false} />
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.textTitle}>Ghi chú : </Text>
                    <TextInput style={styles.textInput} placeholderTextColor={'gray'} placeholder='Nhập ghi chú...' value={note} onChangeText={(value) => { setNote(value) }} />
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.textTitle}>Income : </Text>
                    <NumericFormat value={total} displayType={'text'} thousandSeparator={true} renderText={(formattedValue) => (
                        <TextInput
                            style={styles.textInput}
                            placeholder='0 đ'
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
                <View style={{ flex: 1 }}>
                    <CategoryIncome categoriesIncome={categoriesIncome} setCategoryIncome={setCategoryIncome} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Icon name='delete' size={50} color={'#CD5C5C'} onPress={handleDelete} />
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

export default EditIncome
