import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;
import HeaderNav from './components/Header';
import ChatPage from './page/ChatPage/ChatPage';
import EvaluatePage from './page/EvaluatePage/EvaluatePage';
import RankingList from './page/RankingList/RankingList';
import QuestionList from './page/QuestionList/QuestionList';

function App() {
  return (
    <Router>
      <Layout>
      <HeaderNav />
        <Content>
          <Routes>
            <Route path="/" element={<QuestionList />} />
            <Route path="/chat/:questionId" element={<ChatPage />} />
            <Route path="/evaluate/:questionId" element={<EvaluatePage />} />
            <Route path="/rank" element={<RankingList />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
