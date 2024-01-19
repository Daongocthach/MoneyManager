import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

function CategoryExpense() {
    const navigation = useNavigation()
    const [categories, setCategories] = useState([])
    const onClickEdit = () => {
        navigation.navigate('EditCategory')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('categoriesExpense')
                if (storedData) {
                    const parsedArray = JSON.parse(storedData)
                    setCategories(parsedArray)
                }
            } catch (error) {
                console.error('Error reading data from AsyncStorage:', error)
            }
        }
        fetchData()
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                {Array.isArray(categories) && categories.map((category, index) => (
                    <View style={{ ...styles.flexRow, margin: 10 }} key={index}>
                        <View style={{ ...styles.flexRow, gap: 10 }}>
                            <Icon name={category?.icon} color={category.color} size={30}></Icon>
                            <Text style={styles.text}>{category.name}</Text>
                        </View>
                        <Icon name={'menu'} size={30}></Icon>
                    </View>))}
            </ScrollView>
        </View>
    )
}

export default CategoryExpense
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
    categoryItem: {
        height: 70,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#777777',
        marginBottom: 10,
        borderRadius: 10
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555555'
    }
})