import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {SanityLive} from '@/sanity/lib/live'
import DisableDraftMode from '@/components/sanity/DisableDraftMode'
import PreviewRefresh from '@/components/sanity/PreviewRefresh'
import {siteDescription,siteUrl} from '@/lib/seo'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {default:'Morrow Studio',template:'%s — Morrow Studio'},
  description: siteDescription,
  metadataBase:siteUrl,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const {isEnabled} = await draftMode()
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
        {isEnabled && <><VisualEditing /><DisableDraftMode /><PreviewRefresh /></>}
      </body>
    </html>
  );
}
