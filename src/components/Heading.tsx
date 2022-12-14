import React from 'react'

import { BEMHelper } from '../utils/bem-helper'

export interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  inverted?: boolean
  className?: string
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'normal'
  messageId?: string
  values?:Object
}

export const Heading: React.FC<IHeadingProps> = ({
  type = 'h3',
  className,
  inverted = false,
  children,
  fontWeight = 'bold',
  messageId,
  values,
  ...rest
}) => {
  const classHelper = BEMHelper('heading')(
    '',
    [type, fontWeight, inverted ? 'inverted' : ''],
    `${className ?? ''}`
  )

  const renderedChild = children

  switch (type) {
    case 'h1':
      return (
        <h1 {...rest} className={classHelper}>
          {renderedChild}
        </h1>
      )
    case 'h2':
      return (
        <h2 {...rest} className={classHelper}>
          {renderedChild}
        </h2>
      )
    case 'h3':
      return (
        <h3 {...rest} className={classHelper}>
          {renderedChild}
        </h3>
      )
    case 'h4':
      return (
        <h4 {...rest} className={classHelper}>
          {renderedChild}
        </h4>
      )
    case 'h5':
      return (
        <h5 {...rest} className={classHelper}>
          {renderedChild}
        </h5>
      )
    case 'h6':
      return (
        <h6 {...rest} className={classHelper}>
          {renderedChild}
        </h6>
      )
    default:
      return (
        <h3 {...rest} className={classHelper}>
          {renderedChild}
        </h3>
      )
  }
}
