import React, { useEffect } from 'react'
import { BEMHelper } from '../utils/bem-helper'

export interface ICheckBoxButton {
  id: string
  handleChange: (checked: boolean) => void
  defaultValue?: boolean
  className?: string
  disabled?: boolean
}

const classHelper:any = BEMHelper('checkbox')

export const CheckBox: React.FC<ICheckBoxButton> = ({
  id,
  handleChange,
  defaultValue,
  className,
  disabled,
  ...rest
}) => {
  const [isChecked, setIsChecked] = React.useState(false)

  const toggleCheckbox = (_e: React.MouseEvent<HTMLLabelElement>) => {
    if (!disabled) {
      setIsChecked(!isChecked)
      handleChange(!isChecked)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      setIsChecked(defaultValue)
    }
  }, [])

  return (
    <div className={classHelper('', [disabled && 'disabled'], className)}>
      <input
        checked={isChecked}
        className={classHelper('input')}
        id={id}
        type="checkbox"
        disabled={disabled}
        {...rest}
      />
      <label
        className={classHelper('label', [isChecked ? 'active' : ''])}
        htmlFor={id}
        onClick={toggleCheckbox}
      >
        <i
          className={classHelper(
            'icon',
            [],
            `fa ${isChecked ? 'fa-check' : 'fa-plus'}`
          )}
        />
      </label>
    </div>
  )
}

CheckBox.displayName = 'CheckBox'
