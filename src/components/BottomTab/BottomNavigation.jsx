import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useColorScheme } from 'nativewind'

const BottomNavigation = ({ state, descriptors, navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colorScheme == 'dark' ? 'black' : 'white', paddingVertical: 10 }}>
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
          iconName = 'home'
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
            {colorScheme == 'dark' ?
              <Icon name={iconName} style={{ color: isFocused ? 'white' : '#AAAAAA' }} size={30}/>
              :
              <Icon name={iconName} style={{ color: isFocused ? '#009ACD' : '#696969' }} size={30}/>
            }
            {colorScheme == 'dark' ?
              <Text style={{ color: isFocused ? 'white' : '#AAAAAA', fontWeight: 'bold' }}>
                {label}
              </Text>
              :
              <Text style={{ color: isFocused ? '#009ACD' : '#696969', fontWeight: 'bold' }}>
                {label}
              </Text>
            }

          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default BottomNavigation
