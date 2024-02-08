import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

function BottlesToEdit() {

    const navigation = useNavigation()
    const categories = useSelector(state => state.categoriesExpense.categoriesExpense)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('AddCategoryExpense', { id: categories.length })}
                style={{ borderColor: 'gray', borderWidth: 2, height: 50, alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 10 }}>
                <Text style={styles.text}>Thêm danh mục mới</Text>
            </TouchableOpacity>
            <ScrollView>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <TouchableOpacity style={{ ...styles.flexRow, margin: 15 }} key={index}
                        onPress={() => navigation.navigate('AddCategoryExpense', {
                            category: category
                        })}>
                        <View style={{ ...styles.flexRow, gap: 10 }}>
                            <Icon name={category?.icon} color={category.color} size={40}></Icon>
                            <Text style={styles.text}>{category.name}</Text>
                        </View>
                        <Icon1 name={'keyboard-arrow-right'} size={40} color={'#828282'}></Icon1>
                    </TouchableOpacity>))}
            </ScrollView>
        </View>
    )
}

export default BottlesToEdit
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#828282'
    }
})