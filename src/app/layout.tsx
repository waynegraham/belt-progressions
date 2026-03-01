import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoArrowUpRight } from "react-icons/go";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BJJ Belt Progressions",
  description: "Track moves, test your recall, and prepare for belt promotion.",
  icons: {
    icon: "/gracie.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = saved === "dark" || saved === "light" ? saved : system;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <footer className="mb-16 px-4 md:px-8">
          <div className="mx-auto max-w-4xl">
            <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
              <li>
                <a className="inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://github.com/waynegraham">
                  github
                  <GoArrowUpRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://github.com/waynegraham/belt-progressions/">
                  view sourcecode
                  <GoArrowUpRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://github.com/waynegraham/belt-progressions/LICENSE">
                  mit license
                  <GoArrowUpRight aria-hidden="true" />
                </a>
              </li>
            </ul>

            <p className="mt-8 text-neutral-600 dark:text-neutral-300">&copy; {new Date().getFullYear()} <a href="https://waynegraham.github.io">Wayne Graham</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
