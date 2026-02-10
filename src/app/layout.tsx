import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frontend Developer Portfolio',
  description:
    'Portfolio of a Frontend Developer specializing in React, TypeScript, and real-time systems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
