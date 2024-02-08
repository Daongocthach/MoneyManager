import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store.js'
import TabScreens from './src/components/BottomTab/TabScreens'
import Theme from './theme'
import EditCategory from './src/screens/EditCategory/EditCategory.jsx'
import AddCategoryIncome from './src/components/Category/CategoriesToEdit/AddCategoryIncome.jsx'
import AddCategoryExpense from './src/components/Category/CategoriesToEdit/AddCategoryExpense.jsx'
import EditBottle from './src/screens/EditBottle/EditBottle.jsx'
import AddBottle from './src/components/Bottles/BottlesToEdit/AddBottle.jsx'
import EditIncome from './src/screens/EditIncome/EditIncome.jsx'
import EditExpense from './src/screens/EditExpense/EditExepense.jsx'
import Login from './src/screens/Auth/Login/Login.jsx'
import Register from './src/screens/Auth/Register/Register.jsx'

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
            <Stack.Screen
              name="AddCategoryIncome"
              component={AddCategoryIncome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddCategoryExpense"
              component={AddCategoryExpense}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditBottle"
              component={EditBottle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddBottle"
              component={AddBottle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditIncome"
              component={EditIncome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditExpense"
              component={EditExpense}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )

}
