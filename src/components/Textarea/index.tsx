import * as React from 'react'
import { BEMHelper } from '../../utils/bem-helper'
import './styles.scss'
const classHelper:any = BEMHelper('textarea')
export interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  invalid?: boolean
  fullwidth: boolean 
  ref?: React.Ref<any>
}

export const Textarea: React.FC<ITextAreaProps> = ({
  className,
  invalid,
  fullwidth,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={classHelper(
        '',
        [ invalid ? 'invalid' : ''],
        [fullwidth? 'fullwidth': ''],
        className ? className : ''
      )}
    />
  )
}
Textarea.displayName = 'Textarea'

