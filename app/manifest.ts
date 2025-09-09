import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mitra - Digital Mental Health Support",
    short_name: "Mitra",
    description: "Comprehensive digital platform providing mental health support and resources for college students",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF3E0",
    theme_color: "#A8C3A0",
    orientation: "portrait-primary",
    categories: ["health", "medical", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any"
      }
    ]
  }
}
