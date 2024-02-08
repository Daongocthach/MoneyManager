import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    header: {
      flex: 1,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 24,
      fontWeight: 'bold'
    },
    body: {
      flex: 8,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    text: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: {
      flex: 1,
      borderWidth: 2,
      borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      borderRadius: 10,
      marginHorizontal: 10,
      height: 40,
      justifyContent: 'center'
    },
    transaction: {
      borderBottomWidth: 2,
      borderBottomColor: 'gray',
      marginHorizontal: 15,
      marginVertical: 5
    },
    icon: {
      fontSize: 30
    },
    image: {
      height: 30,
      width: 30,
      resizeMode: 'contain',
      borderRadius: 10
    }
  })
}

export default getStyles
