import React, { useEffect } from 'react'

import { BEMHelper } from '../utils/bem-helper'

/**
 * NOTE:
 * This component is supposed to be a child component for <ToastContainer /> component
 * If you want to use the toast functionality, utilise <ToastContainer /> instead
 *
 */

export interface IToastProps {
  id: number
  color: "error" | "primary" | "info" | "success" | "warning" | "basic"
  dismissTime: number
  autoDelete: boolean
  icon?: string
  content?: JSX.Element | JSX.Element[] | string
  deleteToast: (id: number) => void
}

const classHelper:any = BEMHelper('toast')

export const Toast: React.FC<IToastProps> = ({
  id,
  color,
  dismissTime,
  autoDelete,
  icon,
  content,
  deleteToast,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (autoDelete) {
        deleteToast(id)
      }
    }, dismissTime)

    return () => {
      clearTimeout(timeout)
    }
  }, [dismissTime, autoDelete])

  return (
    <div className={classHelper('', [color])} onClick={() => deleteToast(id)}>
      {icon && <i className={classHelper('icon', [], `far ${icon}`)} />}

      <p className={classHelper('content')}>
        { content}
      </p>
    </div>
  )
}
