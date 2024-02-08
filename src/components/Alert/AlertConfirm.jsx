import { Alert } from 'react-native'
const showAlertConfirm = (title, message, handle) =>
    Alert.alert(
        { title },
        { message },
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => {
                    handle()
                },
                style: 'default'
            }
        ]
    )
export default showAlertConfirm