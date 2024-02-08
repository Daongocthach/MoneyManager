import { useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'

function CategoryExpense({ setCategoryExpense }) {
    const { colorScheme } = useColorScheme()
    const navigation = useNavigation()
    const [focused, setFocused] = useState(0)
    const categoriesExpense = useSelector(state => state.categoriesExpense.categoriesExpense)
    const onClickEdit = () => {
        navigation.navigate('EditCategory')
    }
    const handleFocused = (index) => {
        setFocused(index)
        setCategoryExpense(index)
    }
    return (
        <View style={{ backgroundColor: colorScheme == 'dark' ? 'black' : 'white' }}>
            <ScrollView>
                <View style={styles.flexRow}>
                    {Array.isArray(categoriesExpense) && categoriesExpense.map((category, index) => (
                        <TouchableOpacity
                            style={{
                                ...styles.categoryItem, borderWidth: focused == index ? 3 : 0,
                                borderColor: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
                            }}
                            key={index} onPress={() => { handleFocused(index) }}>
                            <Icon name={category?.icon} color={category.color} size={30}></Icon>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                                style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : '#696969' }}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={{ ...styles.categoryItem }}
                        onPress={onClickEdit}>
                        <Text style={{ ...styles.text, color: colorScheme == 'dark' ? '#AAAAAA' : '#696969', borderBottomColor: 'gray', borderBottomWidth: 2 }}>Thêm...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default CategoryExpense
const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 7
    },
    categoryItem: {
        height: 70,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})