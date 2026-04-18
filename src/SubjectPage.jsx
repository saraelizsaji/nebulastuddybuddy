import { useState } from "react";

function SubjectPage({
  subject,
  goBack,
  homework,
  setHomework,
  tests,
  setTests
}) {
  const [input, setInput] = useState("");
  const [testName, setTestName] = useState("");
  const [score, setScore] = useState("");

  const subjectHW = homework[subject] || [];
  const subjectTests = tests[subject] || [];

  const addHomework = () => {
    if (!input) return;

    setHomework(prev => ({
      ...prev,
      [subject]: [
        ...(prev[subject] || []),
        { text: input, done: false }
      ]
    }));

    setInput("");
  };

  const toggleDone = (i) => {
    const updated = [...subjectHW];
    updated[i].done = !updated[i].done;

    setHomework(prev => ({
      ...prev,
      [subject]: updated
    }));
  };

  const deleteHW = (i) => {
    const updated = [...subjectHW];
    updated.splice(i, 1);

    setHomework(prev => ({
      ...prev,
      [subject]: updated
    }));
  };

  const addTest = () => {
    if (!testName || !score) return;

    setTests(prev => ({
      ...prev,
      [subject]: [
        ...(prev[subject] || []),
        { name: testName, score: Number(score) }
      ]
    }));

    setTestName("");
    setScore("");
  };

  const avg =
    subjectTests.length > 0
      ? subjectTests.reduce((a, b) => a + b.score, 0) /
        subjectTests.length
      : 0;

  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <h2>{subject}</h2>

      <h3>Homework</h3>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addHomework}>Add</button>

      <ul>
        {subjectHW.map((hw, i) => (
          <li key={i}>
            <span onClick={() => toggleDone(i)}>
              {hw.done ? "✔️ " : ""}
              {hw.text}
            </span>
            <button onClick={() => deleteHW(i)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>Tests</h3>
      <input
        value={testName}
        onChange={e => setTestName(e.target.value)}
        placeholder="Test"
      />
      <input
        value={score}
        onChange={e => setScore(e.target.value)}
        placeholder="Score"
        type="number"
      />
      <button onClick={addTest}>Add</button>

      <ul>
        {subjectTests.map((t, i) => (
          <li key={i}>
            {t.name} - {t.score}
          </li>
        ))}
      </ul>

      <p>Average: {avg.toFixed(1)}</p>
    </div>
  );
}

export default SubjectPage;
