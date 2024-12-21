import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './route';
import './asset/font/font.css'

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
