import { useState, useEffect } from "react";
import api from "./api";
import ReactMarkdown from "react-markdown";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getAllPosts().then((data) => {
      console.log(data);
      setPosts(data);
    });
  }, []);

  return (
    <>
      <h1>Devlog</h1>
      <ul>
        {posts.map((post) => {
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const date = new Date(post.publishedAt);
          const formattedDate = `${
            months[date.getMonth()]
          } ${date.getDate()}, ${date.getFullYear()} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          return (
            <li key={post.slug.current}>
              <div className="post">
                <h2 className="nbm">{post.title}</h2>
                <span>
                  by {post.author.name} &middot; {formattedDate}
                </span>
                <br></br>
                <span>
                  {post.tags.map((tag) => {
                    return (
                      <span
                        key={tag.title}
                        className="pill"
                        style={{
                          backgroundColor: tag.colour,
                          color: tag.textcolour,
                        }}
                      >
                        {tag.title}
                      </span>
                    );
                  })}
                </span>
                <p>
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
