"use client"

export function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center text-white py-16"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1664304634915-36c858c860bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Zm9vdGJhbGwlMjBzdGFkaXVtJTIwbmlnaHR8ZW58MHx8fHwxNzQ5ODgyNzkwfDA&ixlib=rb-4.1.0&q=80&w=1080')",
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
