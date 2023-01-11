import * as React from 'react'
import { BEMHelper } from '../../utils/bem-helper'
import { formattedMessageHelper } from '../../utils/int-helpers'

import './styles.scss'

const classHelper:any = BEMHelper('accordion')
export interface IAccordion {
  id?: string
  title: JSX.Element | string
  children: JSX.Element | string
  variant?: 'small' | 'medium' | 'large'
  iconHidden?: boolean
  isExpanded?: boolean
  titleId?: string
  messageId?: string
}

export const Accordion: React.FC<IAccordion> = ({
  id,
  title,
  children,
  variant,
  iconHidden,
  isExpanded,
  titleId,
  messageId,
}) => {
  const [expanded, updateExpanded] = React.useState(isExpanded)
  const renderedTitle = formattedMessageHelper(titleId, title)
  const renderedChild = formattedMessageHelper(messageId, children)

  const handleClick = (e: any) => {
    updateExpanded(!expanded)
  }

  return (
    <div>
      <button
        className={classHelper(
          '',
          [expanded ? 'selected' : ''],
          [variant ? variant : 'small']
        )}
        onClick={handleClick}
      >
        {renderedTitle}
        <i
          className={`fa fa-angle-down ${classHelper('icon', [
            iconHidden ? 'hidden' : [expanded ? 'open' : ''],
          ])}`}
        />
      </button>
      <div className={classHelper('body', [expanded ? '' : 'hidden'])}>
        <div className={classHelper('content')}>{renderedChild}</div>
      </div>
    </div>
  )
}
Accordion.displayName = 'Accordion'
