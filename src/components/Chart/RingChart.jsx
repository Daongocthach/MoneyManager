import { ProgressChart } from 'react-native-chart-kit'
import { Component } from 'react'

const data = {
    labels: ['Swim', 'Bike', 'Run'],
    data: [0.4, 0.6, 0.8]
}
export class RingChart extends Component {
    render() {
        return (
            <ProgressChart
            data={data}
            width={50}
            height={50}
            strokeWidth={16}
            radius={32}
            hideLegend={false}
          />
        )
    }
}

export default RingChart