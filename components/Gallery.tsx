"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1506224774225-3c1de4d7ae7d?auto=format&fit=crop&w=1350&q=80",
]

export function Gallery() {
  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i} className="relative h-72">
                <img
                  src={src}
                  alt="gallery image"
                  className="object-cover rounded-lg w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
