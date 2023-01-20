import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Container from '../../pages/container/container';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
