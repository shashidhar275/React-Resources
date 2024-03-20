import Header from './header';
import Content from './content';
import Footer from './footer';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import { useState } from 'react';

function App() { //Built in component or Default component
    const [ items,setItems ] = useState(JSON.parse(localStorage.getItem('shoppingList')));
    const [newItem,setNewItem] = useState('');
    const [search,setSearch] = useState('');

    const setAndSaveItems = (newItems) =>{
      setItems(newItems);
      localStorage.setItem('shoppingList',JSON.stringify(newItems));
    }

    const addItem = (item) => {
      const id = items.length ? items[items.length-1].id + 1: 1;
      const myNewItem = { id, checked: false , item};
      const listItems = [...items, myNewItem];
      setAndSaveItems(listItems);
    }

    const handleCheck = (id)=>{
      const listItems = items.map((item) => item.id === id ? {...item , checked: !item.checked} : item);
      setAndSaveItems(listItems);
  }

    const handleDelete = (id)=>{
        const listItems = items.filter((item)=> item.id!== id);
        setAndSaveItems(listItems);
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(!newItem) return;
      console.log(newItem);
      //Add Item
      addItem(newItem);
      setNewItem('');
    }

  return (
    <div className="App">
      <Header title="Grocery"/>
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch}/>
      <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete}/>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
