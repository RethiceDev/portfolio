import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Bosco Rethice | Développeur Full Stack",
  description: "Portfolio de Bosco Rethice Akouedegnidje, développeur Full Stack Laravel & React au Bénin.",
};
export default function RootLayout({ children }) {
  return (<html lang="fr"><body className={inter.className}>{children}</body></html>);
}
