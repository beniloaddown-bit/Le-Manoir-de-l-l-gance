import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Lock, Save, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollections } from '@/hooks/useCollections';
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
import { toast } from 'sonner';

const AdminSettings = () => {
  const { resetToDefault } = useCollections();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(
    localStorage.getItem('whatsapp_number') || '221775236363'
  );
  const [phoneError, setPhoneError] = useState('');

  // Validate phone number: must be digits only, 8-15 characters (international format without +)
  const validatePhoneNumber = (phone: string): boolean => {
    const cleanedNumber = phone.replace(/\s/g, ''); // Remove spaces
    const phoneRegex = /^\d{8,15}$/;
    return phoneRegex.test(cleanedNumber);
  };

  const handlePhoneChange = (value: string) => {
    // Allow only digits and spaces
    const sanitized = value.replace(/[^\d\s]/g, '');
    setWhatsappNumber(sanitized);
    
    if (sanitized && !validatePhoneNumber(sanitized)) {
      setPhoneError('Le numéro doit contenir uniquement des chiffres (8-15 chiffres, sans le +)');
    } else {
      setPhoneError('');
    }
  };

  const handleReset = () => {
    resetToDefault();
    setShowResetDialog(false);
    toast.success('Données réinitialisées avec succès');
  };

  const handleSaveWhatsapp = () => {
    const cleanedNumber = whatsappNumber.replace(/\s/g, '');
    
    if (!validatePhoneNumber(cleanedNumber)) {
      toast.error('Format de numéro invalide');
      return;
    }
    
    localStorage.setItem('whatsapp_number', cleanedNumber);
    toast.success('Numéro WhatsApp enregistré');
  };

  const calculateStorageUsage = () => {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage.getItem(key)?.length || 0;
      }
    }
    return (total / 1024).toFixed(2);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-3xl font-display text-foreground mb-2">
            Paramètres
          </h1>
          <p className="text-muted-foreground">
            Configuration de l'administration
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-6 rounded-lg space-y-4"
        >
          <h2 className="text-xl font-display text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Contact WhatsApp
          </h2>
          <p className="text-sm text-muted-foreground">
            Numéro de téléphone pour les commandes via WhatsApp (format: indicatif pays + numéro, ex: 221755236363)
          </p>
          <div className="space-y-2">
            <div className="flex gap-3">
              <Input
                value={whatsappNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="Ex: 221775236363"
                className={`flex-1 ${phoneError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              />
              <Button 
                onClick={handleSaveWhatsapp} 
                className="bg-primary text-primary-foreground"
                disabled={!!phoneError || !whatsappNumber}
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </div>
            {phoneError && (
              <p className="text-sm text-destructive">{phoneError}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="luxury-card p-6 rounded-lg space-y-4"
        >
          <h2 className="text-xl font-display text-foreground">
            Stockage Local
          </h2>
          <p className="text-sm text-muted-foreground">
            Les données sont stockées dans le navigateur (localStorage)
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Espace utilisé</span>
              <span className="text-sm font-mono text-primary">{calculateStorageUsage()} KB</span>
            </div>
            <div className="w-full bg-background rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(parseFloat(calculateStorageUsage()) / 50, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Limite recommandée: 5 MB
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="luxury-card p-6 rounded-lg space-y-4 border-destructive/30"
        >
          <h2 className="text-xl font-display text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Zone de danger
          </h2>
          <p className="text-sm text-muted-foreground">
            Réinitialiser toutes les données aux valeurs par défaut. Cette action est irréversible.
          </p>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => setShowResetDialog(true)}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser les données
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/50 p-6 rounded-lg"
        >
          <h3 className="font-medium text-foreground mb-2">
            ℹ️ À propos du stockage local
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Les données sont stockées uniquement dans ce navigateur</li>
            <li>• Effacer les données du navigateur supprimera toutes vos modifications</li>
            <li>• Les images sont converties en base64 (limite de taille)</li>
            <li>• Pour une solution persistante, envisagez une base de données cloud</li>
          </ul>
        </motion.div>

        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Réinitialiser toutes les données ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera toutes vos modifications et restaurera les données par défaut.
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                className="bg-destructive text-destructive-foreground"
              >
                Réinitialiser
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
