import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'light' ? 'white' : 'black'
    },
    header: {
      marginTop: 20,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: colorScheme == 'light' ? '#E8E8E8' : '#292929',
      gap: 10,
      backgroundColor: colorScheme == 'light' ? 'white' : 'black'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 22,
      fontWeight: 'bold'
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: colorScheme == 'light' ? '#666666' : '#D7D7D7'
    },
    body: {
      flex: 9,
      backgroundColor: colorScheme == 'light' ? '#E8E8E8' : '#121212',
      gap: 2
    },
    flexView: {
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 10,
      backgroundColor: colorScheme == 'light' ? 'white' : '#121212'
    },
    icon: {
      color: colorScheme == 'light' ? '#666666' : '#B7B7B7'
    }
  })
}

export default getStyles
