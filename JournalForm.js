import React, { useState, useEffect } from "react";
import axios from "axios";

function JournalForm() {
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState([]);

  const fetchJournals = () => {
    axios.get("http://127.0.0.1:8000/api/journals/")
      .then(res => setJournals(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/journals/", {
      content: content,
      user: 1
    })
    .then(res => {
      setContent("");
      fetchJournals();
    })
    .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Journal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your journal..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br/>
        <button type="submit">Add Journal</button>
      </form>

      <h3>Journal List</h3>
      {journals.map((item) => (
        <p key={item.id}>{item.content}</p>
      ))}
    </div>
  );
}

export default JournalForm;