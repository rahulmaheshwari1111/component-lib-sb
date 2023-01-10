import React, { ReactNode, useState } from 'react'
import { useEffect } from 'react'
import { arrayOfObjectsSorting, useDebounce } from '../../utils/array-sort'
import { BEMHelper } from '../../utils/bem-helper'
import { Overlay } from '../Overlay'
import { DropDownList } from './DropDownList'
import { SearchFieldContainer } from './SearchFieldContainer'
import './style.scss'

const classHelper:any = BEMHelper('dropdownComponent')

export interface IDropDownComponentProps {
  id?: string
  items: any[] // List of options
  name?: string
  className?: string
  maxLimit?: number // Sets maximum limit for multiselect
  disabled?: boolean // Disabling the dropdown
  formikValues?: any[] // Passes selected values from parent
  isSearching?: boolean // Use only when list is manually updated as per search term by parent component
  isListControlled?: boolean // Use only when list is manually updated as per search term by parent component
  selectionType?: string // 'singleSelect' | 'multiSelect'
  placeholder?: string
  noContentExampleFor?: string
  formattedNoContent?: ReactNode // Message to be shown when there are no result in the list
  formattedSelectedLabel?: string // Should be used mostly with 'formattedOption', Value in the key-value pair which is to be displayed, 'formattedSearchingLabel' is default value for it
  formattedSearchingLabel?: string // Should be used mostly with 'formattedOption', Value in the key-value pair which is to be searched
  isFilterable?: boolean // Dropdown has a Search Field
  listOpensOnClick?: boolean // Use only when list opens on click and 'isFilterable' is enabled
  isControlledListEmpty?: boolean //  Use only when list is manually updated as per search term by parent component and the list is empty
  formikValuesCallback?: (items: any[]) => void // Gives the selected values to formik componenets
  formattedOption?: (item: any) => JSX.Element // Function could be passed which contains list element skeleton rendered
  searchValue?: (debouncedTerm: string) => void // Use when you the search term from the dropdown, is to be mainly used if the list has to be manually controlled
  onChange?: React.ChangeEventHandler<HTMLInputElement> // Gives back event data for event on input field
  placeholderMsgId?: string
  multipleformattedSearchingLabelOption?: boolean // it enable to search by all keys of given array items
}

