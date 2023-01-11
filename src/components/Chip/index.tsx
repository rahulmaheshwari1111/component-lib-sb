import React from 'react'

import { BEMHelper } from '../../utils/bem-helper'
import './styles.scss'

const classHelper:any = BEMHelper('chip')

export interface IChipProps {
  chipText: string
  className?: string
  isActive?: boolean
  iconName?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Chip: React.FC<IChipProps> = ({
  className,
  chipText,
  onClick,
  iconName,
  isActive,
}) => {


  return (
    <button
      type="button"
      className={classHelper(
        '',
        [isActive ? 'active' : ''],
        className ? className : ''
      )}
      onClick={onClick}
    >
      <span>{chipText}</span>
      {iconName ? (
        <span className={classHelper('icon-right', [isActive ? 'active' : ''])}>
          <i className={`fa ${iconName}`} />
        </span>
      ) : (
        ''
      )}
    </button>
  )
}

Chip.displayName = 'Chip'
