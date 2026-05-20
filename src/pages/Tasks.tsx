import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskList } from '../components/TaskList';
import { ErrorState, LoadingState } from '../components/StateView';
import { getTasks } from '../services/warehouseService';
import type { Status, WarehouseTask } from '../types';
import { searchText } from '../utils/validation';

export function Tasks() {
  const [tasks, setTasks] = useState<WarehouseTask[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Status | 'alle'>('alle');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => tasks.filter((task) => {
    const matchesQuery = searchText(`${task.title} ${task.location} ${task.assignee}`, query);
    const matchesFilter = filter === 'alle' || task.status === filter;
    return matchesQuery && matchesFilter;
  }), [tasks, query, filter]);

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === 'erledigt' ? 'offen' : 'erledigt' } : task));
  }

  function addDemoTask() {
    const newTask: WarehouseTask = {
      id: `TASK-${Math.floor(Math.random() * 900 + 200)}`,
      title: 'Demo Task aus Web-App',
      assignee: 'Team Lead',
      location: 'A-04',
      status: 'offen',
      priority: 'mittel',
      due: 'Heute 17:00'
    };
    setTasks((current) => [newTask, ...current]);
  }

  if (loading) return <LoadingState text="Tasks werden geladen …" />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Task Management</p>
          <h1>Tasks</h1>
          <p>Operative Aufgaben suchen, filtern, abhaken und als Demo neu anlegen.</p>
        </div>
        <button className="primary-button" onClick={addDemoTask}><Plus size={16} /> Demo Task</button>
      </div>
      <div className="toolbar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Task, Person oder Location suchen …" />
        <select value={filter} onChange={(event) => setFilter(event.target.value as Status | 'alle')}>
          <option value="alle">Alle Status</option>
          <option value="offen">Open</option>
          <option value="in_bearbeitung">In Progress</option>
          <option value="erledigt">Done</option>
        </select>
      </div>
      <TaskList tasks={filtered} onToggle={toggleTask} />
    </section>
  );
}
