import { useEffect, useMemo, useState } from 'react';
import { WarehouseGrid } from '../components/WarehouseGrid';
import { ErrorState, LoadingState } from '../components/StateView';
import { getWarehouseSlots } from '../services/warehouseService';
import type { WarehouseSlot } from '../types';

export function Warehouse() {
  const [slots, setSlots] = useState<WarehouseSlot[]>([]);
  const [selected, setSelected] = useState<WarehouseSlot | null>(null);
  const [zone, setZone] = useState('alle');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getWarehouseSlots()
      .then((items) => {
        setSlots(items);
        setSelected(items[0]);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const zones = useMemo(() => ['alle', ...Array.from(new Set(slots.map((slot) => slot.zone)))], [slots]);
  const filtered = useMemo(() => slots.filter((slot) => zone === 'alle' || slot.zone === zone), [slots, zone]);

  if (loading) return <LoadingState text="Warehouse View wird geladen …" />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Warehouse View</p>
          <h1>Lagerübersicht</h1>
          <p>Klickbare Lagerplätze mit Auslastung, Status und Empfehlung. So entsteht mehr Mehrwert als bei einer statischen HTML-Seite.</p>
        </div>
        <select value={zone} onChange={(event) => setZone(event.target.value)}>
          {zones.map((item) => <option key={item} value={item}>{item === 'alle' ? 'Alle Zones' : item}</option>)}
        </select>
      </div>

      <div className="warehouse-layout">
        <WarehouseGrid slots={filtered} activeId={selected?.id} onSelect={setSelected} />
        <aside className="card detail-panel">
          <p className="eyebrow">Selected Slot</p>
          {selected ? (
            <>
              <h2>{selected.id}</h2>
              <div className="progress"><span style={{ width: `${selected.utilization}%` }} /></div>
              <strong>{selected.utilization}% Utilization</strong>
              <p>{selected.recommendation}</p>
              <button className="primary-button" onClick={() => alert(`Task für ${selected.id} wurde als Demo angelegt.`)}>Demo Task anlegen</button>
            </>
          ) : <p>Bitte einen Lagerplatz auswählen.</p>}
        </aside>
      </div>
    </section>
  );
}
