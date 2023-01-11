import React from 'react'
import { BEMHelper } from '../../utils/bem-helper'
import './styles.scss'

const classHelper = BEMHelper('modal')

export interface IModelProps {
  closeModal?: () => void
  className?: string
  compact?: boolean
  hideCloseIcon?: boolean
  isRelative?: boolean
  children?:any
}

export const Modal: React.FC<IModelProps> = ({
  children,
  closeModal,
  className,
  compact = false,
  hideCloseIcon = false,
  isRelative = false,
}): JSX.Element => {
  const handleClose: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.target !== e.currentTarget) {
      return
    }
    if (closeModal) {
      closeModal()
    }
  }

  return (
    <div className={classHelper('', [isRelative ? 'relative' : ''])}>
      <div
        className={classHelper('overlay', [isRelative ? 'relative' : ''])}
        onClick={handleClose}
      />
      <div
        className={classHelper(
          'container',
          [compact ? 'compact' : ''],
          className
        )}
      >
        {!hideCloseIcon && <i className="fa fa-times" onClick={handleClose} />}
        {children}
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'
