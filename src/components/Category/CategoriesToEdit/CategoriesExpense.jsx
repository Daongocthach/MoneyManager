import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useColorScheme } from 'nativewind'

function CategoriesExpense() {
    const { colorScheme } = useColorScheme()
    const navigation = useNavigation()
    const categories = useSelector(state => state.categoriesExpense.categoriesExpense)
    return (
        <View style={{ flex: 1, backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddCategoryExpense', { id: categories.length })}
                style={{
                    borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black',
                    borderWidth: 2, height: 50, alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 10
                }}>
                <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>Thêm danh mục mới</Text>
            </TouchableOpacity>
            <ScrollView>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <TouchableOpacity style={{ ...styles.flexRow, margin: 15 }} key={index}
                        onPress={() => navigation.navigate('AddCategoryExpense', {
                            category: category
                        })}>
                        <View style={{ ...styles.flexRow, gap: 10 }}>
                            <Icon name={category?.icon} color={category.color} size={40}></Icon>
                            <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : 'black' }}>{category.name}</Text>
                        </View>
                        <Icon1 name={'keyboard-arrow-right'} size={40} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'}></Icon1>
                    </TouchableOpacity>))}
            </ScrollView>
        </View>
    )
}

export default CategoriesExpense
const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})