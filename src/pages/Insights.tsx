import { useMemo, useState } from 'react';
import { warehouseSlots } from '../data/mockData';

export function Insights() {
  const [capacityTarget, setCapacityTarget] = useState(80);
  const [shiftTeam, setShiftTeam] = useState(4);

  const overloaded = useMemo(() => warehouseSlots.filter((slot) => slot.utilization > capacityTarget), [capacityTarget]);
  const average = Math.round(warehouseSlots.reduce((sum, slot) => sum + slot.utilization, 0) / warehouseSlots.length);
  const estimatedMinutes = Math.max(15, overloaded.length * 18 - shiftTeam * 4);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">AI Optimization</p>
          <h1>Optimization</h1>
          <p>Simple Simulation: Zielauslastung und Schichtgröße verändern und direkt sehen, welche Slots problematisch sind.</p>
        </div>
      </div>

      <div className="card optimizer-card">
        <label htmlFor="capacity">Max. Target Utilization: <strong>{capacityTarget}%</strong></label>
        <input id="capacity" type="range" min="50" max="100" value={capacityTarget} onChange={(event) => setCapacityTarget(Number(event.target.value))} />

        <label htmlFor="team">Shift Team Size: <strong>{shiftTeam} Personen</strong></label>
        <input id="team" type="range" min="1" max="8" value={shiftTeam} onChange={(event) => setShiftTeam(Number(event.target.value))} />

        <div className="insight-grid">
          <div><span>Average Utilization</span><strong>{average}%</strong></div>
          <div><span>Slots over Target</span><strong>{overloaded.length}</strong></div>
          <div><span>Estimated Workload</span><strong>{estimatedMinutes} min</strong></div>
        </div>
      </div>

      <div className="task-list">
        {overloaded.length === 0 ? (
          <div className="state-box">Alles stabil. Kein Slot liegt über dem gewählten Target.</div>
        ) : overloaded.map((slot) => (
          <article className="card task-card" key={slot.id}>
            <div>
              <p className="eyebrow">{slot.zone}</p>
              <h3>{slot.id} liegt bei {slot.utilization}%</h3>
              <span>{slot.recommendation}</span>
            </div>
            <button className="secondary-button">Recommendation übernehmen</button>
          </article>
        ))}
      </div>
    </section>
  );
}
