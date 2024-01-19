import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/AntDesign'

const DatePicker = ({ setCurrentDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
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
    newDate.setDate(selectedDate.getDate() - 1)
    setSelectedDate(newDate)
    setCurrentDate(newDate)
  }

  const increaseDate = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + 1)
    setSelectedDate(newDate)
    setCurrentDate(newDate)
  }
  return (
    <View style={styles.containerDate}>
      <TouchableOpacity onPress={decreaseDate}>
        <Icon name='left' size={30} color={'#1E90FF'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
        <Text style={styles.textDate}>{selectedDate.toISOString().split('T')[0]}</Text>
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
        <Icon name='right' size={30} color={'#1E90FF'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerDate: {
    flex: 3,
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row'
  },
  datePicker: {
    backgroundColor: '#DCDCDC',
    flex: 1,
    borderRadius: 10,
    height: '100%',
    margin: 10,
    justifyContent: 'center'
  },
  textDate: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default DatePicker
