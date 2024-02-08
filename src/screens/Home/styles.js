import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    header: {
      marginTop: 20,
      marginHorizontal: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    footer: {
      flex: 0.8,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
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
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20
    },
    input: {
      flex: 3,
      height: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      padding: 5,
      marginRight: 10,
      fontSize: 20,
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    },
    textTitle: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969',
      flex: 1,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold'
    },
    buttonSubmit: {
      backgroundColor: colorScheme == 'dark' ? '#696969' : '#4F4F4F',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center'
    }
  })
}

export default getStyles
