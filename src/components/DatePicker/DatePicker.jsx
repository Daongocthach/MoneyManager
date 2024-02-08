import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/AntDesign'
import { useColorScheme } from 'nativewind'

const DatePicker = ({ setCurrentDate, isMonth, currentDate }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [selectedDate, setSelectedDate] = useState( currentDate? new Date(currentDate): new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (event, date) => {
    setShowPicker(false)
    if (date) {
      setSelectedDate(date)
      setCurrentDate(date)
    }
  }
  const showDatepicker = () => {
    setShowPicker(true)
  }
  const decreaseDate = () => {
    const newDate = new Date(selectedDate)
    if (isMonth)
      newDate.setMonth(selectedDate.getMonth() - 1)
    else
      newDate.setDate(selectedDate.getDate() - 1)
    setSelectedDate(newDate)
    setCurrentDate(newDate)
  }

  const increaseDate = () => {
    const newDate = new Date(selectedDate)
    if (isMonth)
      newDate.setMonth(selectedDate.getMonth() + 1)
    else
      newDate.setDate(selectedDate.getDate() + 1)
    setSelectedDate(newDate)
    setCurrentDate(newDate)
  }
  return (
    <View style={styles.containerDate}>
      <TouchableOpacity onPress={decreaseDate}>
        <Icon name='left' size={30} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatepicker} style={{ ...styles.datePicker, backgroundColor: colorScheme == 'dark' ? '#AAAAAA':'#E8E8E8' }}>
        <Text style={{ ...styles.textDate, color: 'black' }}>{isMonth ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) :
          selectedDate.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity onPress={increaseDate}>
        <Icon name='right' size={30} color={colorScheme == 'dark' ? '#AAAAAA' : 'black'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerDate: {
    flex: 3,
    justifyContent: 'space-between',
    height: 35,
    alignItems: 'center',
    flexDirection: 'row'
  },
  datePicker: {
    
    flex: 1,
    borderRadius: 10,
    height: '100%',
    margin: 10,
    justifyContent: 'center'
  },
  textDate: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic'
  }
})

export default DatePicker
