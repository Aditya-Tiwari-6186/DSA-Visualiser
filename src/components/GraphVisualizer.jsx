import React, { useState, useEffect } from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState(0);
  const [edges, setEdges] = useState(0);
  const [edgeInput, setEdgeInput] = useState([]);
  const [adjList, setAdjList] = useState({});
  const [inputLines, setInputLines] = useState('');
  const [traversalType, setTraversalType] = useState('BFS');
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [positions, setPositions] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [traversalSteps, setTraversalSteps] = useState([]);

  const handleGenerateGraph = () => {
    const adj = {};
    for (let i = 1; i <= nodes; i++) adj[i] = [];

    const lines = inputLines.trim().split('\n');
    const edgeData = [];

    lines.forEach(line => {
      const [a, b] = line.trim().split(' ').map(Number);
      adj[a].push(b);
      adj[b].push(a);
      edgeData.push([a, b]);
    });

    setAdjList(adj);
    setEdgeInput(edgeData);

    const pos = {};
    const radius = 200;
    const centerX = 300;
    const centerY = 250;

    for (let i = 1; i <= nodes; i++) {
      const angle = (2 * Math.PI * (i - 1)) / nodes;
      pos[i] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }

    setPositions(pos);
    setVisitedOrder([]);
    setTraversalSteps([]);
    setCurrentStep(0);
  };

  const computeTraversalSteps = () => {
    const visited = new Set();
    const steps = [];

    const dfs = (node) => {
      visited.add(node);
      steps.push([...visited]);
      for (const neighbor of adjList[node]) {
        if (!visited.has(neighbor)) dfs(neighbor);
      }
    };

    const bfs = (start) => {
      const queue = [start];
      visited.add(start);
      while (queue.length) {
        const node = queue.shift();
        steps.push([...visited]);
        for (const neighbor of adjList[node]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
            steps.push([...visited]);
          }
        }
      }
    };

    if (nodes === 0) return;
    traversalType === 'DFS' ? dfs(1) : bfs(1);
    setTraversalSteps(steps);
    setVisitedOrder([]);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (traversalSteps.length === 0 || currentStep >= traversalSteps.length) return;

    const timer = setTimeout(() => {
      setVisitedOrder([...traversalSteps[currentStep]]);
      setCurrentStep(currentStep + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentStep, traversalSteps]);

  return (
    <div className="graph-container">
      <h2 className="title">Graph Visualizer</h2>

      <div className="input-section">
        <label>Number of Nodes:</label>
        <input
          type="number"
          value={nodes}
          onChange={(e) => setNodes(parseInt(e.target.value))}
        />

        <label>Number of Edges:</label>
        <input
          type="number"
          value={edges}
          onChange={(e) => setEdges(parseInt(e.target.value))}
        />

        <label>Traversal Type:</label>
        <select value={traversalType} onChange={(e) => setTraversalType(e.target.value)}>
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
        </select>

        <label>Enter edges (one per line as 'a b'):</label>
        <textarea
          rows="5"
          value={inputLines}
          onChange={(e) => setInputLines(e.target.value)}
        />

        <div className="button-group">
          <button onClick={handleGenerateGraph}>Create Graph</button>
          <button onClick={computeTraversalSteps}>Start {traversalType}</button>
        </div>
      </div>

      <svg width="100%" height="500px">
        {edgeInput.map(([a, b], i) => (
          <line
            key={i}
            x1={positions[a]?.x}
            y1={positions[a]?.y}
            x2={positions[b]?.x}
            y2={positions[b]?.y}
            stroke="black"
            strokeWidth="2"
          />
        ))}
        {Object.entries(positions).map(([node, pos]) => (
          <g key={node}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="20"
              fill={visitedOrder.includes(parseInt(node)) ? '#facc15' : '#94a3b8'}
              stroke="#000"
              strokeWidth="2"
            />
            <text
              x={pos.x}
              y={pos.y + 5}
              textAnchor="middle"
              fontSize="16"
              fill="black"
              fontWeight="bold"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>

      {visitedOrder.length > 0 && (
        <div className="traversal-output">
          Traversal Order: {visitedOrder.join(' → ')}
        </div>
      )}
    </div>
  );
};

export default GraphVisualizer;
