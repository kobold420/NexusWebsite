import { useEffect, useMemo, useState } from 'react';
import { InventoryTable } from '../components/InventoryTable';
import { ErrorState, LoadingState } from '../components/StateView';
import { getInventory } from '../services/warehouseService';
import type { InventoryItem } from '../types';
import { searchText } from '../utils/validation';

export function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [query, setQuery] = useState('');
  const [onlyCritical, setOnlyCritical] = useState(false);
  const [sortByStock, setSortByStock] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getInventory()
      .then(setItems)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const result = items.filter((item) => {
      const matchesQuery = searchText(`${item.name} ${item.sku} ${item.location}`, query);
      const matchesCritical = !onlyCritical || item.priority === 'hoch' || item.status === 'fehler' || item.status === 'warnung';
      return matchesQuery && matchesCritical;
    });
    return sortByStock ? [...result].sort((a, b) => a.quantity - b.quantity) : result;
  }, [items, query, onlyCritical, sortByStock]);

  if (loading) return <LoadingState text="Inventory wird geladen …" />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Inventory Browser</p>
          <h1>Inventory</h1>
          <p>Suchbare Bestandsübersicht mit SKU, Location, Status und Priority.</p>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" onClick={() => setSortByStock((value) => !value)}>{sortByStock ? 'Original Order' : 'Low Stock zuerst'}</button>
          <button className="primary-button" onClick={() => setOnlyCritical((value) => !value)}>{onlyCritical ? 'Alle Items' : 'Critical Items'}</button>
        </div>
      </div>
      <div className="toolbar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Item, SKU oder Location suchen …" />
      </div>
      <InventoryTable items={filtered} />
    </section>
  );
}
