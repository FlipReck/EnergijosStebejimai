import React, {useEffect, useState} from 'react'

function App(){

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/getAll").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      
      <pre>{JSON.stringify(backendData, null, 2)}</pre>

    </div>
  )
}

export default App