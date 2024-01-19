import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

function CategoryIncome({ categoriesIncome, setCategoryIncome }) {
    const navigation = useNavigation()
    const [categories, setCategories] = useState(categoriesIncome)
    const [focused, setFocused] = useState(0)
    const onClickEdit = () => {
        navigation.navigate('EditCategory')
    }
    const handleFocused = (index) => {
        setFocused(index)
        setCategoryIncome(index)
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.flexRow}>
                    {Array.isArray(categories) && categories.map((category, index) => (
                        <TouchableOpacity
                            style={{ ...styles.categoryItem, borderWidth: focused == index ? 2.5 : 1 }}
                            key={index} onPress={() => { handleFocused(index) }}>
                            <Icon name={category?.icon} color={category.color} size={30}></Icon>
                            <Text style={styles.text}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.categoryItem} onPress={onClickEdit}>
                        <Text style={styles.text}>Thêm...</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default CategoryIncome

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20
    },
    categoryItem: {
        height: 70,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00B2EE',
        marginBottom: 10,
        borderRadius: 10
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
    }
})