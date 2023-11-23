import { Routes, Route } from 'react-router-dom';

import { Homepage } from './pages/homepage/Homepage';
import { Notfound } from './pages/notfound/Notfound';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;