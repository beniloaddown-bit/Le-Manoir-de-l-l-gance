import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCollections } from '@/hooks/useCollections';
import { Collection } from '@/data/collections';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AdminCollections = () => {
  const { collections, addCollection, updateCollection, deleteCollection } = useCollections();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    longDescription: '',
    category: '',
    heroImage: '',
  });

  const [heroImages, setHeroImages] = useState<string[]>([]);

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      slug: '',
      description: '',
      longDescription: '',
      category: '',
      heroImage: '',
    });
    setHeroImages([]);
    setEditingCollection(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      title: collection.title,
      subtitle: collection.subtitle,
      slug: collection.slug,
      description: collection.description,
      longDescription: collection.longDescription,
      category: collection.category,
      heroImage: collection.heroImage,
    });
    setHeroImages([collection.heroImage]);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const collectionData = {
      ...formData,
      heroImage: heroImages[0] || formData.heroImage,
    };

    if (editingCollection) {
      updateCollection(editingCollection.id, collectionData);
    } else {
      addCollection({
        id: `col-${Date.now()}`,
        ...collectionData,
        products: [],
      } as Collection);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCollection(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display text-foreground mb-2">
              Collections
            </h1>
            <p className="text-muted-foreground">
              Gérez vos collections de produits
            </p>
          </div>
          <Button onClick={openCreateDialog} className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="luxury-card rounded-lg overflow-hidden group"
              >
                <div className="relative aspect-video">
                  <img
                    src={collection.heroImage}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-primary font-medium tracking-widest uppercase">
                      {collection.category}
                    </span>
                    <h3 className="text-lg font-display text-white mt-1">
                      {collection.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {collection.products.length} produits
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(collection)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(collection.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCollection ? 'Modifier la collection' : 'Nouvelle collection'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Tenues de Cérémonie"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug (URL)</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ceremony"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sous-titre</label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="L'Art de la Célébration"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégorie</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Cérémonie"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description courte</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description affichée sur les cartes..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description longue</label>
                <Textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="Description complète de la collection..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image de couverture</label>
                <ImageUploader
                  images={heroImages}
                  onImagesChange={setHeroImages}
                  maxImages={1}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground">
                  <Save className="w-4 h-4 mr-2" />
                  {editingCollection ? 'Enregistrer' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer cette collection ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Tous les produits de cette collection seront également supprimés.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCollections;
