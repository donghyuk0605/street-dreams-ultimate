import React, { useState } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function ImageWithSkeleton({ className, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn("relative", className)}>
      {!loaded && <Skeleton className="absolute inset-0" />}
      <Image
        {...props}
        className={cn(!loaded && "invisible", props.className)}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  )
}
