import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;
import HeaderNav from './components/Header';
import ChatPage from './page/ChatPage/ChatPage';
import EvaluatePage from './page/EvaluatePage/EvaluatePage';
import RankingList from './page/RankingList/RankingList';

function App() {
  return (
    <Router>
      <Layout>
      <HeaderNav />
        <Content style={{ margin: '24px 0' }}>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/evaluate" element={<EvaluatePage />} />
            <Route path="/rank" element={<RankingList />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
