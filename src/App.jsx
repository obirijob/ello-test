/** @format */

import './App.scss'
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksRounded'
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone'
import HomeTwoToneIcon from '@mui/icons-material/HomeRounded'
import BookTwoToneIcon from '@mui/icons-material/BookRounded'
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeRounded'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsRounded'

import Content from './Content'
import { useState } from 'react'
import Sidebar from './Sidebar'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)

  return (
    <div className="main-container">
      <div className="nav-box">
        <div className="leading">
          <LibraryBooksTwoToneIcon fontSize="48px" />
        </div>
        <div className="nav">
          <div className="navigated">
            <HomeTwoToneIcon />
          </div>
          <div>
            <BookTwoToneIcon />
          </div>
          <div>
            <AccessTimeTwoToneIcon />
          </div>
          <div>
            <SettingsTwoToneIcon />
          </div>
        </div>
        <div className="trailing">
          <MenuOpenTwoToneIcon />
        </div>
      </div>
      <div className="content">
        <Content selectBook={setSelectedBook} />
      </div>
      {selectedBook && (
        <Sidebar
          book={selectedBook}
          closeSidebar={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}

export default App
