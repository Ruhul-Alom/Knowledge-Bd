import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddBook from "./components/AddBook/AddBook";
import AllBookInfo from "./components/AllBookInfo/AllBookInfo";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyOrders from "./components/MyOrders/MyOrders";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddToOrder from "./components/AddToOrder/AddToOrder";
import Signup from './components/Signup/Signup'
import { createContext, useState } from 'react';

export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
  
    <div>
      <Router>
        <Navbar user={loggedInUser} />
         
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
              <Signup></Signup>
            </Route>
          <PrivateRoute path="/addToCart/:_id">
            < AddToOrder  user={loggedInUser}/>
          </PrivateRoute>
          <PrivateRoute path="/myOrders">
            <MyOrders  user={loggedInUser}/>
          </PrivateRoute>
          <PrivateRoute path="/allBooks">
            <AllBookInfo />
          </PrivateRoute>
          <PrivateRoute path="/addBook">
            <AddBook />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
    </UserContext.Provider>
  
  );
}

export default App;
