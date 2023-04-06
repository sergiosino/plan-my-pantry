import { Controller } from 'react-hook-form'

import TextInputStyled from './TextInputStyled'

export default function TextInputControlled (props) {
  const { name, control, ...other } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInputStyled
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...other}
        />
      )}
    />
  )
}
