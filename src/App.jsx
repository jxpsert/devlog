import { useState, useEffect } from "react";
import api from "./api";
import ReactMarkdown from "react-markdown";
import preferences from "../preferences.json";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getAllPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <>
      <h1 className="nbm">{preferences.title}</h1>
      <span className="size-h2">{preferences.subtitle}</span>
      <ul className="posts">
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
              <article>
              <div className="post">
                <span className="nbm post-title">{post.title}</span>
                <span className="post-subtitle">
                  by <span className="post-author">{post.author.name}</span> &middot; <span className="post-date">{formattedDate}</span>
                </span>
                <br></br>
                <span className="post-tags">
                  {post.tags.map((tag) => {
                    return (
                      <span
                        key={tag.title}
                        className="pill post-tag"
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
                <span className="post-content">
                  <ReactMarkdown>{post.body}</ReactMarkdown> {/* Keep in mind this will generate separate <p>, <h1> etc elements */}
                </span>
              </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
