import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function Loading({ size = 'md', className, text }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      <div className={cn(
        'animate-spin rounded-full border-4 border-sage-200 border-t-sage-500',
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-forest-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

export function PageLoading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-sand-50 to-sage-50 flex items-center justify-center">
      <Loading size="lg" text={text} />
    </div>
  );
}