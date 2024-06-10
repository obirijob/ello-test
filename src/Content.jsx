/** @format */

import React, { useContext, useEffect, useState } from 'react'

import { gql, useQuery } from '@apollo/client'
import SearchBar from './components/SearchBar'

import './content.scss'
import { ReadingListContext } from './contexts/ReadingList'

function Content({ selectBook }) {
  const { loading, error, data } = useQuery(gql`
    query GetBooks {
      books {
        title
        author
        coverPhotoURL
        readingLevel
      }
    }
  `)

  const { readingList, setReadingList, setAllBooks } =
    useContext(ReadingListContext)

  function addToList(book, allBooks) {
    const isInIndex = readingList.findIndex(b => b.id === book.id)
    if (isInIndex < 0) {
      setReadingList([...readingList, book])
    }
    setAllBooks(allBooks)
  }

  function removeBook(book) {
    setReadingList(readingList.filter(b => b.id !== book.id))
  }

  return (
    <div>
      {loading && <>Loading Books</>}
      {error && <>Error loading books</>}
      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <SearchBar
            books={data?.books.map((b, i) => ({ ...b, id: `book_${i}` }))}
            selectBook={(b, a) => {
              if (window.innerWidth > 900) {
                selectBook(b)
              }
              addToList(b, a)
            }}
          />
          <h2>Reading List</h2>
          <div className="books-grid">
            {readingList.map(b => (
              <div
                key={b.title}
                className="book-item"
                onClick={() => {
                  selectBook(b)
                }}
              >
                <img src={b.coverPhotoURL} alt="" />
                <p>{b.title}</p>
                <button className="danger-bt" onClick={() => removeBook(b)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Content