export const DropDownComponent: React.FC<IDropDownComponentProps> = ({
  id,
  name,
  maxLimit,
  onChange,
  className,
  items = [],
  searchValue,
  formikValues = [],
  formattedOption,
  disabled = false,
  isFilterable = true,
  placeholder,
  listOpensOnClick = false,
  isListControlled = false,
  isSearching = false,
  noContentExampleFor,
  formattedNoContent,
  placeholderMsgId,
  isControlledListEmpty,
  multipleformattedSearchingLabelOption = false,
  formikValuesCallback = () => [],
  formattedSearchingLabel = 'value',
  formattedSelectedLabel = formattedSearchingLabel,
  selectionType = 'multiSelect' || 'singleSelect',
  ...props
}) => {
  const [inputValue, updateInputValue] = useState<string>('')
  const [listOpen, updateListOpen] = useState<boolean>(false)
  const [isSearchFieldExpanded, updateIsSearchFieldExpanded] = useState<
    boolean
  >(false)
  const [selectedItems, updateSelectedItems] = useState<any[]>([])
  const [overlayActive, updateOverlayActive] = useState<boolean>(false)
  const [temporaryItems, updateTemporaryItems] = useState<any[]>([])
  const [isSearchedListItemsEmpty, updateIsSearchedListEmpty] = useState<
    boolean
  >()
  const [disableSearchTermForOnce, updateDisableSearchTermForOnce] = useState<
    boolean
  >(false)
  const debouncedTerm = useDebounce(inputValue || '', 400)

  // Handles calling search Function
  useEffect(() => {
    if (!disableSearchTermForOnce && debouncedTerm !== '') {
      if (
        (selectionType === 'singleSelect' &&
          formikValues.length > 0 &&
          formikValues[0][formattedSelectedLabel] !== debouncedTerm) ||
        formikValues.length === 0
      ) {
        searchValue && searchValue(debouncedTerm)
      } else if (selectionType === 'multiSelect') {
        searchValue && searchValue(debouncedTerm)
      }
    }
    if (
      items &&
      items?.length > 0 &&
      debouncedTerm !== '' &&
      !isListControlled &&
      isFilterable
    ) {
      search()
    }
  }, [debouncedTerm])

  useEffect(() => {
    if (formikValues.length > 0 && formikValues !== selectedItems) {
      updateDisableSearchTermForOnce(true)
      updateSelectedItems(formikValues)
    }
  }, [formikValues])

  useEffect(() => {
    if (selectionType === 'singleSelect' && selectedItems.length > 0) {
      valueSingleSelect()
    }
  }, [selectedItems])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
    if (disableSearchTermForOnce) {
      updateDisableSearchTermForOnce(false)
    }
    updateInputValue(e.target.value)
    updateOverlayActive(true)
    updateListOpen(true)
    updateIsSearchFieldExpanded(true)
  }

  const selectedItemsCallback = (value: any) => {
    updateListOpen(false)
    updateInputValue('')
    updateSelectedItems(value)
  }

  // Function is called when overlay is closed
  const handleCallback = (value: boolean) => {
    closeOverlay()
    updateListOpen(false)
    updateIsSearchFieldExpanded(false)
    if (selectionType === 'singleSelect' && selectedItems.length > 0) {
      updateInputValue(
        selectedItems[0][formattedSelectedLabel || formattedSearchingLabel]
      )
    } else {
      updateInputValue('')
    }
  }

  const handleContainerClick = () => {
    updateOverlayActive(true)
    updateIsSearchFieldExpanded(true)
    if (!isFilterable) {
      updateListOpen(true)
    }
    if (listOpensOnClick) {
      updateListOpen(true)
      updateTemporaryItems(items)
    }
  }

  const closeOverlay = () => {
    updateOverlayActive(false)
    formikValuesCallback && formikValuesCallback(selectedItems)
    if (selectionType !== 'singleSelect') {
      updateTemporaryItems([])
    }
  }

  // Function is only when called if selectionType === 'singleSelect'
  const valueSingleSelect = () => {
    let tempValue = selectedItems[0]
    updateInputValue(
      tempValue[formattedSelectedLabel || formattedSearchingLabel]
    )
    updateIsSearchFieldExpanded(false)
    updateListOpen(false)
    closeOverlay()
  }

  const handleKeyboardEvents = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 27) {
      updateIsSearchFieldExpanded(false)
      updateListOpen(false)
      closeOverlay()
      updateInputValue('')
    } else if (e.keyCode === 9) {
      updateOverlayActive(true)
    }
  }
  const search = () => {
    let temporaryItems: any = []
    if (multipleformattedSearchingLabelOption) {
      const keys = items[0] && Object.keys(items[0])
      temporaryItems = items.filter(el =>
        keys.some((columns: any) =>
          el[columns]
            .toString()
            ?.toLowerCase()
            .includes(debouncedTerm.toLowerCase())
        )
      )
    } else {
      temporaryItems = items.filter(el =>
        el[formattedSearchingLabel]
          ?.toLowerCase()
          .includes(debouncedTerm.toLowerCase())
      )
    }

    if (temporaryItems.length > 0) {
      updateTemporaryItems(
        arrayOfObjectsSorting(temporaryItems, formattedSearchingLabel)
      )
    } else {
      updateTemporaryItems([])
      updateIsSearchedListEmpty(true)
    }
  }

  return (
    <div className={classHelper('', [disabled ? 'disabled' : ''])} id={id}>
      <Overlay visible={overlayActive} callback={handleCallback} />
      <div
        className={classHelper(
          'container',
          [isSearchFieldExpanded && overlayActive ? 'open' : ''],
          className
        )}
        onClick={handleContainerClick}
        onKeyDown={handleKeyboardEvents}
      >
        <SearchFieldContainer
          name={name}
          onChange={handleInputChange}
          searching={isSearching}
          selectedItems={selectedItems}
          selectedItemsCallback={selectedItemsCallback}
          selectionType={selectionType}
          isFilterable={isFilterable}
          isListOpen={listOpen}
          value={inputValue}
          placeholderMsgId={placeholderMsgId}
          isSearchFieldExpanded={isSearchFieldExpanded}
          formattedSearchingLabel={formattedSearchingLabel}
          formattedSelectedLabel={formattedSelectedLabel}
          handleKeyboardEvents={handleKeyboardEvents}
          placeholder={placeholder}
          disabled={disabled}
        />
        <DropDownList
          items={isListControlled || !isFilterable ? items : temporaryItems}
          maxLimit={maxLimit}
          isListOpen={listOpen}
          listOpensOnClick={listOpensOnClick}
          searchTerm={debouncedTerm}
          isFilterable={isFilterable}
          isSearching={!isFilterable ? false : isSearching}
          selectionType={selectionType}
          selectedItems={selectedItems}
          className={className}
          formattedOption={formattedOption}
          noContentExampleFor={noContentExampleFor}
          formattedNoContent={formattedNoContent}
          selectedItemsCallback={selectedItemsCallback}
          isSearchedListItemsEmpty={
            isListControlled ? isControlledListEmpty : isSearchedListItemsEmpty
          }
          disabled={disabled}
        />
      </div>
    </div>
  )
}
DropDownComponent.displayName = 'DropDownComponent'
