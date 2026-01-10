// Solver metadata types and localStorage storage
// The contract doesn't store metadata URIs, so we use local storage + IPFS

export interface SolverMetadata {
  name: string;
  description: string;
  imageUrl: string; // IPFS URL
  operatorWallet: string; // The wallet that runs the solver (different from browser wallet)
  website?: string;
  twitter?: string;
  discord?: string;
  createdAt: number;
  metadataUri?: string; // Full IPFS metadata URI
}

const SOLVER_METADATA_KEY = 'velox_solver_metadata';

type SolverMetadataStorage = Record<string, SolverMetadata>;

function getStorage(): SolverMetadataStorage {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(SOLVER_METADATA_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveStorage(storage: SolverMetadataStorage): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SOLVER_METADATA_KEY, JSON.stringify(storage));
  } catch {
    console.warn('[Velox] Failed to save solver metadata storage');
  }
}

/**
 * Store solver metadata after successful registration
 */
export function storeSolverMetadata(
  registrationWallet: string,
  metadata: Omit<SolverMetadata, 'createdAt'>
): void {
  const storage = getStorage();
  storage[registrationWallet.toLowerCase()] = {
    ...metadata,
    createdAt: Date.now(),
  };
  saveStorage(storage);
  console.log('[Velox] Stored solver metadata for:', registrationWallet);
}

/**
 * Get solver metadata by registration wallet address
 */
export function getSolverMetadata(registrationWallet: string): SolverMetadata | null {
  const storage = getStorage();
  return storage[registrationWallet.toLowerCase()] || null;
}

/**
 * Get all stored solver metadata
 */
export function getAllSolverMetadata(): SolverMetadataStorage {
  return getStorage();
}

/**
 * Update solver metadata
 */
export function updateSolverMetadata(
  registrationWallet: string,
  updates: Partial<SolverMetadata>
): void {
  const storage = getStorage();
  const existing = storage[registrationWallet.toLowerCase()];
  if (existing) {
    storage[registrationWallet.toLowerCase()] = { ...existing, ...updates };
    saveStorage(storage);
  }
}

/**
 * Remove solver metadata
 */
export function removeSolverMetadata(registrationWallet: string): void {
  const storage = getStorage();
  delete storage[registrationWallet.toLowerCase()];
  saveStorage(storage);
}

/**
 * Upload image to Pinata IPFS
 */
export async function uploadImageToIPFS(file: File): Promise<{
  success: boolean;
  ipfsHash?: string;
  url?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/pinata/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return { success: false, error: result.error || 'Upload failed' };
    }

    return {
      success: true,
      ipfsHash: result.ipfsHash,
      url: result.url,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload solver metadata JSON to Pinata IPFS
 */
export async function uploadMetadataToIPFS(metadata: SolverMetadata): Promise<{
  success: boolean;
  ipfsHash?: string;
  url?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append('metadata', JSON.stringify(metadata));

    const response = await fetch('/api/pinata/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return { success: false, error: result.error || 'Upload failed' };
    }

    return {
      success: true,
      ipfsHash: result.ipfsHash,
      url: result.url,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}
