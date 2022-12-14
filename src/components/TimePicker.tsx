import { format, parse } from 'date-fns'
import React from 'react'
import dayjs from 'dayjs'
import { BEMHelper } from '../utils/bem-helper'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers/TimePicker'

const classHelper = BEMHelper('time-picker')

export interface TimePickerProps {
  className?: string
  timeValue: string
  name: string
  onChange: Function
  disabled?: boolean
  readonly?: boolean
  error?: any
  helperText?: string
  minTime?: string
  maxTime?: string
}
export const TimePicker: React.FC<TimePickerProps> = ({
  timeValue,
  onChange,
  minTime,
  maxTime,
  disabled = false,
  readonly = false,
  name,
  error,
}) => {

  const minMaxTimeConvertor = (time: any) => {
    const convertedDateTimeFormat = format(
      parse(time, 'HH:mm', new Date()),
      "yyyy-MM-dd'T'HH:mm"
    )
    return dayjs(convertedDateTimeFormat)
  }

  const timePickerHandleChange = (newValue: any) => {
    onChange(format(newValue?.$d, 'HH:mm'))
  }

  return (
    <div className={'time-picker'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUITimePicker
          value={format(
            parse(timeValue, 'HH:mm', new Date()),
            "yyyy-MM-dd'T'HH:mm"
          )}
          disabled={disabled}
          readOnly={readonly}
          minTime={minTime ? minMaxTimeConvertor(`${minTime}`) : null}
          maxTime={maxTime ? minMaxTimeConvertor(`${maxTime}`) : null}
          onChange={(newValue:any) => timePickerHandleChange(newValue)}
          renderInput={(params:any) => (
            <TextField
              {...params}
              name={name}
              inputProps={{ ...params.inputProps, readOnly: true }}
              error={error}
              helperText={error}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  )
}
