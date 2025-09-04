import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const colors = [
  "#667eea",
  "#764ba2",
  "#ff6f61",
  "#2ecc71",
  "#e67e22",
  "#1abc9c",
  "#e84393",
];
const fonts = [
  '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  '"Georgia", serif',
  '"Courier New", monospace',
  '"Trebuchet MS", sans-serif',
  '"Lucida Console", monospace',
];

function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
  const getRandomFont = () => fonts[Math.floor(Math.random() * fonts.length)];

  const [theme, setTheme] = useState({
    color: getRandomColor(),
    font: getRandomFont(),
  });

  useEffect(() => {
    document.body.style.backgroundColor = theme.color;
    document.body.style.transition = "background-color 0.6s ease";
  }, [theme]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/quotes/random");
      setQuote({
        content: response.data.quote,
        author: response.data.author,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ content: "Keep pushing forward.", author: "Unknown" });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
    setTheme({
      color: getRandomColor(),
      font: getRandomFont(),
    });
  };

  return (
    <main
      id="quote-box"
      style={{
        color: theme.color,
        fontFamily: theme.font,
        transition: "color 0.6s ease, font-family 0.6s ease",
      }}
    >
      <span id="text" style={{ fontSize: "1.5rem", position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill={theme.color}
          viewBox="0 0 24 24"
          style={{ position: "absolute", left: "-30px", top: "-10px" }}
        >
          <path d="M9 17H5l4-12h4zm10 0h-4l4-12h4z" />
        </svg>
        {quote.content}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill={theme.color}
          viewBox="0 0 24 24"
          style={{ position: "absolute", right: "-30px", bottom: "-10px" }}
        >
          <path d="M15 7h4l-4 12h-4zm-10 0h4l-4 12H1z" />
        </svg>
      </span>

      <span id="author">- {quote.author}</span>

      <section id="buttons">
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(
            quote.content
          )}" - ${encodeURIComponent(quote.author)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: theme.color,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "color 0.6s ease",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill={theme.color}
            viewBox="0 0 24 24"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.1 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.69.11 1.02C7.69 5.39 4.07 3.58 1.64.88a4.52 4.52 0 0 0-.61 2.27c0 1.56.8 2.93 2.01 3.74a4.48 4.48 0 0 1-2.05-.57v.06c0 2.18 1.55 4 3.61 4.41a4.52 4.52 0 0 1-2.04.08c.58 1.8 2.26 3.11 4.25 3.15A9.07 9.07 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.84-6.87 12.84-12.83 0-.2 0-.41-.01-.61A9.2 9.2 0 0 0 23 3z" />
          </svg>
          Tweet
        </a>

        <button
          id="new-quote"
          onClick={handleNewQuote}
          style={{
            backgroundColor: theme.color,
            color: "#fff",
            border: "none",
            padding: "0.6rem 1.2rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            transition: "background-color 0.6s ease",
          }}
        >
          New Quote
        </button>
      </section>
    </main>
  );
}

export default App;
