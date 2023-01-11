import React from 'react'

import { BEMHelper } from '../../utils/bem-helper'
import './styles.scss'

const classHelper:any = BEMHelper('tag')

export interface ITagProps {
  content?: string | JSX.Element
  type?: 'primary' | 'secondary' | 'pending' | 'danger' | 'roles' | 'success'
}

export const Tag: React.FC<ITagProps> = ({
  content,
  type = 'primary',
}) => {
  
  return (
    <span className={classHelper('', [type])}>
{content}
    </span>
  )
}

export default Tag
