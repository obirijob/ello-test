/** @format */

import React from 'react'

import { gql, useQuery } from '@apollo/client'
import SearchBar from './components/SearchBar'

import './content.scss'

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

  return (
    <div>
      {loading && <>Loading Books</>}
      {error && <>Error loading books</>}
      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <SearchBar books={data?.books} selectBook={selectBook} />
          <h2>Books Portal</h2>
          <div className="books-grid">
            {data?.books.map(b => (
              <div className="book-item" onClick={() => selectBook(b)}>
                <img src={b.coverPhotoURL} alt="" />
                <p>{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Content
