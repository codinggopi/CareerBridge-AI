import './globals.css';

export const metadata = {
  title: 'CareerBridge AI',
  description: 'AI-Powered Career Intelligence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-300 font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
