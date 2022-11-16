import { useState, useEffect } from "react";
import "./App.css";

const getRandomColor = () => {
  const digits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const color = new Array(6)
    .fill("")
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");
  return `#${color}`;
};

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(undefined);

  const generateColors = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    generateColors();
  }, []);

  const handleAnswerClicked = (answer) => {
    if (answer === color) {
      setResult(true);
      setTimeout(() => {
        setResult(undefined);
        generateColors();
      }, 1000);
    } else {
      setResult(false);
    }
  };

  return (
    <main>
      <div className="display" style={{ background: color }}></div>
      <div className="answers">
        {answers.map((answer) => (
          <button onClick={() => handleAnswerClicked(answer)} key={answer}>
            {answer}
          </button>
        ))}
      </div>
      {result === true && <div className="true">Good answer!</div>}
      {result === false && <div className="wrong">Wrong answer!</div>}
    </main>
  );
}

export default App;
