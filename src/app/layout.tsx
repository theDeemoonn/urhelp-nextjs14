import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.scss";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-providers";
import { Toaster } from "@/components/ui/toaster";
import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Юридическая помощь",
  description: "Назначай цену которая тебя устраивает",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body
      
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HeaderComponent />

            {children}
            <FooterComponent />
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
