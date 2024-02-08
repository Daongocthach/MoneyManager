import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useColorScheme } from 'nativewind'
import { formatCurrency } from '../../utils/price'
import { images } from '../../utils/image'

const ListBottles = ({ setBottle, bottle }) => {
    const { colorScheme } = useColorScheme()
    const navigation = useNavigation()
    const [focused, setFocused] = useState(bottle)
    const bottles = useSelector(state => state.bottles.bottles)
    const handleFocused = (index) => {
        setFocused(index)
        if (setBottle) {
            setBottle(index)
        }
    }
    return (
        <View style={{ backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
            {Array.isArray(bottles) && bottles.map((bottle, index) => (
                <TouchableOpacity onPress={() => handleFocused(index)} key={index}>
                    <View style={{
                        ...styles.item, borderColor: colorScheme == 'dark' ? '#AAAAAA' : '#696969',
                        borderWidth: focused == index ? 2 : 0, backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
                    }}>
                        <View style={{ ...styles.itemFlex, flex: 2, justifyContent: 'flex-start' }}>
                            <Image source={images[bottle?.image]} style={styles.image} />
                            <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : '#696969' }}
                                ellipsizeMode='tail' numberOfLines={1}>{bottle?.name}</Text>
                        </View>
                        <View style={{ ...styles.itemFlex, flex: 3, justifyContent: 'flex-end' }}>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : '#696969', fontSize: 18 }}>({bottle?.percent}% Thu nhập)</Text>
                                <Text style={{ ...styles.text, color: bottle?.total >= 0 ? '#008B00' : '#FF6A6A' }}>{formatCurrency(bottle?.total)}</Text>
                            </View>
                            <Icon name={'chevron-right'} style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => { navigation.navigate('EditBottle') }}>
                <View style={{ ...styles.item }}>
                    <Text style={{ ...styles.text, marginLeft: 10, flex: 1, color: '#F4A460' }}>Thêm Hũ...</Text>
                    <Icon name={'chevron-right'} style={{ ...styles.icon, color: '#F4A460' }} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ListBottles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    body: {
        backgroundColor: '#2f3e4a'
    },
    item: {
        margin: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    itemFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 70,
        width: 70,
        resizeMode: 'contain'
    },
    icon: {
        color: '#777777',
        fontSize: 30
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'right'
    }
})