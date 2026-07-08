import './globals.css';

export const metadata = {
  title: 'CareerBridge AI',
  description: 'AI-Powered Career Intelligence',
};

import { AuthProvider } from '../src/context/AuthContext';
import { UserProvider } from '../src/context/UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-300 font-sans flex flex-col">
        <AuthProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
