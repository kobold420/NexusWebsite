import { describe, expect, it } from 'vitest';
import { searchText, validateInventory, validateTasks } from './validation';
import type { InventoryItem, WarehouseTask } from '../types';

describe('searchText', () => {
  it('findet Text unabhängig von Groß- und Kleinschreibung', () => {
    expect(searchText('Sensor Modul X4', 'sensor')).toBe(true);
  });
});

describe('validateInventory', () => {
  it('erkennt negative Bestände als Fehler', () => {
    const invalid: InventoryItem[] = [{ id: '1', name: 'Test', sku: 'A', location: 'B-01', quantity: -1, status: 'lagernd', priority: 'niedrig' }];
    expect(validateInventory(invalid).valid).toBe(false);
  });
});

describe('validateTasks', () => {
  it('akzeptiert vollständige Aufgaben', () => {
    const valid: WarehouseTask[] = [{ id: 'T1', title: 'Prüfen', assignee: 'Max', location: 'A-01', status: 'offen', priority: 'mittel', due: 'Heute' }];
    expect(validateTasks(valid).valid).toBe(true);
  });
});
