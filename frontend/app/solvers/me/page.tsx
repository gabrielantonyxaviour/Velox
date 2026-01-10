'use client';

import dynamic from 'next/dynamic';

// Dynamically import to avoid hook issues and enable context providers
const MySolverPageWrapper = dynamic(() => import('../components/my-solver-page-wrapper'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  ),
});

export default function MySolverPage() {
  return <MySolverPageWrapper />;
}
