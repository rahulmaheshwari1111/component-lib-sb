import React, { ReactNode, useState, useEffect } from 'react'
import { BEMHelper } from '../../../utils/bem-helper'
import EmptyList from '../EmptyList'
import './style.scss'

export interface IItemProps {
  id: string
  value: string
}

export interface IDropDownListProps {
  items?: any[]
  maxLimit?: number
  searchTerm?: string
  selectionType: string
  isListOpen?: boolean
  isFilterable?: boolean
  selectedItems?: any[]
  isSearching?: boolean
  className?: string
  listOpensOnClick?: boolean
  noContentExampleFor?: string
  formattedNoContent?: ReactNode
  selectedItemsCallback: (value: any[]) => void
  formattedOption?: (item: any) => JSX.Element
  isSearchedListItemsEmpty?: boolean
  disabled: boolean
}
const classHelper:any = BEMHelper('dropDownList')

// TODO: Add arrow keys navigation
export const DropDownList: React.FC<IDropDownListProps> = ({
  items,
  searchTerm,
  selectionType = 'singleSelect' || 'MultiSelect',
  maxLimit,
  isSearching,
  noContentExampleFor,
  formattedNoContent,
  isFilterable,
  className,
  isListOpen = false,
  listOpensOnClick = false,
  selectedItems = [],
  selectedItemsCallback,
  formattedOption,
  isSearchedListItemsEmpty,
  disabled,
}) => {
  const [temporaryItems, updateTemporaryItems] = useState<any[]>([])
  const [valuesForFormik, updateValuesForFormik] = useState<any[]>(
    selectedItems
  )

  useEffect(() => {
    if (items && items?.length > 0) {
      updateTemporaryItems(items)
    } else if (
      searchTerm === '' ||
      items?.length === 0 ||
      (isSearchedListItemsEmpty &&
        isFilterable &&
        selectionType !== 'singleSelect' &&
        !listOpensOnClick)
    ) {
      updateTemporaryItems([])
    }
  }, [items])

  useEffect(() => {
    if (isListOpen && isFilterable && !listOpensOnClick) {
      updateTemporaryItems([])
    }
  }, [isListOpen])

  useEffect(() => {
    updateValuesForFormik(selectedItems)
  }, [selectedItems])

  const handleSelect = (item: any) => {
    if (selectionType === 'singleSelect') {
      selectedItemsCallback([item])

      updateValuesForFormik([item])
      if (isFilterable) {
        updateTemporaryItems([])
      }
    } else {
      if (maxLimit && maxLimit > 0) {
        if (
          selectedItems.length < maxLimit &&
          !valuesForFormik.some(it => it === item)
        ) {
          selectedItemsCallback([...valuesForFormik, item])
          updateValuesForFormik([...valuesForFormik, item])
        } else {
          return
        }
      } else if (!valuesForFormik.some(it => it === item)) {
        let updatedItems = [...valuesForFormik, item]

        //Filtering out duplicate in case array elemets are object. Above === condition not enoguh
        if (typeof item === 'object')
          updatedItems = updatedItems.filter(
            (v, i, a) =>
              a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i
          )
        selectedItemsCallback(updatedItems)
        updateValuesForFormik(updatedItems)
      }
    }
  }

  const handleKeyboardEvents = (
    e: React.KeyboardEvent<HTMLElement>,
    item: any
  ) => {
    if (e.keyCode === 13) {
      handleSelect(item)
    }
  }

  const renderedChild = () => {
    if (formattedOption && isListOpen) {
      if (temporaryItems.length > 0) {
        return temporaryItems.map(item => (
          <li
            className={
              isListOpen && valuesForFormik[0]?.name === item.name
                ? classHelper('list-item')
                : ''
            }
            onClick={() => handleSelect(item)}
            onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) =>
              handleKeyboardEvents(e, item)
            }
            tabIndex={0}
          >
            {formattedOption({ ...item })}
          </li>
        ))
      } else {
        if (isSearchedListItemsEmpty) {
          return (
            <EmptyList
              exFor={noContentExampleFor}
              content={formattedNoContent}
            />
          )
        }
      }
    } else if (temporaryItems.length > 0 && isListOpen) {
      return temporaryItems.map((item: IItemProps) => (
        <li
          onClick={() => handleSelect(item)}
          key={item.id}
          onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) =>
            handleKeyboardEvents(e, item)
          }
          tabIndex={0}
        >
          {item?.value}
        </li>
      ))
    } else if (isSearchedListItemsEmpty) {
      return (
        <EmptyList exFor={noContentExampleFor} content={formattedNoContent} />
      )
    }
  }

  return (
    <div
      className={classHelper(
        '',
        [isListOpen && !isSearching && !disabled ? 'open' : 'closed'],
        className
      )}
    >
      <ol>{renderedChild()}</ol>
    </div>
  )
}
DropDownList.displayName = 'DropDownList'
