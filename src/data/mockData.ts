import type { InventoryItem, Kpi, MovementPoint, WarehouseSlot, WarehouseTask } from '../types';

export const kpis: Kpi[] = [
  { label: 'Warehouse Utilization', value: '82%', hint: 'Zielbereich 75–85%', trend: '+4% seit Montag' },
  { label: 'Open Tasks', value: '18', hint: '6 davon high priority', trend: '-3 seit gestern' },
  { label: 'Inventory Accuracy', value: '97.4%', hint: 'nach Cycle Count', trend: '+1.2%' },
  { label: 'Avg. Pick Time', value: '6.8 min', hint: 'pro Auftrag', trend: '-0.7 min' }
];

export const movements: MovementPoint[] = [
  { day: 'Mo', inbound: 118, outbound: 94 },
  { day: 'Di', inbound: 132, outbound: 121 },
  { day: 'Mi', inbound: 105, outbound: 148 },
  { day: 'Do', inbound: 151, outbound: 136 },
  { day: 'Fr', inbound: 126, outbound: 159 }
];

export const warehouseSlots: WarehouseSlot[] = [
  { id: 'A-01', zone: 'Fast Mover', utilization: 92, status: 'warnung', recommendation: 'Umlagerung auf A-04 prüfen, da Pick-Zone fast voll ist.' },
  { id: 'A-02', zone: 'Fast Mover', utilization: 74, status: 'lagernd', recommendation: 'Stabil. Keine Aktion notwendig.' },
  { id: 'A-03', zone: 'Spare Parts', utilization: 88, status: 'warnung', recommendation: 'Nachschub in kleinere Batches splitten.' },
  { id: 'A-04', zone: 'Fast Mover', utilization: 41, status: 'lagernd', recommendation: 'Freie Kapazität für A-01 nutzen.' },
  { id: 'B-01', zone: 'Inbound', utilization: 96, status: 'fehler', recommendation: 'Wareneingang blockiert. Priorität hoch.' },
  { id: 'B-02', zone: 'Inbound', utilization: 64, status: 'lagernd', recommendation: 'Pufferplatz frei.' },
  { id: 'C-01', zone: 'Returns', utilization: 57, status: 'in_bearbeitung', recommendation: 'Retourenprüfung bis Schichtende abschließen.' },
  { id: 'C-02', zone: 'Cold Storage', utilization: 83, status: 'lagernd', recommendation: 'Temperaturkritische Artikel im Zielbereich.' }
];

export const tasks: WarehouseTask[] = [
  { id: 'TASK-101', title: 'Inbound Paletten scannen', assignee: 'Maya', location: 'B-01', status: 'offen', priority: 'hoch', due: 'Heute 14:30' },
  { id: 'TASK-102', title: 'Cycle Count für Scanner-Zubehör', assignee: 'Jonas', location: 'A-03', status: 'in_bearbeitung', priority: 'mittel', due: 'Heute 16:00' },
  { id: 'TASK-103', title: 'Pick-Face A-01 entlasten', assignee: 'Lea', location: 'A-01', status: 'offen', priority: 'hoch', due: 'Heute 15:15' },
  { id: 'TASK-104', title: 'Retourenprüfung abschließen', assignee: 'Nico', location: 'C-01', status: 'in_bearbeitung', priority: 'mittel', due: 'Morgen 09:00' },
  { id: 'TASK-105', title: 'Leere Europaletten nachfüllen', assignee: 'Amir', location: 'A-04', status: 'erledigt', priority: 'niedrig', due: 'Erledigt' },
  { id: 'TASK-106', title: 'Wareneingang B-01 freiräumen', assignee: 'Sofia', location: 'B-01', status: 'offen', priority: 'hoch', due: 'Heute 13:45' }
];

export const inventory: InventoryItem[] = [
  { id: 'INV-001', name: 'Industriesensor Paket S-200', sku: 'SEN-200-BL', location: 'A-03', quantity: 124, status: 'lagernd', priority: 'mittel' },
  { id: 'INV-002', name: 'Europalette leer', sku: 'PAL-EUR-01', location: 'A-04', quantity: 420, status: 'lagernd', priority: 'niedrig' },
  { id: 'INV-003', name: 'Verpackungskarton M', sku: 'BOX-M-500', location: 'B-02', quantity: 980, status: 'lagernd', priority: 'niedrig' },
  { id: 'INV-004', name: 'RFID Label Rolle', sku: 'RFID-LABEL-110', location: 'B-01', quantity: 35, status: 'fehler', priority: 'hoch' },
  { id: 'INV-005', name: 'Ersatzakku Scanner', sku: 'SCAN-BAT-908', location: 'A-03', quantity: 76, status: 'in_bearbeitung', priority: 'mittel' },
  { id: 'INV-006', name: 'Temperatur Logger', sku: 'TEMP-LOG-COLD', location: 'C-02', quantity: 19, status: 'warnung', priority: 'hoch' }
];
