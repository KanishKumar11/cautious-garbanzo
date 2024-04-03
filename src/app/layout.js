import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat({
  subsets: ["latin"],
  // weight: [, "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "EdgeAi | Ai Calling Bot",
  description: "The most powerfull Ai powered calling bot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} `}>{children}</body>
    </html>
  );
}
