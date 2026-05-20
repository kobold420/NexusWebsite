import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Tasks } from './pages/Tasks';
import { Warehouse } from './pages/Warehouse';
import { Insights } from './pages/Insights';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="warehouse" element={<Warehouse />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="insights" element={<Insights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
