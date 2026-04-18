import { useState, useEffect } from "react";
import "./index.css";
import Timer from "./Timer";

function App() {
  const subjects = [
    "Math",
    "Physics",
    "Chemistry",
    "Fashion Studies",
    "English",
    "Computer Science"
  ];

  const [selected, setSelected] = useState(null);
  const [hw, setHw] = useState({});
  const [tests, setTests] = useState({});
  const [input, setInput] = useState("");
  const [testName, setTestName] = useState("");
  const [score, setScore] = useState("");

  // load
  useEffect(() => {
    const h = localStorage.getItem("hw");
    const t = localStorage.getItem("tests");

    if (h) setHw(JSON.parse(h));
    if (t) setTests(JSON.parse(t));
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("hw", JSON.stringify(hw));
  }, [hw]);

  useEffect(() => {
    localStorage.setItem("tests", JSON.stringify(tests));
  }, [tests]);

  // homework
  const addHW = () => {
    if (!input) return;

    setHw(prev => ({
      ...prev,
      [selected]: [
        ...(prev[selected] || []),
        { text: input, done: false }
      ]
    }));

    setInput("");
  };

  const toggleHW = (i) => {
    const list = [...(hw[selected] || [])];
    list[i].done = !list[i].done;

    setHw(prev => ({
      ...prev,
      [selected]: list
    }));
  };

  const deleteHW = (i) => {
    const list = [...(hw[selected] || [])];
    list.splice(i, 1);

    setHw(prev => ({
      ...prev,
      [selected]: list
    }));
  };

  // tests
  const addTest = () => {
    if (!testName || !score) return;

    setTests(prev => ({
      ...prev,
      [selected]: [
        ...(prev[selected] || []),
        { name: testName, score: Number(score) }
      ]
    }));

    setTestName("");
    setScore("");
  };

  const deleteTest = (i) => {
    const list = [...(tests[selected] || [])];
    list.splice(i, 1);

    setTests(prev => ({
      ...prev,
      [selected]: list
    }));
  };

  // MAIN SCREEN
  if (!selected) {
    return (
      <div className="app">
        <h1 className="title">Space Study</h1>

        <Timer />

        <div className="card-container">
          {subjects.map((s) => (
            <div
              key={s}
              className="card"
              onClick={() => setSelected(s)}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SUBJECT PAGE
  const list = hw[selected] || [];
  const subjectTests = tests[selected] || [];

  return (
    <div className="app">
      <div className="panel">
        <button onClick={() => setSelected(null)}>Back</button>

        <h2>{selected}</h2>

        {/* Homework */}
        <h3>Homework</h3>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addHW}>Add</button>

        <ul>
          {list.map((h, i) => (
            <li key={i}>
              <span onClick={() => toggleHW(i)}>
                {h.done ? "✔️ " : ""}
                {h.text}
              </span>
              <button onClick={() => deleteHW(i)}>❌</button>
            </li>
          ))}
        </ul>

        {/* Tests */}
        <h3>Tests</h3>

        <input
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Test name"
        />
        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          type="number"
          placeholder="Score"
        />

        <button onClick={addTest}>Add Test</button>

        {/* GRAPH */}
        <div style={{ margin: "20px 0" }}>
          <h4>Performance</h4>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              height: "120px"
            }}
          >
            {subjectTests.map((t, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "30px",
                    height: `${t.score}px`,
                    background: "cyan",
                    boxShadow: "0 0 10px cyan"
                  }}
                />
                <small>{t.score}</small>
              </div>
            ))}
          </div>
        </div>

        <ul>
          {subjectTests.map((t, i) => (
            <li key={i}>
              {t.name} - {t.score}
              <button onClick={() => deleteTest(i)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;