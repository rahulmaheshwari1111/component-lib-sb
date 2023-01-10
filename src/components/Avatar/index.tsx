import React from 'react'
import { BEMHelper } from '../../utils/bem-helper'
import './styles.scss'

export interface IAvatarProps {
  content: string
  identifier?: string
  onRemove?: (arg0?: string) => void
}

const classHelper:any = BEMHelper('avatar')

export const Avatar: React.FC<IAvatarProps> = ({
  content,
  onRemove,
  identifier,
}) => {
  const handleRemove: React.MouseEventHandler<HTMLSpanElement> = () => {
    if (onRemove) {
      onRemove(identifier)
    }
  }

  const isImageLink = content.startsWith('https://')

  return (
    <div className={classHelper('', [isImageLink ? 'image' : ''])}>
      {isImageLink ? (
        <img src={content} alt="user avatar" className={classHelper('image')} />
      ) : content ? (
        content
      ) : (
        <i className="fas fab fa-user" />
      )}
    </div>
  )
}
