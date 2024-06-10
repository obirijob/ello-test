/** @format */

import { createContext, useState } from 'react'

export const ReadingListContext = createContext([])

export function ReadingListContextProvider({ children }) {
  const [readingList, setReadingList] = useState([])
  const [allBooks, setAllBooks] = useState([])
  return (
    <ReadingListContext.Provider
      value={{ readingList, setReadingList, allBooks, setAllBooks }}
    >
      {children}
    </ReadingListContext.Provider>
  )
}
