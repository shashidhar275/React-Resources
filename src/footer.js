import React from 'react'

const footer = ( { length } ) => {
  return (
    <footer>
        <p>{length} list { length === 1 ? 'item' : 'items'}</p>
    </footer>
  )
}

export default footer