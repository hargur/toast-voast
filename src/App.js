import React, { useEffect } from 'react';
import { toastConfig } from './toast-voast';

function App() {
  useEffect(()=> {
    //toastConfig.success('Success Case', {height: 100});
  }, [])

  const handleClick = () => {
    toastConfig.error('Error Case', { position: 'bottomRight'});
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Show Error</button>
      <div id='portal'></div>
    </div>
  );
}

export default App;
