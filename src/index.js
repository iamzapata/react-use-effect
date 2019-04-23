import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import { useFetch } from "react-hooks-fetch";

import "./styles.css";

function App() {
  const Err = ({ error }) => <span>Error:{error.message}</span>;

  const DisplayRemoteData = () => {
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    const { error, data } = useFetch(url);
    if (error) return <Err error={error} />;
    if (!data) return null;
    return (
      <div>
        RemoteData:<p>{data.title}</p>
      </div>
    );
  };

  const [users, setUsers] = useState([]);

  const [count, setCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await fetch("https://randomuser.me/api?results=15");
    const { results: users } = await data.json();
    setUsers(users);
    setIsLoading(false);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOnClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <p>You have fetched {count} user(s)</p>

      <button onClick={fetchUsers}>Fetch different users</button>

      <div className="User_List">
        {isLoading && <p>Loading ...</p>}
        {!isLoading &&
          users.map(user => (
            <div>
              <label>User:</label>
              <span>{user.name.first}</span> <span>{user.name.last}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
