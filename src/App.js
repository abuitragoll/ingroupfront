import React from 'react';
import Formulario from './Formulario';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <Formulario />
      <ToastContainer />
    </div>
  );
}

export default App;