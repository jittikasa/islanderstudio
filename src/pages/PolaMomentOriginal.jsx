import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, Apple } from 'lucide-react'

const PrivacyLockIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
    <rect x="20" y="30" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 30 L24 22 C24 17.6 27.6 14 32 14 C36.4 14 40 17.6 40 22 L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="40" r="3" fill="currentColor"/>
    <path d="M32 43 L32 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function PolaMomentOriginal() {
  const scrollToSection = (id) => (e) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5] text-stone-800 selection:bg-pola-red selection:text-white pt-20">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pola-red rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-300 rounded-full blur-[120px] opacity-30"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 border border-pola-red text-pola-red text-xs tracking-[0.25em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/50 shadow-sm">
            iOS • Camera App
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900">
            PolaMoment<span className="text-pola-red text-6xl md:text-8xl lg:text-[8rem]">.</span>
          </h1>
          <p className="font-serif italic text-2xl md:text-4xl text-stone-600 mb-6">
            Capture the Magic
          </p>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Transform your iPhone into a vintage Polaroid camera. Create instant memories with that iconic retro aesthetic we all love.
          </p>

          {/* Camera Visual with Polaroid Animation */}
          <div className="max-w-md mx-auto mb-12 relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <img src="/polamoment/Cam.svg" alt="PolaMoment Camera" className="w-full h-auto relative z-0" />

            {/* Animated Polaroids */}
            <div className="absolute top-[15%] left-1/2 -translate-x-[45%] w-[42%] pointer-events-none z-50">
              {/* Polaroid 1 - Christmas Gifts */}
              <div className="absolute w-full animate-polaroid-eject" style={{ animationDelay: '2s' }}>
                <div className="bg-white p-3 shadow-2xl" style={{ borderRadius: '2px' }}>
                  {/* Photo area */}
                  <div className="aspect-square mb-3 relative overflow-hidden border border-gray-100">
                    <img src="/polamoment/Image-1.jpeg" alt="" className="w-full h-full object-cover" />
                    {/* Vintage overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  </div>
                  {/* Bottom white space (characteristic of Polaroids) */}
                  <div className="h-10"></div>
                </div>
              </div>

              {/* Polaroid 2 - Food Platter */}
              <div className="absolute w-full animate-polaroid-eject" style={{ animationDelay: '3.5s' }}>
                <div className="bg-white p-3 shadow-2xl" style={{ borderRadius: '2px' }}>
                  {/* Photo area */}
                  <div className="aspect-square mb-3 relative overflow-hidden border border-gray-100">
                    <img src="/polamoment/Image-2.jpeg" alt="" className="w-full h-full object-cover" />
                    {/* Vintage overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  </div>
                  {/* Bottom white space */}
                  <div className="h-10"></div>
                </div>
              </div>

              {/* Polaroid 3 - Black Cat */}
              <div className="absolute w-full animate-polaroid-eject" style={{ animationDelay: '5s' }}>
                <div className="bg-white p-3 shadow-2xl" style={{ borderRadius: '2px' }}>
                  {/* Photo area */}
                  <div className="aspect-square mb-3 relative overflow-hidden border border-gray-100">
                    <img src="/polamoment/Image-3.jpeg" alt="" className="w-full h-full object-cover" />
                    {/* Vintage overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  </div>
                  {/* Bottom white space */}
                  <div className="h-10"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <a href="#story" onClick={scrollToSection('story')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
              <span className="tracking-wider">EXPLORE</span>
              <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 group-hover:bg-white transition-all bg-white/50">
                <ArrowDown size={16} />
              </span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* The Story Section */}
        <section id="story" className="py-24 bg-pola-cream border-t border-stone-200">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">The Story</div>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Nostalgia Meets Technology</h2>
                <div className="w-16 h-1 bg-pola-red mb-6 animate-slide-in" style={{ animationDelay: '0.3s' }}></div>
                <div className="text-lg text-stone-600 leading-relaxed space-y-4">
                  <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-pola-red">R</span>emember the excitement of shaking a fresh Polaroid and watching your memory slowly appear? That magic feeling of instant photography is now at your fingertips.
                  </p>
                  <p className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    PolaMoment<span className="text-pola-red font-bold">.</span> brings back the charm of vintage Polaroid cameras to your iPhone. Create authentic-looking instant photos with that distinctive white border, warm tones, and slightly faded aesthetic that made Polaroids so iconic.
                  </p>
                  <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Whether you're capturing moments with friends, documenting your travels, or just expressing your creativity, PolaMoment<span className="text-pola-red font-bold">.</span> makes every photo feel special.
                  </p>
                </div>

                {/* Features Highlights */}
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3 animate-fade-in-up hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: '0.7s' }}>
                    <div className="w-5 h-5 rounded-full bg-pola-red/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-pola-red animate-pulse"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">Vintage Filters</h4>
                      <p className="text-sm text-stone-600">Authentic retro effects that transform your photos instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 animate-fade-in-up hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: '0.8s' }}>
                    <div className="w-5 h-5 rounded-full bg-pola-red/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-pola-red animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-900 mb-1">No Subscriptions</h4>
                      <p className="text-sm text-stone-600">One-time purchase, unlimited memories forever</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
                {/* Multiple Polaroid Stack Effect */}
                <div className="relative">
                  <div className="absolute top-0 left-4 w-full h-full bg-white shadow-xl rounded-sm transform rotate-3 opacity-50 transition-all duration-500 hover:rotate-6"></div>
                  <div className="absolute top-2 left-2 w-full h-full bg-white shadow-xl rounded-sm transform -rotate-2 opacity-70 transition-all duration-500 hover:-rotate-4"></div>
                  <div className="relative bg-white p-5 shadow-2xl rounded-sm transform hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-pola-cream via-stone-100 to-stone-200 rounded-sm mb-5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pola-red/10 to-transparent"></div>
                      <img src="/polamoment/Icon-1024.png" alt="PolaMoment" className="w-40 h-40 object-contain z-10 transition-transform duration-500 hover:scale-110" />
                    </div>
                    <div className="h-20 flex items-center justify-center">
                      <p className="font-serif italic text-stone-600">Timeless memories, one click away</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Highlight */}
        <section className="py-24 bg-stone-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-pola-red transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <PrivacyLockIcon />
              </div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Your Privacy Matters</h2>
            <p className="max-w-3xl mx-auto text-xl text-stone-300 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              We don't collect, store, or share any of your data. All photos stay on your device. No cloud storage, no analytics, no tracking. Just you and your memories.
            </p>
            <Link
              to="/privacy"
              className="inline-block px-8 py-3 bg-white text-stone-900 rounded-full hover:bg-pola-red hover:text-white transition-all duration-300 font-medium hover:scale-105 transform animate-fade-in-up shadow-lg hover:shadow-xl"
              style={{ animationDelay: '0.5s' }}
            >
              Read Privacy Policy
            </Link>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-block mb-6 px-4 py-2 border border-pola-red text-pola-red text-xs tracking-[0.25em] uppercase font-bold rounded-full bg-pola-red/5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Available on iOS
            </div>
            <h2 className="font-serif text-4xl md:text-6xl mb-6 text-stone-900 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Start Creating Today</h2>
            <p className="max-w-2xl mx-auto text-xl text-stone-600 mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Download PolaMoment<span className="text-pola-red font-bold">.</span> and start capturing vintage-style Polaroid photos on your iPhone right away.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-10 py-5 bg-pola-black text-white rounded-full hover:bg-pola-red transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-110 text-lg font-medium animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <Apple size={28} className="animate-pulse" />
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </a>

            <p className="mt-8 text-sm text-stone-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Requires iOS 14.0 or later • Compatible with iPhone
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
