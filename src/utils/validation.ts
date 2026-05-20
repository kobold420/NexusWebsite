import type { InventoryItem, ValidationResult, WarehouseTask } from '../types';

export function validateInventory(items: InventoryItem[]): ValidationResult {
  const errors: string[] = [];
  items.forEach((item) => {
    if (!item.id || !item.sku || !item.location) errors.push(`Inventar ${item.id || 'ohne ID'} ist unvollständig.`);
    if (item.quantity < 0) errors.push(`Inventar ${item.id} hat einen negativen Bestand.`);
  });
  return { valid: errors.length === 0, errors };
}

export function validateTasks(items: WarehouseTask[]): ValidationResult {
  const errors = items
    .filter((task) => !task.title || !task.assignee || !task.location)
    .map((task) => `Aufgabe ${task.id} ist unvollständig.`);
  return { valid: errors.length === 0, errors };
}

export function searchText(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}
