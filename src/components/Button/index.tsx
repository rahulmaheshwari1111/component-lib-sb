import React from 'react'
import { BEMHelper} from '../../utils/bem-helper'
import './Button.scss'

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string
  children?: string | JSX.Element
  variant: 'primary' | 'secondary' | 'functional' | 'micro' | 'outline' | 'danger' | 'light' | 'text'
  isLoading?: boolean
  disabled?: boolean
  iconName?: string,
  IsBrandIcon?: boolean,
  messageId?: string
  block?: boolean //block property will make the button fit to its parent width.
  iconProps?: {
    size?: string
  }
  isBrandIcon?: boolean,
}

const classHelper = BEMHelper('button')

export const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  onClick,
  variant,
  className = '',
  isLoading,
  disabled,
  iconName,
  messageId,
  iconProps,
  block,
  isBrandIcon = false,
  ...props
}) => {
  const renderedChild = children
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e)
    }
  }

  const modifications:any = [
    variant,
    isLoading ? 'loading' : '',
    disabled ? 'disabled' : '',
    iconName ? 'icon' : '',
    disabled || isLoading ? `${variant}-disabled` : '',
  ]

  if (block) modifications.push('block')

  return (
    <button
      {...props}
      className={classHelper('', modifications, className)}
      disabled={isLoading || disabled}
      onClick={clickHandler}
    >
      {isLoading && (
        <span>
          <i className="fa fa-spinner fa-spin loader" />
        </span>
      )}
      {iconName && (
        <span>
        <i className={`${isBrandIcon ? 'fab' : 'fas'} ${iconName}`} {...iconProps} />&nbsp;
        </span>
      )}
      <span>{renderedChild}</span>
    </button>
  )
}
Button.displayName = 'Button'
