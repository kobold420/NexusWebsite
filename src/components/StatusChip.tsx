import type { Status } from '../types';

const labels: Record<Status, string> = {
  lagernd: 'Available',
  warnung: 'Warning',
  fehler: 'Critical',
  in_bearbeitung: 'In Progress',
  offen: 'Open',
  erledigt: 'Done'
};

export function StatusChip({ status }: { status: Status }) {
  return <span className={`chip chip-${status}`}>{labels[status]}</span>;
}
