import type { InventoryItem } from '../types';
import { StatusChip } from './StatusChip';

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  if (items.length === 0) {
    return <div className="state-box">Keine Inventory Items gefunden. Suchbegriff oder Filter ändern.</div>;
  }

  return (
    <article className="table-card">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>SKU</th>
            <th>Location</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.name}</strong><span>{item.id}</span></td>
              <td>{item.sku}</td>
              <td>{item.location}</td>
              <td>{item.quantity}</td>
              <td><StatusChip status={item.status} /></td>
              <td>{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
