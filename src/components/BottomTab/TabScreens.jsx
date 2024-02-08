import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomNavigation from './BottomNavigation'
import Home from '../../screens/Home/Home'
import Setting from '../../screens/Setting/Setting'
import Statistic from '../../screens/Statistic/Statistic'
import Transaction from '../../screens/Transaction/Transaction'

const Tab = createBottomTabNavigator()
function TabScreens() {
    return (
        <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
            <Tab.Screen name="Trang chủ" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Giao dịch" component={Transaction} options={{ headerShown: false }} />
            <Tab.Screen name="Báo cáo" component={Statistic} options={{ headerShown: false }} />
            <Tab.Screen name="Cài đặt" component={Setting} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
export default TabScreens