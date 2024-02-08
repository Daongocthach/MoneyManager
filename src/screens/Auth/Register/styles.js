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
      backgroundColor: colorScheme == 'light' ? 'white' : 'black',
      gap: 10
    },
    icon: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    },
    buttonSubmit: {
      backgroundColor: colorScheme == 'dark' ? '#696969' : '#4F4F4F',
      borderRadius: 10,
      height: 50,
      marginTop: 20,
      justifyContent: 'center',
      flexDirection:'row',
      alignItems:'center',
      gap: 10
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10
    },
    input: {
      flex: 7,
      height: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      padding: 5,
      marginRight: 10,
      fontSize: 18,
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    },
    textTitle: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969',
      flex: 3,
      fontSize: 20,
      fontWeight: 'bold'
    },
  })
}

export default getStyles
