import React from 'react'

import { BEMHelper } from '../../utils/bem-helper'
import './styles.scss'

export interface IBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  isInline?: boolean
  iconName?: string
  color?:
  | 'basic'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'inverted'
  | 'faded'
  | 'darker'
  size?: 'paragraph' | 'subtext' | 'caption' | 'large'
  values?:string
}

export const Body: React.FC<IBodyProps> = ({
  className,
  children,
  color = 'basic',
  size = 'paragraph',
  isInline,
  iconName,
  values,
  ...rest
}) => {
  const bodyStyles:any = BEMHelper('body')
  const styleModifications = [
    `clr-${color}`,
    `size-${size}`,
    isInline && 'is-inline',
  ]

  return (
    <p className={bodyStyles('', styleModifications, className)} {...rest}>
      {iconName && <><i className={`fa ${iconName}`} />&nbsp;&nbsp;</>}
      {values}
    </p>
  )
}
