import './globals.css';
import ClientProviders from '@/components/providers/ClientProviders';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'DriveFleet | Premium Car Rental & Fleet Platform',
  description:
    'Discover, book, and drive luxury sedans, electric sports cars, and rugged SUVs with transparent pricing and zero hidden fees.',
  keywords:
    'car rental, drivefleet, rent a car, luxury cars, electric vehicles, suv rental',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ClientProviders>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
