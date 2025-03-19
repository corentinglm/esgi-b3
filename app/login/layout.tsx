import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
