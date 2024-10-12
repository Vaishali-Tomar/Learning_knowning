import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import Login from './components/Login';
import Quiz from './components/Quiz';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<Register />} />  {/* element prop instead of component */}
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;