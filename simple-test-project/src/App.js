import { useState } from "react";
import "./App.css";
import UserForm from "./UserForm";
import UsersList from "./UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUser = (user) => {
    setUsersList((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div className="App">
      <UserForm handleSubmit={addUser} />
      <hr />
      <UsersList usersList={usersList} />
    </div>
  );
}

export default App;
