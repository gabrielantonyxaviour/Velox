import { toast } from 'sonner';
import { getExplorerUrl } from './aptos';
import { ExternalLink } from 'lucide-react';

/**
 * Show a success toast for a completed transaction
 */
export function showTxSuccess(message: string, txHash: string) {
  toast.success(message, {
    description: `Transaction confirmed`,
    action: {
      label: 'View TX',
      onClick: () => window.open(getExplorerUrl(txHash), '_blank'),
    },
    duration: 5000,
  });
}

/**
 * Show a success toast without a transaction link
 */
export function showSuccess(message: string, description?: string) {
  toast.success(message, {
    description,
    duration: 4000,
  });
}

/**
 * Show an error toast
 */
export function showError(message: string, description?: string) {
  toast.error(message, {
    description,
    duration: 5000,
  });
}

/**
 * Show an info toast
 */
export function showInfo(message: string, description?: string) {
  toast.info(message, {
    description,
    duration: 4000,
  });
}

/**
 * Show a loading toast that can be updated
 */
export function showLoading(message: string) {
  return toast.loading(message);
}

/**
 * Dismiss a toast by ID
 */
export function dismissToast(toastId: string | number) {
  toast.dismiss(toastId);
}
