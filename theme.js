import { DefaultTheme } from '@react-navigation/native'

const Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: 'blue',
        background: 'white',
        card: 'white',
        text: 'black',
        border: 'gray'
    }
}
export default Theme