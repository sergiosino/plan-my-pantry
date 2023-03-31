import { Controller } from 'react-hook-form'
import TextInputSyled from './TextInputSyled'

export default function TextInputControlled (props) {
  const { name, control, ...other } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInputSyled
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...other}
        />
      )}
    />
  )
}
