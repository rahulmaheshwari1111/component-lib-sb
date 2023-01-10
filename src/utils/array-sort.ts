
export const arrayOfObjectsSorting = (array: any[], sortByLabel?: string) => {
    array.sort((str1: any, str2: any) => {
      var lowercaseStr1 = !!sortByLabel
        ? str1[sortByLabel]?.toLowerCase()
        : str1?.toLowerCase() // ignore upper and lowercase
  
      var lowercaseStr2 = !!sortByLabel
        ? str2[sortByLabel]?.toLowerCase()
        : str2?.toLowerCase() // ignore upper and lowercase
  
      if (lowercaseStr1 < lowercaseStr2) {
        return -1
      }
      if (lowercaseStr1 > lowercaseStr2) {
        return 1
      }
  
      // names must be equal
      return 0
    })
    return array
  }

  import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value || '')
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
