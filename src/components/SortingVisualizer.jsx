import React, { useState, useEffect } from 'react';

const SortingVisualizer = () => {
  const [array, setArray] = useState('');
  const [arr, setArr] = useState([]);
  const [sortType, setSortType] = useState('Bubble');
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= steps.length) return;
    const timer = setTimeout(() => {
      setArr(steps[stepIndex]);
      setStepIndex(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [stepIndex, steps]);

  const parseInput = () => {
    const inputArr = array.split(',').map(Number);
    if (inputArr.some(isNaN)) return alert('Enter valid numbers separated by commas');
    setArr(inputArr);
    generateSteps(inputArr);
  };

  const generateSteps = (arr) => {
    let snapshots = [];
    let temp = [...arr];
    const record = () => snapshots.push([...temp]);

    if (sortType === 'Bubble') {
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp.length - i - 1; j++) {
          if (temp[j] > temp[j + 1]) {
            [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
            record();
          }
        }
      }
    } else if (sortType === 'Selection') {
      for (let i = 0; i < temp.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < temp.length; j++) {
          if (temp[j] < temp[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          [temp[i], temp[minIdx]] = [temp[minIdx], temp[i]];
          record();
        }
      }
    } else if (sortType === 'Insertion') {
      for (let i = 1; i < temp.length; i++) {
        let key = temp[i];
        let j = i - 1;
        while (j >= 0 && temp[j] > key) {
          temp[j + 1] = temp[j];
          j--;
          record();
        }
        temp[j + 1] = key;
        record();
      }
    }

    setSteps(snapshots);
    setStepIndex(0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{
        fontSize: '28px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '20px',
        background: 'linear-gradient(to right, #4ade80, #22d3ee)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textShadow: '1px 1px 1px #00000044'
      }}>
        Sorting Visualizer
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter array e.g. 5,3,8,1"
          value={array}
          onChange={e => setArray(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            marginBottom: '10px',
            fontSize: '16px'
          }}
        />

        <select
          onChange={e => setSortType(e.target.value)}
          style={{
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            border: '2px solid #d1d5db',
            fontSize: '16px',
            marginBottom: '10px'
          }}
        >
          <option value="Bubble">Bubble Sort</option>
          <option value="Selection">Selection Sort</option>
          <option value="Insertion">Insertion Sort</option>
        </select>

        <button
          onClick={parseInput}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '10px',
            width: '100%',
            borderRadius: '8px',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Start {sortType}
        </button>
      </div>

      {/* Center the graph */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width={arr.length * 40 + 20} height="300">
          {arr.map((val, i) => (
            <rect
              key={i}
              x={i * 40 + 10}
              y={300 - val * 5}
              width="30"
              height={val * 5}
              fill="#4ade80"
              rx="5"
            />
          ))}
          {arr.map((val, i) => (
            <text
              key={`text-${i}`}
              x={i * 40 + 25}
              y={290 - val * 5}
              textAnchor="middle"
              fill="black"
              fontSize="12"
            >
              {val}
            </text>
          ))}
        </svg>
      </div>

      {steps.length > 0 && (
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '16px' }}>
          Step {stepIndex} / {steps.length}
        </p>
      )}
    </div>
  );
};

export default SortingVisualizer;
