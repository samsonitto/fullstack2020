import React from 'react'

const App = () => {
  console.log(1) 
  useEffect(() => {
    console.log(2)	
    setTimeout(()=>{
      console.log(3)
    }, 1000)
    console.log(4) 
  })
  console.log(5) 
  return (<div>hello</div>)
}