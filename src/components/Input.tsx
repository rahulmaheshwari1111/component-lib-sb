//  TODO: i18n placeholder text
import React from 'react'
import { BEMHelper } from '../utils/bem-helper'


const classHelper:any = BEMHelper('input')
export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder?:string
  placeholderMsgId?:string
  invalid?: boolean
  ref?: React.Ref<any>
  iconName?: string
  child?: JSX.Element
}

export const InputComponent: React.FC<IInputProps> = ({
  className,
  invalid,
  type = 'text',
  child,
  iconName,
  
  ...props
}) => {
  const [inputType, updateInputType] = React.useState(type)

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    inputType === 'text' ? updateInputType('password') : updateInputType('text')
  }

  const renderRightContent = (
    type: string,
    inputType?: string,
    child?: JSX.Element
  ) => {
    if (child) {
      return child
    }
    if (type === 'password' && inputType === 'password') {
      return <i className="fas fa-eye-slash" onClick={clickHandler} />
    } else if (type === 'password' && inputType === 'text') {
      return <i className={'fas fa-eye'} onClick={clickHandler} />
    } else {
      return <span></span>
    }
  }

  return (
    <div
      className={classHelper(
        '',
        [props.disabled && 'disabled'],
        className ? className : ''
      )}
    >
      {iconName ? <i className={`fal ${iconName}`} /> : ''}
      <input
        {...props}
        className={classHelper('field', [invalid ? 'invalid' : ''])}
        type={inputType}
      />
      {renderRightContent(type, inputType, child)}
    </div>
  )
}
// Input.displayName = 'Input'

export const InputWithRef = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    { className = '', invalid, type = 'text', iconName, child,placeholder,placeholderMsgId, ...props },
    ref
  ) => {
    const [inputType, updateInputType] = React.useState(type)

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
      inputType === 'text'
        ? updateInputType('password')
        : updateInputType('text')
    }

    const renderRightSidedChildComponent = (
      type: string,
      inputType?: string,
      child?: JSX.Element
    ) => {
      if (child) {
        return child
      }
      if (type === 'password' && inputType === 'password') {
        return <i className="fas fa-eye-slash" onClick={clickHandler} />
      } else if (type === 'password' && inputType === 'text') {
        return <i className={'fas fa-eye'} onClick={clickHandler} />
      } else {
        return <span></span>
      }
    }

    return (
      <div className={classHelper('', [], className ? className : '')}>
        {iconName ? <i className={`fa ${iconName}`} /> : ''}
        <input
          {...props}
          className={classHelper('field', [invalid ? 'invalid' : ''])}
          type={inputType}
          ref={ref}
          placeholder={placeholderMsgId ? 'placeholder' : placeholder}
        />
        {renderRightSidedChildComponent(type, inputType, child)}
      </div>
    )
  }
)

InputWithRef.displayName = 'InputWithRef'
