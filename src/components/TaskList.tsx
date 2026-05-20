import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { WarehouseTask } from '../types';
import { StatusChip } from './StatusChip';

export function TaskList({ tasks, onToggle }: { tasks: WarehouseTask[]; onToggle: (id: string) => void }) {
  if (tasks.length === 0) {
    return <div className="state-box">Keine Tasks gefunden. Filter zurücksetzen oder Suchtext ändern.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="card task-card" key={task.id}>
          <div>
            <p className="eyebrow">{task.location} · {task.due}</p>
            <h3>{task.title}</h3>
            <span>Assigned to {task.assignee} · Priority {task.priority}</span>
          </div>
          <div className="task-actions">
            <StatusChip status={task.status} />
            <button className="secondary-button" onClick={() => onToggle(task.id)}>
              {task.status === 'erledigt' ? <RotateCcw size={16} /> : <CheckCircle2 size={16} />}
              {task.status === 'erledigt' ? 'Reopen' : 'Done'}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
