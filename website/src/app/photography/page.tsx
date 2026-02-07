"use client"

import { PhotoGallery } from '@/components/photography-gallery'
import { FadeIn } from '@/components/magicui/fade-in'
import { useSidebar } from '@/contexts/sidebar-context'

const photos = [
  { src: '/photography/DSC01258.jpg', alt: 'Photo 1' },
  { src: '/photography/DSC01259.jpg', alt: 'Photo 2' },
  { src: '/photography/DSC01261.jpg', alt: 'Photo 3' },
  { src: '/photography/DSC01262.jpg', alt: 'Photo 4' },
  { src: '/photography/DSC01276.jpg', alt: 'Photo 5' },
  { src: '/photography/DSC01279.jpg', alt: 'Photo 6' },
  { src: '/photography/DSC01280.jpg', alt: 'Photo 7' },
  { src: '/photography/DSC01281.jpg', alt: 'Photo 8' },
  { src: '/photography/DSC01284.jpg', alt: 'Photo 9' },
  { src: '/photography/DSC01292.jpg', alt: 'Photo 10' },
  { src: '/photography/DSC01306.jpg', alt: 'Photo 11' },
  { src: '/photography/DSC01307.jpg', alt: 'Photo 12' },
  { src: '/photography/DSC01314.jpg', alt: 'Photo 13' },
  { src: '/photography/DSC01316.jpg', alt: 'Photo 14' },
  { src: '/photography/DSC01323.jpg', alt: 'Photo 15' },
  { src: '/photography/DSC01325.jpg', alt: 'Photo 16' },
  { src: '/photography/DSC01333.jpg', alt: 'Photo 17' },
  { src: '/photography/DSC01335.jpg', alt: 'Photo 18' },
  { src: '/photography/DSC01336.jpg', alt: 'Photo 19' },
  { src: '/photography/DSC01338.jpg', alt: 'Photo 20' },
  { src: '/photography/DSC01345.jpg', alt: 'Photo 21' },
  { src: '/photography/DSC01350.jpg', alt: 'Photo 22' },
  { src: '/photography/DSC01351.jpg', alt: 'Photo 23' },
  { src: '/photography/DSC01353.jpg', alt: 'Photo 24' },
  { src: '/photography/DSC01354.jpg', alt: 'Photo 25' },
  { src: '/photography/DSC01356.jpg', alt: 'Photo 26' },
  { src: '/photography/DSC01358.jpg', alt: 'Photo 27' },
  { src: '/photography/DSC01363.jpg', alt: 'Photo 28' },
  { src: '/photography/DSC01370.jpg', alt: 'Photo 29' },
  { src: '/photography/DSC01372.jpg', alt: 'Photo 30' },
  { src: '/photography/DSC01380.jpg', alt: 'Photo 31' },
  { src: '/photography/DSC01401.jpg', alt: 'Photo 32' },
  { src: '/photography/DSC01403.jpg', alt: 'Photo 33' },
  { src: '/photography/DSC01430.jpg', alt: 'Photo 34' },
  { src: '/photography/DSC01435.jpg', alt: 'Photo 35' },
  { src: '/photography/DSC01437.jpg', alt: 'Photo 36' },
  { src: '/photography/DSC01448.jpg', alt: 'Photo 37' },
  { src: '/photography/DSC01449.jpg', alt: 'Photo 38' },
  { src: '/photography/IMG_0456.jpg', alt: 'Photo 39' },
]

export default function PhotographyPage() {
  const { isOpen } = useSidebar()

  return (
    <div className={`min-h-screen bg-background transition-all duration-500 ease-in-out ${isOpen ? 'mr-[400px] md:mr-[500px]' : 'mr-0'}`}>
      <div className="pt-32 pb-20 px-6 md:px-10">
        <div className="container mx-auto max-w-7xl">
          <FadeIn delay={0.1} direction="down">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white"
              style={{ fontFamily: 'var(--font-source-code-pro)' }}
            >
              photography
            </h1>
          </FadeIn>

          <PhotoGallery photos={photos} />
        </div>
      </div>
    </div>
  )
}
