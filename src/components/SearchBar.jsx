/** @format */

import React, { useContext, useEffect, useRef, useState } from 'react'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import './searchbar.scss'
import { ReadingListContext } from '../contexts/ReadingList'

function SearchBar({ books, selectBook }) {
  const { readingList } = useContext(ReadingListContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchStr, setSearchStr] = useState('')

  useEffect(() => {
    const keyupEvent = e => {
      if (e.keyCode == 27) {
        setShowDropdown(false)
      }
    }
    document.querySelector('.search').addEventListener('keyup', keyupEvent)
    return () => {
      document.querySelector('.search').removeEventListener('keyup', keyupEvent)
    }
  }, [])

  const ref = useRef(null)

  useEffect(() => {
    const handleOutSideClick = event => {
      if (!ref.current?.contains(event.target)) {
        if (showDropdown) {
          setShowDropdown(false)
        }
      }
    }

    window.addEventListener('mousedown', handleOutSideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick)
    }
    // eslint-disable-next-line
  }, [ref])

  return (
    <div className="search">
      <div className="search-container" onSubmit={e => e.preventDefault()}>
        <SearchRoundedIcon />
        <input
          type="search"
          placeholder="Search for a book and click to add to list"
          onFocus={() => setShowDropdown(true)}
          value={searchStr}
          onChange={e => {
            setShowDropdown(true)
            setSearchStr(e.target.value)
          }}
        />
      </div>
      {showDropdown && (
        <div className="search-dropdown" ref={ref}>
          {
            <RenderBooks
              books={books
                .filter(b => {
                  const isIn = readingList.findIndex(r => r.id == b.id)
                  if (isIn < 0) {
                    return true
                  }
                  return false
                })
                .filter(
                  b =>
                    b.title.toLowerCase().includes(searchStr.toLowerCase()) ||
                    b.author.toLowerCase().includes(searchStr.toLowerCase())
                )}
              setShowDropdown={setShowDropdown}
              selectBook={b => selectBook(b, books)}
            />
          }
        </div>
      )}
    </div>
  )
}

function RenderBooks({ books, setShowDropdown, selectBook }) {
  return books.length > 0 ? (
    books.map((b, i) => (
      <BookItem
        key={`search_${i}`}
        book={b}
        onSelect={() => {
          setShowDropdown(false)
          selectBook(b)
        }}
      />
    ))
  ) : (
    <div style={{ display: 'flex' }}>No Books Found</div>
  )
}

function BookItem({ book, onSelect }) {
  return (
    <div className="book-item" onClick={() => onSelect(book)}>
      <img src={book.coverPhotoURL} alt="" />
      <div className="book-details">
        <div className="title">{book.title}</div>
        <div className="author">{book.author}</div>
      </div>
    </div>
  )
}

export default SearchBar
