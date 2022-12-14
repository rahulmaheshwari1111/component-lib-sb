import * as React from 'react'
import { BEMHelper } from '../utils/bem-helper'

const classHelper = BEMHelper('search')

export interface ISearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  id?: string
}

export const Search: React.FC<ISearchProps> = ({
  type = 'text',
  placeholder,
  id,
}) => {
  return (
    <div className={classHelper()}>
      <input
        className={classHelper('input')}
        type={type}
        placeholder={placeholder}
        id={id}
      />
      <i className={'fa fa-search fa-3x ' + classHelper('icon')} />
    </div>
  )
}
Search.displayName = 'Search'
