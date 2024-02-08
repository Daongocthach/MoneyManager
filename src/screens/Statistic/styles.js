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
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      width: 180
    },
    price: {
      color: '#EE6363',
      fontSize: 20,
      fontWeight: 'bold'
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 10
    },
  })
}

export default getStyles
