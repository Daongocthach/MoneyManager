import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabScreens from './src/components/BottomTab/TabScreens'
import Theme from './theme'
import EditCategory from './src/screens/EditCategory'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store.js'

const Stack = createNativeStackNavigator()
export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Tabs"
              component={TabScreens}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditCategory"
              component={EditCategory}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )

}
