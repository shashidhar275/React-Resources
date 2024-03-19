import React from 'react'
import LineList from './LineList'

const ItemList = ( { items, handleCheck, handleDelete} ) => {
  return (
        <ul>
            {items.map((item) => (  //Exception in React open brackets are required not curly brackets
                <LineList key={item.id} item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
            ))}
        </ul>
  )
}

export default ItemList