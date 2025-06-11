import React, { useState, useEffect } from 'react';
import './TreeTraversalVisualizer.css';

const TreeTraversalVisualizer = () => {
  const [n, setN] = useState(0);
  const [edgesInput, setEdgesInput] = useState('');
  const [edges, setEdges] = useState([]);
  const [error, setError] = useState('');
  const [adjList, setAdjList] = useState({});
  const [traversalType, setTraversalType] = useState('Inorder');
  const [visitedOrder, setVisitedOrder] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const buildAdjList = () => {
    const lines = edgesInput.trim().split('\n');
    if (lines.length !== n - 1) {
      setError(`Tree must have exactly ${n - 1} edges for ${n} nodes.`);
      return;
    }
    setError('');
    const adj = {};
    for (let i = 1; i <= n; i++) adj[i] = [];
    const newEdges = [];
    for (let line of lines) {
      const [a, b] = line.trim().split(/\s+/).map(Number);
      if (!adj[a] || !adj[b]) {
        setError('Invalid edge input. Use integers from 1 to n.');
        return;
      }
      adj[a].push(b);
      adj[b].push(a);
      newEdges.push([a, b]);
    }
    setAdjList(adj);
    setEdges(newEdges);
    setVisitedOrder([]);
    setSteps([]);
    setStepIndex(0);
  };

  const dfs = (node, parent, order, stepList) => {
    order.push(node);
    stepList.push([...order]);
    for (let neighbor of adjList[node]) {
      if (neighbor !== parent) dfs(neighbor, node, order, stepList);
    }
  };

  const inorder = (node, parent, visited, stepList) => {
    const children = adjList[node].filter(neigh => neigh !== parent);
    if (children.length > 0) inorder(children[0], node, visited, stepList);
    visited.push(node);
    stepList.push([...visited]);
    if (children.length > 1) inorder(children[1], node, visited, stepList);
  };

  const postorder = (node, parent, visited, stepList) => {
    for (let child of adjList[node]) {
      if (child !== parent) postorder(child, node, visited, stepList);
    }
    visited.push(node);
    stepList.push([...visited]);
  };

  const traverseTree = () => {
    const visited = [];
    const stepList = [];
    if (traversalType === 'Preorder') dfs(1, -1, visited, stepList);
    else if (traversalType === 'Inorder') inorder(1, -1, visited, stepList);
    else if (traversalType === 'Postorder') postorder(1, -1, visited, stepList);
    setVisitedOrder([]);
    setSteps(stepList);
    setStepIndex(0);
  };

  useEffect(() => {
    if (steps.length === 0 || stepIndex >= steps.length) return;
    const timer = setTimeout(() => {
      setVisitedOrder(steps[stepIndex]);
      setStepIndex(prev => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [stepIndex, steps]);

  const renderTree = () => {
    const positions = {};
    const layout = (node, parent, depth, xOffset) => {
      const children = adjList[node]?.filter(neigh => neigh !== parent) || [];
      let width = 0;
      children.forEach(child => {
        width += layout(child, node, depth + 1, xOffset + width);
      });
      if (width === 0) width = 1;
      positions[node] = { x: xOffset + width / 2, y: depth };
      return width;
    };
    layout(1, -1, 0, 0);

    return (
      <svg width="100%" height="400px">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={positions[a]?.x * 80}
            y1={positions[a]?.y * 100 + 50}
            x2={positions[b]?.x * 80}
            y2={positions[b]?.y * 100 + 50}
            stroke="black"
          />
        ))}
        {Object.entries(positions).map(([node, pos]) => (
          <g key={node}>
            <circle
              cx={pos.x * 80}
              cy={pos.y * 100 + 50}
              r="20"
              fill={visitedOrder.includes(parseInt(node)) ? '#facc15' : '#4ade80'}
              stroke="#000"
              strokeWidth="2"
            />
            <text
              x={pos.x * 80}
              y={pos.y * 100 + 55}
              textAnchor="middle"
              fill="black"
              fontWeight="bold"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="tree-container">
      <h2 className="title">Tree Traversal Visualizer</h2>

      <div className="input-section">
        <label>Number of Nodes:</label>
        <input
          type="number"
          value={n}
          onChange={e => setN(parseInt(e.target.value))}
        />

        <label>Traversal Type:</label>
        <select value={traversalType} onChange={e => setTraversalType(e.target.value)}>
          <option value="Inorder">Inorder</option>
          <option value="Preorder">Preorder</option>
          <option value="Postorder">Postorder</option>
        </select>

        <label>Enter edges (one per line as 'a b'):</label>
        <textarea
          rows="5"
          value={edgesInput}
          onChange={e => setEdgesInput(e.target.value)}
        />

        <div className="button-group">
          <button onClick={buildAdjList}>Create Tree</button>
          <button onClick={traverseTree}>Start {traversalType}</button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {renderTree()}

      {visitedOrder.length > 0 && (
        <div className="traversal-output">
          Traversal Order: {visitedOrder.join(' → ')}
        </div>
      )}
    </div>
  );
};

export default TreeTraversalVisualizer;
