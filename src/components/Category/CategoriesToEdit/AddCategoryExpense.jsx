import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconPicker from '../../IconPicker/IconPicker'
import ColorPicker from '../../ColorPicker/ColorPicker'
import { updateCategoryExpense, addCategoryExpense, deleteCategoryExpense } from '../../../redux/actions/categoriesExpense'
import showAlertOk from '../../Alert/AlertOk'
import { useColorScheme } from 'nativewind'

const AddCategoryExpense = ({ route }) => {
    const { colorScheme } = useColorScheme()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    let isUpdate = false
    let category
    let id
    if (route.params.category) {
        category = route.params.category
        isUpdate = true
    }
    if (route.params.id) {
        id = route.params.id
    }
    const [selectedIcon, setSelectedIcon] = useState(category?.icon || 'bank')
    const [selectedColor, setSelectedColor] = useState(category?.color || '#F4A460')
    const [name, setName] = useState(category?.name || '')

    const onSelectIcon = (icon) => {
        setSelectedIcon(icon)
    }
    const onSelectColor = (color) => {
        setSelectedColor(color)
    }
    const onClickLeft = () => {
        navigation('EditCategory')
    }
    const handleSubmit = () => {
        if (isUpdate) {
            if (name == '') {
                showAlertOk('Vui lòng nhập tên danh mục', 'Bấm Ok để tiếp tục')
            }
            else {
                const updatedCategoryExpense = {
                    id: category.id,
                    name: name,
                    icon: selectedIcon,
                    color: selectedColor
                }
                dispatch(updateCategoryExpense(updatedCategoryExpense))
                showAlertOk('Cập nhật danh mục chi tiêu', 'Cập nhật thành công')
                navigation.navigate('EditCategory')
            }
        }
        else if (id) {
            if (name == '') {
                showAlertOk('Vui lòng nhập tên danh mục', 'Bấm Ok để tiếp tục')
            }
            else {
                const addedCategoryExpense = {
                    id: id,
                    name: name,
                    icon: selectedIcon,
                    color: selectedColor
                }
                dispatch(addCategoryExpense(addedCategoryExpense))
                showAlertOk('Thêm danh mục chi tiêu', 'Thêm thành công')
                navigation.navigate('EditCategory')
            }
        }
        else {
            showAlertOk('Thêm danh mục chi tiêu', 'Thêm thất bại!')
        }
    }
    const handleDelete = () => {
        if (category) {
            Alert.alert(
                'Xóa danh mục chi tiêu',
                'Bạn chắc chắn muốn xóa danh mục này!',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            dispatch(deleteCategoryExpense(category))
                            showAlertOk('Xóa danh mục chi tiêu', 'Xóa thành công')
                            navigation.navigate('EditCategory')
                        },
                        style: 'default'
                    }
                ]
            )
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
            <View style={{ ...styles.header, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
                <Icon name='keyboard-arrow-left' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={onClickLeft} />
                <Text style={{ ...styles.title, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>{isUpdate ? 'Cập nhật danh mục chi tiêu' : 'Thêm danh mục chi tiêu'}</Text>
            </View>
            <View style={{ flex: 9, gap: 10, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
                <View style={styles.flexView}>
                    <Text style={{ ...styles.textTitle, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>Tên : </Text>
                    <TextInput placeholder='Nhập tên ...' placeholderTextColor={'gray'}
                        style={{ ...styles.textInput, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}
                        value={name} onChangeText={(value) => { setName(value) }} />
                    {isUpdate && <Icon name='delete' size={40} color={'#CD5C5C'} onPress={handleDelete} />}
                </View>
                <ScrollView>
                    <View >
                        <IconPicker onSelectIcon={onSelectIcon} icon={isUpdate ? category.icon : ''} isExpense={true} />
                    </View>
                    <View >
                        <ColorPicker onSelectColor={onSelectColor} color={isUpdate ? category.color : ''} />
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 0.8, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
                <TouchableOpacity style={{ backgroundColor: '#4F4F4F', height: '100%', justifyContent: 'center' }} onPress={handleSubmit}>
                    <Text style={{ ...styles.text, color: 'white' }}>{isUpdate ? 'Cập nhật' : 'Thêm'}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default AddCategoryExpense

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        gap: 10
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        height: 50,
        fontSize: 18,
        marginLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        fontWeight: 'bold',
        color: '#363636'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
})
