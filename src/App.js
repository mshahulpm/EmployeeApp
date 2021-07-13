import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import AddEmployee from './pages/addEmployee'
import Employees from './pages/Employee'
import Navbar from './components/Navbar';
function App() {



  return (
    <Router>
      <Navbar />
    <Switch>
    <Route path='/' exact >
<AddEmployee  />
</Route>
<Route path='/employees' exact >
  <Employees />
</Route>
<Route path='*'>
   <h1>
     404 Not Found
   </h1>
  </Route>
    </Switch>
    </Router> 
   );
}

export default App;
