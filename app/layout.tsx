import type { Metadata } from 'next'
import '../styles/globals.css'


export const metadata: Metadata = {
    title: 'Exploring OpenAI and NextJS',
    description: 'Tragically basic demo app for exploring OpenAI using NextJS',
  };

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }