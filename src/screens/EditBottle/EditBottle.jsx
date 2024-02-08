import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { images } from '../../utils/image'
import { formatCurrency } from '../../utils/price'
import { useColorScheme } from 'nativewind'
import getStyles from './styles'
import { useState } from 'react'
import showAlertOk from '../../components/Alert/AlertOk'
import { listBottles, addBottle } from '../../redux/actions/bottles'

const EditBottle = () => {
    const dispatch = useDispatch()
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const navigation = useNavigation()
    const stateBottles = useSelector(state => state.bottles.bottles)
    const [bottles, setBottles] = useState(stateBottles)
    const totalPercent = bottles.reduce((total, bottle) => {
        if (bottle?.percent) {
            total += bottle.percent
        }
        return total
    }, 0)

    const handleMinus = (index) => {
        const updatedBottles = [...bottles]
        if (updatedBottles[index]?.percent > 0) {
            updatedBottles[index].percent -= 1
            setBottles(updatedBottles)
        }
    }
    const handlePlus = (index) => {
        const updatedBottles = [...bottles]
        if (totalPercent < 100) {
            updatedBottles[index].percent += 1
            setBottles(updatedBottles)
        }
    }
    const handleSave = () => {
        if (totalPercent !== 100) {
            showAlertOk('Tổng phần trăm phải là 100%', 'Vui lòng điều chỉnh lại phần trăm các hũ')
        }
        else {
            showAlertOk('Lưu thành công', 'Bấm Ok để tiếp tục')
            dispatch(listBottles(bottles))
        }
    }
    const handleAdd = () => {
        const addedBottle = {
            id: bottles.length,
            name: 'Hũ 0',
            image: 0,
            percent: 0,
            total: 0
        }
        const updatedBottles = [...bottles, addedBottle]
        setBottles(updatedBottles)
        dispatch(addBottle(addedBottle))
        showAlertOk('Thêm hũ thành công', 'Lướt xuống cuối để cập nhật hũ vừa tạo')
    }
    const handleDelete = (index) => {
        if (bottles[index] !== undefined) {
            Alert.alert(
                'Xóa hũ',
                'Bạn chắc chắn muốn xóa hũ này!',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            const updatedBottles = [...bottles]
                            updatedBottles.splice(index, 1)
                            setBottles(updatedBottles)
                        },
                        style: 'default'
                    }
                ]
            )
        } else {
            showAlertOk('Ấn lưu để ', 'Lướt xuống cuối để cập nhật hũ vừa tạo')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon1 name='keyboard-arrow-left' size={50} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={() => { navigation.navigate('Trang chủ') }} />
                    <Text style={{ ...styles.title, textAlign: 'right' }}>Chỉnh sửa hũ</Text>
                </View>
                <TouchableOpacity onPress={handleSave}
                    style={{
                        ...styles.itemFlex, gap: 2, backgroundColor: colorScheme == 'dark' ? '#555555' : '#4F4F4F',
                        borderRadius: 10, padding: 4, marginRight: 10
                    }}>
                    <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : 'white' }}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TouchableOpacity onPress={handleAdd}
                    style={{
                        borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black',
                        borderWidth: 2, height: 50, alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 10
                    }}>
                    <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>Thêm hũ mới</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : '#EE6363', marginRight: 10, textAlign: 'right' }}>Tổng phần trăm: {totalPercent} %</Text>
                <ScrollView>
                    {Array.isArray(bottles) && bottles.map((bottle, index) => (
                        <View key={index} style={{ borderBottomWidth: 2, paddingBottom: 2, borderBottomColor: colorScheme == 'dark' ? '#555555' : '#4F4F4F' }}>
                            <View style={{ ...styles.flexRow, marginVertical: 5 }}>
                                <View style={styles.itemFlex}>
                                    <Image source={images[bottle?.image]} style={styles.image} />
                                    <Text style={styles.text}>{bottle.name}</Text>
                                </View>
                                <View style={{ ...styles.itemFlex }}>
                                    <Text style={{ ...styles.text, color: bottle?.total >= 0 ? '#008B00' : '#FF6A6A' }}>{formatCurrency(bottle.total)}</Text>
                                    <Icon name='delete' style={{ ...styles.icon, color: '#CD5C5C' }} onPress={() => handleDelete(bottle?.id)} />
                                </View>
                            </View>
                            <View style={{ ...styles.itemFlex, marginHorizontal: 15 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('AddBottle', { bottle: bottle })}
                                    style={{
                                        ...styles.itemFlex, gap: 2, backgroundColor: colorScheme == 'dark' ? '#555555' : '#4F4F4F',
                                        borderRadius: 10, padding: 4
                                    }}>
                                    <Icon name={'pencil'} style={{ color: colorScheme == 'dark' ? '#AAAAAA' : 'white', fontSize: 20 }} />
                                    <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : 'white' }}>Sửa hũ</Text>
                                </TouchableOpacity>
                                <View
                                    style={{ ...styles.itemFlex, backgroundColor: colorScheme == 'dark' ? '#555555' : '#4F4F4F', borderRadius: 10, padding: 2 }}>
                                    <Icon name={'minus'} style={{ color: colorScheme == 'dark' ? '#AAAAAA' : 'white', fontSize: 30 }} onPress={() => handleMinus(bottle?.id)} />
                                    <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : 'white', width: 50, textAlign: 'center' }}>{bottle?.percent}</Text>
                                    <Icon name={'plus'} style={{ color: colorScheme == 'dark' ? '#AAAAAA' : 'white', fontSize: 30 }} onPress={() => handlePlus(bottle?.id)} />
                                </View>
                            </View>
                        </View>))}
                </ScrollView>
            </View>
        </View>
    )
}

export default EditBottle

