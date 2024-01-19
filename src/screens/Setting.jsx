import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'

const Setting = () => {
  const navigation = useNavigation()
  const onClickLeft = () => {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon1 name='keyboard-arrow-left' size={30} color={'#1E90FF'} onPress={onClickLeft} />
        <Text style={styles.title}>Setting</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.flexView}>
          <Icon name='account-settings' size={40} color={'#1E90FF'}/>
          <Text style={styles.text}>Setting</Text>
        </View>
        <View style={styles.flexView}>
          <Icon name='theme-light-dark' size={40} color={'#1E90FF'}/>
          <Text style={styles.text}>Theme</Text>
        </View>
        <View style={styles.flexView}>
          <Icon name='account-settings' size={40} color={'#1E90FF'}/>
          <Text style={styles.text}>Setting</Text>
        </View>
        <View style={styles.flexView}>
          <Icon name='theme-light-dark' size={40} color={'#1E90FF'}/>
          <Text style={styles.text}>Theme</Text>
        </View>
        <View style={styles.flexView}>
          <Icon name='account-settings' size={40} color={'#1E90FF'}/>
          <Text style={styles.text}>Setting</Text>
        </View>
        <View style={styles.flexView}>
          <Icon name='theme-light-dark' size={40} color={'#1E90FF'}/>
          <Text style={styles.text}>Theme</Text>
        </View>
      </View>
    </View>
  )

}

export default Setting


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbff'
  },
  header: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    gap: 10
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#777777'
  },
  body: {
    flex: 9,
    backgroundColor: '#D3D3D3',
    gap: 5
  },
  flexView: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    backgroundColor: 'white'
  },
})
