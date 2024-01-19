import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { useState, memo } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatCurrency } from '../../utils/price'
import image1 from '../../../assets/bottle.png'
import image2 from '../../../assets/bottle2.png'
import image3 from '../../../assets/bottle3.png'
import image4 from '../../../assets/bottle4.png'
import image5 from '../../../assets/bottle5.png'
import image6 from '../../../assets/bottle6.png'
const images = [
    image1, image2, image3, image4, image5, image6
]

const ListBottles = memo(({ bottles, setBottle }) => {
    const [focused, setFocused] = useState(0)
    const handleFocused = (index) => {
        setFocused(index)
        setBottle(index)
    }
    return (
        <View style={styles.container}>
            {Array.isArray(bottles) && bottles.map((bottle, index) => (
                <TouchableOpacity onPress={() => handleFocused(index)} key={index}>
                    <View style={{
                        ...styles.item, borderColor: focused == index ? '#00B2EE' : '',
                        borderWidth: focused == index ? 2 : 0
                    }}>
                        <View style={styles.itemFlex}>
                            <Image source={images[bottle?.id]} style={styles.image} />
                            <Text style={styles.text}>{bottle.name}</Text>
                        </View>
                        <View style={styles.itemFlex}>
                            <View>
                                <Text style={styles.text}>{bottle.percent}%</Text>
                                <Text style={styles.text}>{formatCurrency(bottle.total)}</Text>
                            </View>
                            <Icon name={'chevron-right'} style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

        </View>
    )
})

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
        height: 70,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    itemFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    icon: {
        color: '#777777',
        fontSize: 40
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#777777'
    }
})