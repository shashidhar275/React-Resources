import Header from './header';
import Content from './content';
import Footer from './footer';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() { //Built in component or Default component
    const API_URL = 'http://localhost:3400/items';

    const [ items,setItems ] = useState( [] );
    const [newItem,setNewItem] = useState('');
    const [search,setSearch] = useState('');
    const [fetchError,setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

      const fetchItems = async ()=>{
        try{
          const response = await fetch(API_URL);
          if (!response.ok) throw Error('Did not received expected data');
          const listItems = await response.json();
          setItems(listItems);          
          setFetchError(null);
        }catch(err){
          setFetchError(err.message);
        }finally{
          setIsLoading(false);
        }
      };

      setTimeout(()=>{ //SetTimeout has been used simply to show the loading state of the application
        //We can just use anyone of the below ones
        fetchItems();
        // (async ()=> await fetchItems())();
      },2000);
    },[])

    const addItem = async (item) => {
      const id = items.length ? String(Number(items[items.length-1].id) + Number(1)): String(1);
      const myNewItem = { id, checked: false , item};
      const listItems = [...items, myNewItem];
      setItems(listItems);

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myNewItem)
      }

      const result = await apiRequest(API_URL, postOptions);
      if(result) setFetchError(result)
    }

    const handleCheck = async (id)=>{
      const listItems = items.map((item) => item.id === id ? {...item , checked: !item.checked} : item);
      setItems(listItems);

      const myItem  = listItems.filter(item => item.id === id);
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked: myItem[0].checked})
      };

      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, updateOptions);
      if(result) setFetchError(result);
  }

    const handleDelete = async (id)=>{
        const listItems = items.filter((item)=> item.id!== id);
        setItems(listItems);

        const deleteOptions = {method: 'DELETE'};
        const reqUrl =`${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if(result) setFetchError(result);
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
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete}/>}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
