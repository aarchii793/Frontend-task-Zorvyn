import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

/** Root application component with routing and layout shell */
const App = () => {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
};

export default App;
