import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Bottle = ({ image, name, percent, isFocused }) => {
    return (
        <TouchableOpacity >
            <View style={{ ...styles.container, borderColor: isFocused ? '#00B2EE': '',
             borderWidth: isFocused ? 2: 0 }}>
                <View style={styles.itemFlex}>
                    <Image source={image} style={styles.image} />
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.itemFlex}>
                    <Text style={styles.text}>{percent}</Text>
                    <Icon name={'chevron-right'} style={styles.icon} />
                </View>
            </View>
        </TouchableOpacity>
    )
}


export default Bottle
const styles = StyleSheet.create({
    container: {
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
        color: 'white',
        fontSize: 40
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#777777'
    }
})