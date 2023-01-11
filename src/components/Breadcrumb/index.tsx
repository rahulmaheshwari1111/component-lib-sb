import * as React from 'react'

import { BEMHelper } from '../../utils/bem-helper'
import { formattedMessageHelper } from '../../utils/int-helpers'

import './styles.scss'

export interface IBreadcrumbData {
  id?: number
  title?: string
  path?: string
  messageId?: string
}

export interface IBreadcrumbProps {
  className?: any
  items: IBreadcrumbData[]
}

const classHelper = BEMHelper('breadcrumb')

export const Breadcrumb: React.FC<IBreadcrumbProps> = ({
  className,
  items,
}) => {
  const pathLength = items.length
  return (
    <div className={classHelper('', [], className ? className : '')}>
      {items.map((data: IBreadcrumbData, index: number) => {
        const i18nTitle = formattedMessageHelper(data.messageId, data.title)

        return (
          (data.title || data.messageId) && (
            <span key={data.id} className={classHelper('item')}>
              {data.path ? (
                  //anchor to be replaced by Link
                <a className={classHelper('title')}>
                  {i18nTitle}
                </a>
              ) : (
                <p className={classHelper('inactive-title')}>{i18nTitle}</p>
              )}
              {index + 1 < pathLength ? (
                <p className={classHelper('arrow')}>{'>'}</p>
              ) : (
                ''
              )}
            </span>
          )
        )
      })}
    </div>
  )
}
Breadcrumb.displayName = 'Breadcrumb'
