"use client"

export function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center text-white py-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-7xl mx-auto px-4 text-center space-y-4">
        <p className="text-3xl font-bebas tracking-widest drop-shadow">
          Street Dreams Ultimate
        </p>
        <p className="text-sm">© 2025 Street Dreams. All rights reserved.</p>
      </div>
    </footer>
  )
}
