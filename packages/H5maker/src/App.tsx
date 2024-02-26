import { Route, Routes } from 'react-router-dom'

import List from './pages/List'
import './App.css'
import Maker from './pages/Maker'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/shop/edit/:id" element={<Maker />}></Route>
      </Routes>
    </div>
  )
}

export default App
