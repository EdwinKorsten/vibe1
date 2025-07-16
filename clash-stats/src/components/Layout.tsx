import { ReactNode } from 'react';
import Link from 'next/link';
import { Search, Home, Users, Trophy, Shield } from 'lucide-react';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg border-b-4 border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
                <img 
                  src="/images/logo.svg" 
                  alt="ClashStats Logo" 
                  className="h-12 w-auto drop-shadow-lg"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:text-yellow-300 hover:bg-blue-600 transition-all duration-200 transform hover:scale-105">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link href="/rankings" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold text-white hover:text-yellow-300 hover:bg-blue-600 transition-all duration-200 transform hover:scale-105">
                <Trophy className="h-5 w-5" />
                <span>Rankings</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero background section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(/images/hero-bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <main className="relative max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo.svg" 
                alt="ClashStats Logo" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold">ClashStats</span>
            </div>
            <div className="flex items-center space-x-6">
              <img 
                src="/images/trophy-icon.svg" 
                alt="Trophy" 
                className="h-8 w-8 opacity-60"
              />
              <img 
                src="/images/shield-icon.svg" 
                alt="Shield" 
                className="h-8 w-8 opacity-60"
              />
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-blue-200">
            <p>Track your Clash of Clans stats and compete with players worldwide!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}