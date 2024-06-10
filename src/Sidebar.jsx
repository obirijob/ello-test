/** @format */

import React from 'react'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'

function Sidebar({ book }) {
  return (
    <div className="side-bar">
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <StyleRoundedIcon style={{ marginRight: 10 }} />
        <span>Book Information</span>
      </div>
      <img className="cover-photo" src={book.coverPhotoURL} alt="" />
      <h4>{book.title}</h4>
      <p style={{ marginTop: 20, marginBottom: 20, textAlign: 'justify' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum illo sint
        qui quis illum quod aliquid animi tempora a, ducimus odit unde
        blanditiis laboriosam repudiandae culpa, harum maiores ipsam voluptatem
        nam? vero illum dolore magnam tempore quis expedita, ullam vitae animi
        perspiciatis voluptas et reiciendis.
      </p>
      <p style={{ textAlign: 'right' }}> - {book.author}</p>
    </div>
  )
}

export default Sidebar
