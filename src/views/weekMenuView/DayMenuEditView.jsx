import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'

// import { useWeekMenu } from '../../hooks/useWeekMenu'
import DayMenu from '../../components/weekMenu/DayMenu'
import { useState } from 'react'

export default function DayMenuEditView () {
  const route = useRoute()
  // const { } = useWeekMenu()
  const [isLunchSelected, setIsLunchSelected] = useState(true)
  const [isDinnerSelected, setIsDinnerSelected] = useState(false)

  const { dayMenu } = route.params

  const handlePressLunch = () => {
    if (!isLunchSelected) {
      setIsLunchSelected(true)
      setIsDinnerSelected(false)
    }
    console.log('handlePressLunch')
  }

  const handlePressDinner = () => {
    if (!isDinnerSelected) {
      setIsLunchSelected(false)
      setIsDinnerSelected(true)
    }
    console.log('handlePressDinner')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: 10 }}>
        <DayMenu onPressLunch={handlePressLunch} onPressDinner={handlePressDinner} dayMenu={dayMenu} isLunchSelected={isLunchSelected} isDinnerSelected={isDinnerSelected} />
      </View>
    </View>
  )
}
