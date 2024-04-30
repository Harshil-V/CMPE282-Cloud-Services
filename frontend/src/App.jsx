// import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Translation from './components/Translate';
import Textract from './components/Textract';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/translate" element={<Translation />} />
            <Route path="/textract" element={<Textract />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
