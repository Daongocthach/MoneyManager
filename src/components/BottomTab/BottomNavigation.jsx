import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const BottomNavigation = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#eff0f1', paddingVertical: 10 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index
        let iconName
        if (route.name === 'Trang chủ') {
            iconName ='home'
          } else if (route.name === 'Giao dịch') {
            iconName = 'calendar-today'
          } else if (route.name === 'Cài đặt') {
            iconName = 'settings'
          } else if (route.name === 'Báo cáo') {
            iconName = 'trending-up'
          }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            key={index}
          >
            <Icon name={iconName} size={30} color={isFocused ? '#1E90FF' : '#7a7c80'} />
            <Text style={{ color: isFocused ? '#1E90FF' : '#7a7c80', fontWeight:'bold' }}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default BottomNavigation
