import { useState, useEffect } from "react";
import "./App.css";
import api from "./api";

async function App() {
  let [posts, setPosts] = useState(null);

  useEffect(() => {
    api.getAllPosts().then((data) => {
      console.log(data);
      setPosts(data);
    });
  });

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <ul>{posts}</ul>
      </div>
    </>
  );
}

export default App;
