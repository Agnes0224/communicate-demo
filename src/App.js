import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatPage from './page/ChatPage/ChatPage'
import EvaluatePage from './page/EvaluatePage/EvaluatePage'
import RankingList from './page/RankingList/RankingList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/evaluate" element={<EvaluatePage />} />
        <Route path="/rank" element={<RankingList />} />
      </Routes>
    </Router>
  );
}

export default App;
