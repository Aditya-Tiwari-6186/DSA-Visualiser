import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import SortingVisualizer from "./components/SortingVisualizer";
import SieveVisualizer from "./components/SieveVisualizer";
import HanoiVisualizer from "./components/HanoiVisualizer";
import GraphVisualizer from "./components/GraphVisualizer";
import TreeTraversalVisualizer from "./components/TreeTraversalVisualizer";

const HomeSection = () => (
  <section>
    <h2>What are Data Structures?</h2>
    <p>
      Data Structures are ways to store and organize data in computers so that it can be accessed and modified efficiently.
      They help in solving complex computational problems easily and enhance performance of algorithms.
    </p>

    <h2>Types of Data Structures</h2>
    <ul>
      <li><strong>Linear Data Structures</strong>: Data is stored in a linear fashion. Examples: Array, Linked List, Stack, Queue.</li>
      <li><strong>Non-Linear Data Structures</strong>: Data is stored in a hierarchical way. Examples: Trees, Graphs.</li>
      <li><strong>Hash-based Data Structures</strong>: Store key-value pairs with efficient searching. Example: Hash Tables.</li>
    </ul>

    <h2>Definitions</h2>
    <ul>
      <li><strong>Array:</strong> A collection of elements identified by index or key.</li>
      <li><strong>Linked List:</strong> A sequence of nodes where each node contains data and reference to next.</li>
      <li><strong>Stack:</strong> Follows LIFO (Last In First Out) principle.</li>
      <li><strong>Queue:</strong> Follows FIFO (First In First Out) principle.</li>
      <li><strong>Tree:</strong> A hierarchical structure with nodes connected by edges. Binary Tree is most common.</li>
      <li><strong>Graph:</strong> A collection of nodes (vertices) and edges, can be directed or undirected.</li>
      <li><strong>Hash Table:</strong> Uses hash function to map keys to values for quick lookup.</li>
    </ul>
  </section>
);

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="home-container">
      <header className="header">
        <h1>DSA ALGORITHMS VISUALISER</h1>
        <nav className="navbar">
          <Link to="/graph">Graph</Link>
          <Link to="/trees">Trees</Link>
          <Link to="/sieve">Sieve</Link>
          <Link to="/sorting">Sorting</Link>
          <Link to="/toh">Tower of Hanoi</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/sieve" element={<SieveVisualizer />} />
          <Route path="/toh" element={<HanoiVisualizer />} />
          <Route path="/graph" element={<GraphVisualizer />} />
          <Route path="/trees" element={<TreeTraversalVisualizer />} />
        </Routes>

        {location.pathname === "/" && <HomeSection />}
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
