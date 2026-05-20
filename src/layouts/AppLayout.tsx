import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, Boxes, ClipboardList, PackageSearch, Warehouse } from 'lucide-react';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { BrandLogo } from '../components/BrandLogo';

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/warehouse', label: 'Warehouse View', icon: Warehouse },
  { to: '/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/inventory', label: 'Inventory', icon: PackageSearch },
  { to: '/insights', label: 'Optimization', icon: Boxes }
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <BrandLogo />
          <div>
            <strong>Nexus Logistics</strong>
            <span>Warehouse SaaS Prototype</span>
          </div>
        </div>

        <nav aria-label="Hauptnavigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-info">
          <span className="eyebrow">Study Case</span>
          <strong>2. Semester Web-App</strong>
          <p>React, TypeScript, Routing, Data Layer, Validation, Tests und echte Interaktionen.</p>
        </div>

        <ThemeSwitch />
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
