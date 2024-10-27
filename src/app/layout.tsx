import { GetServerSideProps } from "next";
import { UserAgentProvider } from "../components/providers/userAgentProvider";
import "./globals.css";
import { Layout } from "@/components/layout";
import { headers } from 'next/headers'
import { Providers } from "@/components/providers";
const RootLayout: React.FC<{ children: React.ReactNode }> = async({ children }) => {
  const headersList = await headers()
  //Fix: User agents
  const userAgent = headersList.get('user-agent') || undefined;
  return (
    <html lang="en">
      <body>
        <Providers userAgent={userAgent}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};



export default RootLayout;
