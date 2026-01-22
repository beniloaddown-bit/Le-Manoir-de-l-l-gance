import { useLocalStorage } from './useLocalStorage';
import { collections as defaultCollections, Collection, Product } from '@/data/collections';

const COLLECTIONS_KEY = 'admin_collections';

export const useCollections = () => {
  const [collections, setCollections] = useLocalStorage<Collection[]>(COLLECTIONS_KEY, defaultCollections);

  const addCollection = (collection: Collection) => {
    setCollections([...collections, collection]);
  };

  const updateCollection = (id: string, updatedCollection: Partial<Collection>) => {
    setCollections(
      collections.map((col) =>
        col.id === id ? { ...col, ...updatedCollection } : col
      )
    );
  };

  const deleteCollection = (id: string) => {
    setCollections(collections.filter((col) => col.id !== id));
  };

  const addProduct = (collectionId: string, product: Product) => {
    setCollections(
      collections.map((col) =>
        col.id === collectionId
          ? { ...col, products: [...col.products, product] }
          : col
      )
    );
  };

  const updateProduct = (collectionId: string, productId: string, updatedProduct: Partial<Product>) => {
    setCollections(
      collections.map((col) =>
        col.id === collectionId
          ? {
              ...col,
              products: col.products.map((prod) =>
                prod.id === productId ? { ...prod, ...updatedProduct } : prod
              ),
            }
          : col
      )
    );
  };

  const deleteProduct = (collectionId: string, productId: string) => {
    setCollections(
      collections.map((col) =>
        col.id === collectionId
          ? { ...col, products: col.products.filter((prod) => prod.id !== productId) }
          : col
      )
    );
  };

  const getCollectionBySlug = (slug: string) => {
    return collections.find((col) => col.slug === slug);
  };

  const getProductById = (collectionSlug: string, productId: string) => {
    const collection = getCollectionBySlug(collectionSlug);
    return collection?.products.find((prod) => prod.id === productId);
  };

  const resetToDefault = () => {
    setCollections(defaultCollections);
  };

  return {
    collections,
    addCollection,
    updateCollection,
    deleteCollection,
    addProduct,
    updateProduct,
    deleteProduct,
    getCollectionBySlug,
    getProductById,
    resetToDefault,
  };
};
