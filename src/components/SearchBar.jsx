/** @format */

import React, { useEffect, useRef, useState } from 'react'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import './searchbar.scss'

function SearchBar({ books, selectBook }) {
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
          placeholder="Search for a book"
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
              books={books.filter(
                b =>
                  b.title.toLowerCase().includes(searchStr.toLowerCase()) ||
                  b.author.toLowerCase().includes(searchStr.toLowerCase())
              )}
              setShowDropdown={setShowDropdown}
              selectBook={selectBook}
            />
          }
        </div>
      )}
    </div>
  )
}

function RenderBooks({ books, setShowDropdown, selectBook }) {
  return books.length > 0 ? (
    books.map(b => (
      <BookItem
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
