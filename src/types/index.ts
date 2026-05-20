export type Status = 'lagernd' | 'warnung' | 'fehler' | 'in_bearbeitung' | 'offen' | 'erledigt';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  location: string;
  quantity: number;
  status: Status;
  priority: 'niedrig' | 'mittel' | 'hoch';
}

export interface WarehouseSlot {
  id: string;
  zone: string;
  utilization: number;
  status: Status;
  recommendation: string;
}

export interface WarehouseTask {
  id: string;
  title: string;
  assignee: string;
  location: string;
  status: Status;
  priority: 'niedrig' | 'mittel' | 'hoch';
  due: string;
}

export interface Kpi {
  label: string;
  value: string;
  hint: string;
  trend: string;
}

export interface MovementPoint {
  day: string;
  inbound: number;
  outbound: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
