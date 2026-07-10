import './globals.css';

export const metadata = {
  title: 'CareerBridge AI',
  description: 'AI-Powered Career Intelligence',
  icons: {
    icon: '/icon.png',
  },
};

import { AuthProvider } from '../src/context/AuthContext';
import { UserProvider } from '../src/context/UserContext';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-300 font-sans flex flex-col">
        <AuthProvider>
          <UserProvider>
            {children}
            <Toaster position="top-right" toastOptions={{ style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
