import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { ApolloProvider } from '@/providers/ApolloProvider';
import Navbar from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: 'Department Management System',
  description: 'Manage your organizational departments and sub-departments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ApolloProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </main>
              <footer className="bg-white border-t border-gray-200 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-sm text-gray-500">
                    Department Management System &copy; {new Date().getFullYear()}
                  </p>
                </div>
              </footer>
            </div>
          </ApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}