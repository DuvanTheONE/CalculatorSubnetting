import React, { useState } from 'react';
import './App.css';
import Home from './Home_page/Home.jsx';
import IpCalculator from './Components/IpCalculator.jsx';
import ParticlesBackground from './Components/ParticlesBackgorund.jsx';
import SocialBar from './Components/SocialBar.jsx';
import SideNavBar from './Components/SideNavBar.jsx';

function App() {
  const [activeComponent, setActiveComponent] = useState('home');

  const changeActiveComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'ipCalculator':
        return <IpCalculator />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <ParticlesBackground />
      <SocialBar />
      {renderActiveComponent()}
      <SideNavBar changeActiveComponent={changeActiveComponent} />
      <div className="footer">
        <p>&copy; 2023 Duvan Alfonso Mesa Lizcano</p>
      </div>
    </div>
  );
}

export default App;
