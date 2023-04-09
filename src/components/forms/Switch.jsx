import { useTheme } from '@react-navigation/native'
import { Switch as SitchRN } from 'react-native'

export default function Switch (props) {
  const { value, onValueChange } = props

  const { colors } = useTheme()

  return (
    <SitchRN
      trackColor={{ true: '#f2cc83' }}
      thumbColor={value ? colors.primary : '#f4f3f4'}
      value={value}
      onValueChange={onValueChange}
    />
  )
}
