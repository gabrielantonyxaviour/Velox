'use client';

import { useState, useRef } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { SimpleConfirmDialog, SimpleTransactionDetails } from '@/app/components/ui/simple-confirm-dialog';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { registerSolver, registerSolverNative } from './solver-transactions';
import {
  uploadImageToIPFS,
  uploadMetadataToIPFS,
  storeSolverMetadata,
  type SolverMetadata,
} from '@/app/lib/solver-metadata';
import { decodeVeloxError } from '@/app/lib/velox/error-decoder';
import {
  Loader2,
  UserPlus,
  AlertCircle,
  Upload,
  X,
  Globe,
  Twitter,
  MessageCircle,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';

interface RegisterSolverCardProps {
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  description: string;
  operatorWallet: string;
  website: string;
  twitter: string;
  discord: string;
  stake: string;
}

export function RegisterSolverCard({ onSuccess }: RegisterSolverCardProps) {
  const { walletAddress, isPrivy, signRawHash, publicKeyHex, signAndSubmitTransaction, signTransaction } =
    useWalletContext();
  const { solver, isLoading: isLoadingSolver } = useSolverInfo(walletAddress || null);

  const [formData, setFormData] = useState<FormData>({
    name: 'Velox Demo Solver',
    description: 'A high-performance solver optimized for intent-based trading on Movement Network. Specializing in optimal execution and quick settlement.',
    operatorWallet: '0xe180d922cd11329f6a980ba19804b07254ca0b989d3c3e6713cd62a51bb53c88',
    website: 'https://velox.dev',
    twitter: '@velox_solver',
    discord: 'discord.gg/velox',
    stake: '1',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<'form' | 'uploading' | 'registering'>('form');

  // Confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmDetails, setConfirmDetails] = useState<SimpleTransactionDetails | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoadingSolver) return null;
  if (solver) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValidAddress = (addr: string) => {
    return /^0x[a-fA-F0-9]{64}$/.test(addr);
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.description.trim().length >= 10 &&
      isValidAddress(formData.operatorWallet) &&
      parseFloat(formData.stake) >= 1 &&
      imageFile !== null
    );
  };

  const handleRegisterClick = () => {
    if (!isFormValid()) return;

    setConfirmDetails({
      title: 'Register as Solver',
      description: 'Confirm registration to become a Velox solver.',
      items: [
        { label: 'Solver Name', value: formData.name.trim() },
        { label: 'Stake Amount', value: `${formData.stake} MOVE` },
        { label: 'Initial Reputation', value: '50%' },
      ],
      warningMessage: 'You will have a 7-day unstaking cooldown period.',
    });
    setConfirmOpen(true);
  };

  const handleCancelConfirm = () => {
    setConfirmOpen(false);
  };

  const handleConfirmRegister = async () => {
    if (!walletAddress || !isFormValid()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Step 1: Upload image to IPFS
      setStep('uploading');
      setUploadingImage(true);

      const imageResult = await uploadImageToIPFS(imageFile!);
      if (!imageResult.success || !imageResult.url) {
        throw new Error(imageResult.error || 'Failed to upload image');
      }

      setUploadingImage(false);

      // Step 2: Create and upload metadata
      const metadata: Omit<SolverMetadata, 'createdAt'> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        imageUrl: imageResult.url,
        operatorWallet: formData.operatorWallet,
        website: formData.website.trim() || undefined,
        twitter: formData.twitter.trim() || undefined,
        discord: formData.discord.trim() || undefined,
      };

      const metadataResult = await uploadMetadataToIPFS({
        ...metadata,
        createdAt: Date.now(),
      });

      if (metadataResult.success && metadataResult.url) {
        metadata.metadataUri = metadataResult.url;
      }

      // Step 3: Register on-chain
      setStep('registering');
      const stakeAmount = BigInt(Math.floor(parseFloat(formData.stake) * 1e8));
      const metadataUri = metadata.metadataUri || metadataResult.url || '';

      if (!metadataUri) {
        throw new Error('Metadata URI not available');
      }

      if (isPrivy && signRawHash && publicKeyHex) {
        await registerSolver(walletAddress, stakeAmount, metadataUri, signRawHash, publicKeyHex);
      } else if (signTransaction && signAndSubmitTransaction) {
        await registerSolverNative(walletAddress, stakeAmount, metadataUri, signTransaction, signAndSubmitTransaction);
      } else {
        throw new Error('No wallet connected');
      }

      // Step 4: Store metadata locally
      storeSolverMetadata(walletAddress, metadata);

      setSuccess(true);
      setStep('form');
      setConfirmOpen(false);
      onSuccess?.();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to register';
      const decodedError = decodeVeloxError(errorMsg);
      setError(decodedError);
      setStep('form');
      console.error('[RegisterSolver] Error:', errorMsg, 'Decoded:', decodedError);
    } finally {
      setIsLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Become a Solver</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Register as a solver to start fulfilling intents and earning rewards.
      </p>

      <div className="space-y-4">
        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Profile Image *</Label>
          <div className="flex items-center gap-4">
            {imagePreview ? (
              <div className="relative w-20 h-20">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="rounded-lg object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full"
                  disabled={isLoading}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center hover:border-primary/50 transition-colors"
                disabled={isLoading}
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Upload</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <div className="text-xs text-muted-foreground">
              <p>JPG, PNG, or GIF</p>
              <p>Max 5MB</p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Solver Name *</Label>
          <Input
            id="name"
            placeholder="My Solver"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your solver strategy and capabilities..."
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            disabled={isLoading}
            rows={3}
          />
        </div>

        {/* Operator Wallet */}
        <div className="space-y-2">
          <Label htmlFor="operatorWallet" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Solver Operator Wallet *
          </Label>
          <Input
            id="operatorWallet"
            placeholder="0x..."
            value={formData.operatorWallet}
            onChange={(e) => updateField('operatorWallet', e.target.value)}
            disabled={isLoading}
            className={
              formData.operatorWallet && !isValidAddress(formData.operatorWallet)
                ? 'border-destructive'
                : ''
            }
          />
          <p className="text-xs text-muted-foreground">
            The wallet address that will run your solver bot (can be different from your
            browser wallet)
          </p>
        </div>

        {/* Optional Social Links */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Optional Links</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Website"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                disabled={isLoading}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Twitter"
                value={formData.twitter}
                onChange={(e) => updateField('twitter', e.target.value)}
                disabled={isLoading}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Discord"
                value={formData.discord}
                onChange={(e) => updateField('discord', e.target.value)}
                disabled={isLoading}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Stake Amount */}
        <div className="space-y-2">
          <Label htmlFor="stake">Stake Amount (MOVE) *</Label>
          <Input
            id="stake"
            type="number"
            min="1"
            step="1"
            value={formData.stake}
            onChange={(e) => updateField('stake', e.target.value)}
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Minimum stake: 1 MOVE (100,000,000 units)
          </p>
        </div>

        {/* Requirements Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary">Requirements</p>
              <ul className="text-muted-foreground list-disc list-inside mt-1">
                <li>Minimum stake: 1 MOVE</li>
                <li>Initial reputation: 50%</li>
                <li>7-day unstaking cooldown</li>
              </ul>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary">Successfully registered as a solver!</p>
          </div>
        )}

        <Button
          onClick={handleRegisterClick}
          disabled={isLoading || !isFormValid()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {step === 'uploading'
                ? uploadingImage
                  ? 'Uploading Image...'
                  : 'Uploading Metadata...'
                : 'Registering...'}
            </>
          ) : (
            'Register as Solver'
          )}
        </Button>
      </div>

      <SimpleConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        details={confirmDetails}
        onConfirm={handleConfirmRegister}
        onCancel={handleCancelConfirm}
        isLoading={isLoading}
        confirmText="Register"
      />
    </Card>
  );
}
