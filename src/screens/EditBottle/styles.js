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
      justifyContent: 'space-between',
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
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    item: {
      margin: 3,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10
    },
    itemFlex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    image: {
      height: 60,
      width: 60,
      resizeMode: 'contain'
    },
    icon: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#777777',
      fontSize: 40
    },
    text: {
      fontWeight: 'bold',
      fontSize: 20,
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black'
    }
  })
}

export default getStyles
