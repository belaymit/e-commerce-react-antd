import React from 'react';
import {} from 'antd';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import PageContent from './components/pageContent/PageContent';
import './App.css';

const App = () => (
  <div className="App">
    <Navbar />
    <PageContent />
    <Footer />
  </div>
);

export default App;
