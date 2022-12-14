import React, { useEffect } from 'react'

import { BEMHelper } from '../utils/bem-helper'

export interface ITabProps {
  data: Array<{
    label?: string | JSX.Element
    content: JSX.Element
    disabled?: boolean,
    icon?: string
  }>
  onChange?: (arg0: number) => void
  parentActiveTab?: number
}

export const Tab: React.FC<ITabProps> = ({
  data,
  onChange,
  parentActiveTab = 0,
}) => {
  const [activeTab, _setActiveTab] = React.useState(parentActiveTab)
  const activeTabRef = React.useRef(activeTab)
  const setActiveTab = (index: number) => {
    activeTabRef.current = index
    _setActiveTab(index)
  }

  useEffect(() => {
    if (onChange) {
      onChange(activeTab)
    }
  }, [activeTab])

  useEffect(() => {
    if (parentActiveTab !== activeTab) {
      setActiveTab(parentActiveTab)
    }
  }, [parentActiveTab])

  const classHelper:any = BEMHelper('tabs')

  return (
    <div className={classHelper('', [],'')}>
      <ul className={classHelper('list')}>
        {data.map((tab, index) => {

          return (
            <li
              onClick={() => {
                if (!tab.disabled) {
                  setActiveTab(index)
                }
              }}
              key={`${tab.label}-${index}`}
              className={classHelper('pane', [
                index === activeTab ? 'active' : '',
                tab.disabled ? 'disabled' : '',
              ])}
            >
              {tab?.icon && <><i className={`fa ${tab.icon}`}></i>&nbsp;&nbsp;</>}{tab.label}
            </li>
          )
        })}
      </ul>
      <div className={classHelper('content')}>{data[activeTab].content}</div>
    </div>
  )
}