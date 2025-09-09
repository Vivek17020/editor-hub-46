import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function ArticleSkeleton() {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="aspect-[16/9] bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer" />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

function FeaturedArticleSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="aspect-[16/9] bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer relative">
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <div className="space-y-3 p-6">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-2/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

function ImageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-gradient-to-r from-muted via-muted/50 to-muted shimmer", className)} />
  )
}

export { Skeleton, ArticleSkeleton, FeaturedArticleSkeleton, ImageSkeleton }