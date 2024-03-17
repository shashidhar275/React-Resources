import React from 'react'
import { useState } from 'react';

const Content = () => {
    const [ name,setName ] = useState("Shashidhar");
    const [count,setCount] = useState(0);

    const handleNameChange = ()=>{
        const names = ['Shashidhar','Mohit','Atharva'];
        const int = Math.floor(Math.random()*3);
        setName(names[int]);
    }
    const handleClickEvent = ()=>{
        setCount(count+1);
        setCount(count+1);
        console.log(count);
    }

    const handleClickEvent2 = ()=>{
        console.log(count);
    }

  return (
    <main>
      <p onDoubleClick={handleClickEvent}>
        Hello {name}
      </p>
      <button onClick={handleNameChange}>Change Name</button>  {/*Function need not be called...if called means it automatically calls the function when html page loads */}
      <button onClick={handleClickEvent}>click</button>{/*In order to use parameters in function we must have to use anonymous function*/}
      <button onClick={handleClickEvent2}>Click This</button>
    </main>
  )
}

export default Content
