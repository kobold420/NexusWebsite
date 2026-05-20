import { motion } from 'framer-motion';
import type { Kpi } from '../types';

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <motion.article className="card kpi-card" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
      <span>{kpi.label}</span>
      <strong>{kpi.value}</strong>
      <p>{kpi.hint}</p>
      <small>{kpi.trend}</small>
    </motion.article>
  );
}
