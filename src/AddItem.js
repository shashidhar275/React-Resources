import React from 'react'
import {useRef} from 'react';//To bring back the focus on input after clicking on the + icon automatically we use this React HOOk
import { FaPlus } from 'react-icons/fa'
const AddItem = ( {newItem, setNewItem, handleSubmit } ) => {
    const inputRef = useRef();
  return (//event is implicitly passed with the function below no need to use arrow function with event as parameter
    <form className='addForm' onSubmit={handleSubmit}> 
        <label htmlFor="addItem">Add Item</label>
        <input
            autoFocus
            ref={inputRef}
            id='addItem'
            type='text'
            placeholder='Add Item'
            required
            value = {newItem}
            onChange={(e)=> setNewItem(e.target.value)}
        />
        <button type='submit' aria-label='Add Item' onClick={()=>inputRef.current.focus()}>
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem