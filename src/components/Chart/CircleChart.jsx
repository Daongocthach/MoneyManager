import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { colors } from '../../utils/color'

function CircleChart({ bottles, total }) {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const data = bottles.map((bottle, index) => ({
    name: '% ' + bottle?.name,
    population: bottle.total < 0 ? 0 : total > 0 ? Math.round((bottle.total / total) * 100) * 100 / 100 : 0,
    color: colors[index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 16
  }))


  return (
    <PieChart
      data={data}
      width={windowWidth*1}
      height={windowHeight * 0.3}
      chartConfig={{
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
      }}
      accessor="population"
      backgroundColor="transparent"

      absolute
    />
  )
}

export default CircleChart