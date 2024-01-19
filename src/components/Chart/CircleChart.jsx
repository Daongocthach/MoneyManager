import { PieChart } from 'react-native-chart-kit'

function CircleChart() {
  const data = [
    { name: 'Hũ 1', population: 50, color: '#297AB1', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Hũ 2', population: 30, color: '#9E9E9E', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Hũ 3', population: 20, color: '#F26716', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ]
  return (
    <PieChart
      data={data}
      width={300}
      height={200}
      chartConfig={{
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
  )
}

export default CircleChart