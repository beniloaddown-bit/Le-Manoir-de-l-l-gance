import { motion } from 'framer-motion';
import { FolderOpen, Package, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useCollections } from '@/hooks/useCollections';

const AdminDashboard = () => {
  const { collections } = useCollections();
  
  const totalProducts = collections.reduce((acc, col) => acc + col.products.length, 0);
  const featuredProducts = collections.reduce(
    (acc, col) => acc + col.products.filter((p) => p.featured).length,
    0
  );

  const stats = [
    { 
      icon: FolderOpen, 
      label: 'Collections', 
      value: collections.length,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    { 
      icon: Package, 
      label: 'Produits', 
      value: totalProducts,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      icon: TrendingUp, 
      label: 'En vedette', 
      value: featuredProducts,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    { 
      icon: Eye, 
      label: 'Visites ce mois', 
      value: '—',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display text-foreground mb-2">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Bienvenue dans l'espace d'administration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="luxury-card p-6 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="luxury-card p-6 rounded-lg"
          >
            <h2 className="text-xl font-display text-foreground mb-4">
              Actions rapides
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/admin/products"
                className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
              >
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Ajouter un produit</span>
              </Link>
              <Link
                to="/admin/collections"
                className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
              >
                <FolderOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium">Gérer les collections</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="luxury-card p-6 rounded-lg"
          >
            <h2 className="text-xl font-display text-foreground mb-4">
              Collections récentes
            </h2>
            <div className="space-y-3">
              {collections.slice(0, 4).map((collection) => (
                <Link
                  key={collection.id}
                  to={`/admin/collections`}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <img
                    src={collection.heroImage}
                    alt={collection.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {collection.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {collection.products.length} produits
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
