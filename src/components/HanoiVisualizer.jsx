import React, { useState, useEffect } from 'react';

const TowerOfHanoiVisualizer = () => {
  const [numDisks, setNumDisks] = useState(3);
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [towers, setTowers] = useState([[], [], []]);

  const generateMoves = (n, from, to, aux, result = []) => {
    if (n === 0) return;
    generateMoves(n - 1, from, aux, to, result);
    result.push([from, to]);
    generateMoves(n - 1, aux, to, from, result);
    return result;
  };

  const initializeTowers = () => {
    const initialTowers = [[], [], []];
    for (let i = numDisks; i >= 1; i--) {
      initialTowers[0].push(i);
    }
    setTowers(initialTowers);
    setMoves(generateMoves(numDisks, 0, 2, 1));
    setCurrentMove(0);
  };

  useEffect(() => {
    if (currentMove >= moves.length || moves.length === 0) return;
    const timer = setTimeout(() => {
      const [from, to] = moves[currentMove];
      const newTowers = towers.map(t => [...t]);
      const disk = newTowers[from].pop();
      newTowers[to].push(disk);
      setTowers(newTowers);
      setCurrentMove(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentMove, moves]);

  const renderTower = (tower, towerIndex) => {
    const baseX = towerIndex * 150 + 100;
    return tower.map((disk, i) => {
      const width = disk * 20;
      return (
        <rect
          key={i}
          x={baseX - width / 2}
          y={250 - i * 25}
          width={width}
          height="20"
          fill="#4ade80"
          rx="5"
        />
      );
    });
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
        Tower of Hanoi Visualizer
      </h2>

      {/* Updated Input Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <label style={{
          fontWeight: 'bold',
          marginBottom: '5px',
          textAlign: 'center'
        }}>
          Enter N (Number of Disks):
        </label>
        <input
          type="number"
          value={numDisks}
          onChange={e => setNumDisks(Math.max(1, Math.min(6, Number(e.target.value))))}
          placeholder="Number of disks"
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        />
        <button
          onClick={initializeTowers}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            borderRadius: '8px',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Start Tower of Hanoi
        </button>
      </div>

      {/* Centered SVG */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="600" height="300">
          {/* Pegs */}
          {[0, 1, 2].map(i => (
            <rect
              key={`peg-${i}`}
              x={i * 150 + 95}
              y={100}
              width="10"
              height="150"
              fill="#94a3b8"
            />
          ))}
          {/* Disks */}
          {towers.map((tower, i) => renderTower(tower, i))}
        </svg>
      </div>

      {moves.length > 0 && (
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '16px' }}>
          Step {currentMove} / {moves.length}
        </p>
      )}
    </div>
  );
};

export default TowerOfHanoiVisualizer;
