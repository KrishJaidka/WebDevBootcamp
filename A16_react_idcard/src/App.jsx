import { useEffect, useState } from 'react'
import './App.css'
import ProfileCard from './components/profileCard'
function App() {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users')
        const data = await res.json();
        setApiData(data.users.slice(0, 8));

      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [])

  return (
    <>
      <h1>Profile App</h1>
      <div className="main">
        {
          apiData.map((user, index) => {
            const {firstName,lastName,age,phone} = user
            const title = user.company.title
            return (<ProfileCard 
              key={index} 
              firstName={firstName} 
              lastName={lastName} 
              phoneNum={phone} 
              age={age} 
              title={title} 
            />)
          })
        }
      </div>
    </>
  )
}

export default App
