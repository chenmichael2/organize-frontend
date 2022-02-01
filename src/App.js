import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import ToDo from './components/ToDo';
// import About from './components/About';
import Footer from './components/Footer';
import './App.css';
import MakeTask from './components/MakeTask';
import MakeProject from './components/MakeProject';
import DeleteProject from './components/DeleteProject';
import EditTask from './components/EditTask';
import DeleteTask from './components/DeleteTask';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}

const ToDoList = ({ component: Component, user, ...rest}) => {
  // const user = localStorage.getItem('jwtToken'); 
  return <Route {...rest} render={(props) => {
      return user ? <Component user={user} {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}

const NewToDo = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component user={user} {...rest} {...props} /> : <Redirect to="/todo" />
    }}
  />;
}
const MakingProject = ({ component: Component, user, ...rest }) => {
  // const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component user={user} {...rest} {...props} /> : <Redirect to="/todo" />
    }}
  />;
}

const EditTaskRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}


function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User', currentUser);
  console.log('Authenicated', isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      {/* <div className="container mt-5"> */}
        <Switch>
          <Route path="/signup" component={ Signup } />
          <Route 
            path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} 
          />
          <NewToDo path="/newToDo" component={ MakeTask } user={currentUser}/>
          <MakingProject path="/project" component={ MakeProject } user={currentUser} />
          <ToDoList path="/todo/" component={ ToDo } user={currentUser} />
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} />
          <Route path="/confirm/delete" component={ DeleteProject }/>
          <Route path="/delete/task" component={ DeleteTask }/>
          <EditTaskRoute path="/editTask/:id" component={ EditTask } user={currentUser}/>
          <Route exact path="/" component={ Welcome } />
        </Switch>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
