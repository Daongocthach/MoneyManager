import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 22,
      fontWeight: 'bold'
    },
    body: {
      flex: 9,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    footer: {
      flex: 0.8,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    flexView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 10,
      gap: 10
    },
    textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      width: 90
    },
    textInput: {
      flex: 1,
      height: 50,
      fontSize: 20,
      marginLeft: 10,
      borderColor: '#BEBEBE',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 5,
      fontWeight: 'bold',
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black'
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black'
    },
    buttonSubmit: {
      backgroundColor: '#4F4F4F',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center'
    }
  })
}

export default getStyles
