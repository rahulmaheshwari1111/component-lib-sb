import React from 'react'

import { BEMHelper } from '../utils/bem-helper'

import './style.scss'

export interface ILoaderProps {
  size?: 'x' | '2x' | '3x' | '5x'
  content?: string
}

export const Loader: React.FC<ILoaderProps> = ({
  size = '2x',
  content,
}) => {


  const classHelper = BEMHelper('loader')

  return (
    <div className={classHelper()}>
      <i className={`fa fa-spinner fa-spin fa-${size}`} />
      <p>{content}</p>
    </div>
  )
}
