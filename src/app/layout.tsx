import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nick Nikolaenko - Frontend Developer',
  description:
    'Portfolio of Nick Nikolaenko - Frontend Developer specializing in React, TypeScript, and real-time systems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
