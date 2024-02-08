import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from '../../ImagePicker/ImagePicker'
import { updateBottle } from '../../../redux/actions/bottles'
import showAlertOk from '../../Alert/AlertOk'
import { useColorScheme } from 'nativewind'

const AddBottle = ({ route, navigation }) => {
    const { colorScheme } = useColorScheme()
    const dispatch = useDispatch()
    let bottle
    if (route.params.bottle) {
        bottle = route.params.bottle
    }
    const [name, setName] = useState(bottle?.name || '')
    const [image, setImage] = useState(bottle?.image || 0)

    const onClickLeft = () => {
        navigation.navigate('EditBottle')
    }
    const handleSubmit = () => {
        const updatedbottle = {
            id: bottle.id,
            name: name,
            image: image,
            percent: bottle?.percent,
            total: bottle?.total
        }
        dispatch(updateBottle(updatedbottle))
        showAlertOk('Cập nhật hũ', 'Cập nhật thành công')
        navigation.navigate('EditBottle')
    }

    return (
        <View style={{ flex: 1, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
            <View style={{ ...styles.header, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
                <Icon name='keyboard-arrow-left' size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} onPress={onClickLeft} />
                <Text style={{ ...styles.title, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>Cập nhật hũ</Text>
            </View>
            <View style={{ flex: 9, backgroundColor: colorScheme == 'dark' ? 'black' : 'white', gap: 10 }}>
                <View style={styles.flexView}>
                    <Text style={{ ...styles.textTitle, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>Tên : </Text>
                    <TextInput placeholder='Nhập tên...' style={{ ...styles.textInput, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}
                        value={name} onChangeText={(value) => { setName(value) }} />
                </View>
                <View style={{ flex: 1 }}>
                    <ImagePicker setImage={setImage} image={image} is={true} />
                </View>
            </View>
            <View style={{ flex: 0.8, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
                <TouchableOpacity style={{ backgroundColor: '#4F4F4F', height: '100%', justifyContent: 'center' }} onPress={handleSubmit}>
                    <Text style={{ ...styles.text, color: 'white' }}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default AddBottle

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
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
        fontSize: 20,
        fontWeight: 'bold',
        width: 75
    },
    textInput: {
        flex: 3,
        height: 50,
        fontSize: 20,
        marginLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        fontWeight: 'bold',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
})
