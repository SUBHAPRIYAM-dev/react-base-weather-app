import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Weather from './components/Weather';

const App = () => {
  return (
    <div>
      <Navbar />
      <Weather />
      <Footer />
    </div>
  );
};

export default App;
