import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Package, 
  LogOut, 
  Home,
  Settings
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin/dashboard' },
  { icon: FolderOpen, label: 'Collections', path: '/admin/collections' },
  { icon: Package, label: 'Produits', path: '/admin/products' },
  { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAdmin();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-display text-gradient-gold">
          Admin Panel
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Manoir de l'Élégance
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link to="/" target="_blank">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-medium">Voir le site</span>
          </div>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
