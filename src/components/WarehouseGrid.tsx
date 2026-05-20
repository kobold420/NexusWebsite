import type { WarehouseSlot } from '../types';
import { StatusChip } from './StatusChip';

export function WarehouseGrid({ slots, activeId, onSelect }: { slots: WarehouseSlot[]; activeId?: string; onSelect: (slot: WarehouseSlot) => void }) {
  return (
    <div className="warehouse-grid">
      {slots.map((slot) => (
        <button className={`slot ${activeId === slot.id ? 'active' : ''}`} key={slot.id} onClick={() => onSelect(slot)}>
          <span>{slot.zone}</span>
          <strong>{slot.id}</strong>
          <div className="slot-footer">
            <small>{slot.utilization}% used</small>
            <StatusChip status={slot.status} />
          </div>
        </button>
      ))}
    </div>
  );
}
