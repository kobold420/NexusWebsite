import { inventory, kpis, movements, tasks, warehouseSlots } from '../data/mockData';
import { validateInventory, validateTasks } from '../utils/validation';

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardData() {
  await wait();
  return { kpis, movements, tasks };
}

export async function getWarehouseSlots() {
  await wait();
  return warehouseSlots;
}

export async function getTasks() {
  await wait();
  const validation = validateTasks(tasks);
  if (!validation.valid) throw new Error(validation.errors.join('\n'));
  return tasks;
}

export async function getInventory() {
  await wait();
  const validation = validateInventory(inventory);
  if (!validation.valid) throw new Error(validation.errors.join('\n'));
  return inventory;
}
