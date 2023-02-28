import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import {useCookies} from 'react-cookie'

const App = () =>  {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [ tasks, setTasks ] = useState(null)//this is saying that the beginning state of tasks is null

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json) //this changes the state of tasks from null to whatever json is using setTasks
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  console.log(tasks)

  //sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      { authToken && 
      <>
        <ListHeader listName={'OLU To-Do List'} getData={getData}/>
        <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
      </>}
      {/* <p className="copyright"> Dewey Coding LLC</p> */}
    </div>
  );
}

export default App;
