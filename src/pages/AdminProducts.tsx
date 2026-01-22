import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, Star, StarOff } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCollections } from '@/hooks/useCollections';
import { Product } from '@/data/collections';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const AdminProducts = () => {
  const { collections, addProduct, updateProduct, deleteProduct } = useCollections();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<{ product: Product; collectionId: string } | null>(null);
  const [deleteInfo, setDeleteInfo] = useState<{ productId: string; collectionId: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    price: '',
    colors: '',
    sizes: '',
    featured: false,
  });

  const [productImages, setProductImages] = useState<string[]>([]);
  const [targetCollectionId, setTargetCollectionId] = useState<string>('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      price: '',
      colors: '',
      sizes: '',
      featured: false,
    });
    setProductImages([]);
    setTargetCollectionId('');
    setEditingProduct(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product, collectionId: string) => {
    setEditingProduct({ product, collectionId });
    setFormData({
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price,
      colors: product.colors.join(', '),
      sizes: product.sizes.join(', '),
      featured: product.featured || false,
    });
    setProductImages(product.images);
    setTargetCollectionId(collectionId);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: editingProduct?.product.id || `prod-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      longDescription: formData.longDescription,
      price: formData.price,
      image: productImages[0] || '',
      images: productImages,
      colors: formData.colors.split(',').map((c) => c.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      featured: formData.featured,
    };

    if (editingProduct) {
      updateProduct(editingProduct.collectionId, editingProduct.product.id, productData);
    } else {
      if (targetCollectionId) {
        addProduct(targetCollectionId, productData);
      }
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteInfo) {
      deleteProduct(deleteInfo.collectionId, deleteInfo.productId);
      setDeleteInfo(null);
    }
  };

  const filteredProducts = selectedCollection
    ? collections.find((c) => c.id === selectedCollection)?.products || []
    : collections.flatMap((c) =>
        c.products.map((p) => ({ ...p, collectionId: c.id, collectionTitle: c.title }))
      );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display text-foreground mb-2">
              Produits
            </h1>
            <p className="text-muted-foreground">
              Gérez vos produits par collection
            </p>
          </div>
          <Button onClick={openCreateDialog} className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau produit
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Filtrer par collection:</label>
          <Select value={selectedCollection} onValueChange={setSelectedCollection}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Toutes les collections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les collections</SelectItem>
              {collections.map((col) => (
                <SelectItem key={col.id} value={col.id}>
                  {col.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {(selectedCollection
              ? (collections.find((c) => c.id === selectedCollection)?.products || []).map((p) => ({
                  ...p,
                  collectionId: selectedCollection,
                  collectionTitle: collections.find((c) => c.id === selectedCollection)?.title,
                }))
              : collections.flatMap((c) =>
                  c.products.map((p) => ({ ...p, collectionId: c.id, collectionTitle: c.title }))
                )
            ).map((product, index) => (
              <motion.div
                key={`${product.collectionId}-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                className="luxury-card rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                  <img
                    src={product.image || product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      Vedette
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary mb-1">{product.collectionTitle}</p>
                  <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                  <p className="text-sm text-primary mt-2">{product.price}</p>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(product, product.collectionId)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteInfo({ productId: product.id, collectionId: product.collectionId })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!editingProduct && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Collection</label>
                  <Select value={targetCollectionId} onValueChange={setTargetCollectionId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom du produit</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Agbada Royal Impérial"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prix</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Sur devis"
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
                  placeholder="Description complète du produit..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Couleurs (séparées par virgules)</label>
                  <Input
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Blanc, Ivoire, Or"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tailles (séparées par virgules)</label>
                  <Input
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <label className="text-sm font-medium">Produit en vedette</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Images du produit</label>
                <ImageUploader
                  images={productImages}
                  onImagesChange={setProductImages}
                  maxImages={5}
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
                  {editingProduct ? 'Enregistrer' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteInfo} onOpenChange={() => setDeleteInfo(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer ce produit ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le produit sera définitivement supprimé.
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

export default AdminProducts;
