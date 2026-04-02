import React, { useEffect, useState } from "react";
import axios from "axios";
import MoodChart from "./MoodChart";


const token = localStorage.getItem("token");

axios.get("http://127.0.0.1:8000/api/moods/", {
  headers: { Authorization: `Bearer ${token}` }
})
// MoodForm Component
function MoodForm({ onAdd }) {
  const [mood, setMood] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/moods/", {
      mood: mood,
      user: 1,
    })
      .then(res => {
        setMood("");
        onAdd(); // Refresh parent moods list
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Mood</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <button type="submit">Add Mood</button>
      </form>
    </div>
  );
}

// JournalForm Component
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
      user: 1,
    })
      .then(res => {
        setContent("");
        fetchJournals();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Add Journal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your journal..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          cols={50}
          required
        />
        <br />
        <button type="submit">Add Journal</button>
      </form>

      <h3>Journal List</h3>
      {journals.map(item => <p key={item.id}>{item.content}</p>)}
    </div>
  );
}

// Main Dashboard
function Dashboard() {
  const [moods, setMoods] = useState([]);

  // Fetch moods from backend
  const fetchMoods = () => {
    axios.get("http://127.0.0.1:8000/api/moods/")
      .then(res => setMoods(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MindCare Dashboard</h1>

      <MoodForm onAdd={fetchMoods} />

      {/* Mood Analytics Chart */}
      <MoodChart moods={moods} />

      <h3>Mood List</h3>
      {moods.length === 0 ? (
        <p>No moods added yet.</p>
      ) : (
        moods.map(item => <p key={item.id}>{item.mood}</p>)
      )}

      <JournalForm />
    </div>
  );
}

export default Dashboard;