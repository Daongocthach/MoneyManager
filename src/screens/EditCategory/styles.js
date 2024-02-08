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
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    select: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 5,
      marginHorizontal: 5
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 22,
      fontWeight: 'bold'
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
      fontSize: 18,
      color: colorScheme == 'dark' ? 'white' : 'black',
    },
    body: {
      flex: 9,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    }
  })
}

export default getStyles
