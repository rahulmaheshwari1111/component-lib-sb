import React from 'react'

import { BEMHelper } from '../../utils/bem-helper'

import './styles.scss'

export type TooltipPositions = 'top' | 'bottom' | 'left' | 'right'
export interface ITooltip {
  children?: React.ReactNode
  position?: TooltipPositions
  content?: string
  className?: string
}

const classHelper:any = BEMHelper('tooltip')

export const Tooltip: React.FC<ITooltip> = ({
  children,
  content,
  className,
  position = 'bottom',
}) => {
  return (
    <div className={`tooltip-container ${className ? className : ''}`}>
      {children}
      <div className={classHelper('', [position])}>{content}</div>
    </div>
  )
}


