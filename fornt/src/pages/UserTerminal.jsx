import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/UserTerminal.css";
const UserTerminal = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([
    `Welcome, user #${id}! Type "help" to see commands.`,
  ]);
  const [input, setInput] = useState("");

  const commands = {
    help: "Available commands: help, echo, clear",
    echo: (args) => args.join(" "),
    clear: () => {
      setHistory([]);
      return null;
    },
  };

  const handleCommand = (cmdLine) => {
    if (!cmdLine.trim()) return;

    const [cmd, ...args] = cmdLine.split(" ");
    if (cmd in commands) {
      const result = commands[cmd](args);
      if (result === null) return; // for clear command
      setHistory((prev) => [...prev, `$ ${cmdLine}`, result]);
    } else {
      setHistory((prev) => [...prev, `$ ${cmdLine}`, `Command not found: ${cmd}`]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="terminal-container">
      <div className="terminal-history">
        {history.map((line, idx) => (
          <pre key={idx} className="terminal-line">{line}</pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="terminal-prompt">$</span>
        <input
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default UserTerminal;
