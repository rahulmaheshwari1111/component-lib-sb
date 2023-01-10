import React, { useState, useEffect } from 'react'
import { Body } from '../../Body'
import { BEMHelper } from '../../../utils/bem-helper'
import { Chip } from '../../Chip'
import './style.scss'
import { InputWithRef } from '../../Input'

export interface ISearchFieldContainer {
  name?: string
  value?: string
  disabled?: boolean
  searching?: boolean
  placeholder?: string
  selectedItems?: any[]
  selectionType?: string
  isFilterable?: boolean  
  isListOpen?: boolean
  formattedSelectedLabel?: string
  formattedSearchingLabel?: string
  isSearchFieldExpanded?: boolean
  placeholderMsgId?: string
  selectedItemsCallback: (value: any[]) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  handleKeyboardEvents: (e: React.KeyboardEvent<HTMLElement>) => void
}

const classHelper:any = BEMHelper('searchFieldContainer')

export const SearchFieldContainer: React.FC<ISearchFieldContainer> = ({
  name,
  value,
  disabled,
  onChange,
  searching,
  isListOpen,
  selectionType,
  isFilterable = true,
  selectedItems = [],
  handleKeyboardEvents,
  selectedItemsCallback,
  placeholderMsgId,
  isSearchFieldExpanded = false,
  formattedSearchingLabel = 'value',
  formattedSelectedLabel = formattedSearchingLabel,
  placeholder = 'Search',
}) => {
  const [items, updateItems] = useState<any[]>([])
  const inputRef = React.createRef<HTMLInputElement>()

  useEffect(() => {
    updateItems(selectedItems)
  }, [selectedItems])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    onChange && onChange(e)
  }

  const handleChipClick = (itemClicked: any) => {
    if (isSearchFieldExpanded) {
      const newTags = items.filter((item: { id: any }) => item !== itemClicked)
      updateItems([...newTags])
      selectedItemsCallback([...newTags])
    }
  }

  const handleFocusing = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className={classHelper('', [
        isSearchFieldExpanded && selectedItems ? 'open' : 'closed',
        disabled ? 'disabled' : '',
      ])}
      onClick={handleFocusing}
      onKeyDown={handleKeyboardEvents}
    >
      {items && selectionType === 'multiSelect' && (
        <div className={classHelper('selected')}>
          {items.map(item => (
            <span className={classHelper('chips')}>
              <Chip
                chipText={
                  item[formattedSelectedLabel] || item[formattedSearchingLabel]
                }
                isActive={true}
                iconName="fa-times-circle"
                onClick={e => handleChipClick(item)}
              />
            </span>
          ))}
        </div>
      )}
      {isFilterable ? (
        <InputWithRef
          id="SearchInputField"
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          placeholderMsgId={placeholderMsgId}
          value={value as string}
          autoComplete="off"
          tabIndex={0}
          ref={inputRef}
          disabled={disabled}
          name={name}
          className={classHelper('input-field')}
        />
      ) : selectionType === 'singleSelect' ? (
        <div className={classHelper('normal-single-select')}>
          {items.length > 0
            ? items[0][formattedSelectedLabel] ||
            items[0][formattedSearchingLabel]
            : <Body />}
        </div>
      ) : (
        items.length === 0 && (
          <div className={classHelper('normal-single-select')}>
            {placeholder}
          </div>
        )
      )}
      {!isFilterable && !isListOpen && selectionType === 'singleSelect' && (
        <span className={classHelper('caret-icon-right')}>
          <i className="fa fa-caret-down"></i>
        </span>
      )}
      {!isFilterable && isListOpen && (
        <span className={classHelper('caret-icon-right')}>
          <i className="fa fa-caret-up"></i>
        </span>
      )}
      {searching && (
        <span className={classHelper('search-icon-right')}>
          <i className="fa fa-spinner fa-spin"></i>
        </span>
      )}
    </div>
  )
}
