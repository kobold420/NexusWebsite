import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RefreshCw, Zap } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { ErrorState, LoadingState } from '../components/StateView';
import { getDashboardData } from '../services/warehouseService';
import type { Kpi, MovementPoint, WarehouseTask } from '../types';

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<{ kpis: Kpi[]; movements: MovementPoint[]; tasks: WarehouseTask[] } | null>(null);
  const [showOnlyCritical, setShowOnlyCritical] = useState(false);
  const [scenario, setScenario] = useState<'normal' | 'peak'>('normal');

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const shownTasks = useMemo(() => data?.tasks.filter((task) => !showOnlyCritical || task.priority === 'hoch') ?? [], [data, showOnlyCritical]);
  const chartData = useMemo(() => data?.movements.map((point) => ({
    ...point,
    inbound: scenario === 'peak' ? Math.round(point.inbound * 1.18) : point.inbound,
    outbound: scenario === 'peak' ? Math.round(point.outbound * 1.14) : point.outbound
  })) ?? [], [data, scenario]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!data) return null;

  return (
    <section className="page">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Live Operations</p>
          <h1>Warehouse Dashboard</h1>
          <p>Ein schneller Überblick über Utilization, offene Tasks und Warenbewegungen. Die Begriffe bleiben teilweise Englisch, weil das in echten SaaS-/Logistik-Tools üblich ist.</p>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" onClick={() => setScenario((value) => value === 'normal' ? 'peak' : 'normal')}>
            <Zap size={16} /> {scenario === 'normal' ? 'Peak Scenario' : 'Normal Scenario'}
          </button>
          <button className="primary-button" onClick={() => setShowOnlyCritical((value) => !value)}>
            <RefreshCw size={16} /> {showOnlyCritical ? 'Alle Tasks' : 'High Priority'}
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        {data.kpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>

      <div className="two-column">
        <article className="card chart-card">
          <div className="section-title">
            <h2>Inbound vs. Outbound</h2>
            <span>{scenario === 'peak' ? 'Peak Simulation' : 'letzte 5 Tage'}</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="inbound" name="Inbound" strokeWidth={2} fillOpacity={0.22} />
              <Area type="monotone" dataKey="outbound" name="Outbound" strokeWidth={2} fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        <article className="card">
          <div className="section-title">
            <h2>Priority Board</h2>
            <span>{shownTasks.length} Einträge</span>
          </div>
          <div className="mini-list">
            {shownTasks.map((task) => (
              <div key={task.id}>
                <strong>{task.title}</strong>
                <span>{task.assignee} · {task.location} · {task.priority}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
