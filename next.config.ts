import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/assets/Vylera_Labs_Company_Profile_2026.pdf",
          destination: "/api/company-profile"
        },
        {
          source: "/assets/COMPROWEB%20Vylera%20Labs%20Indonesia%20-%20AI%20Enterprise%20Solutions%20-%202026.pdf",
          destination: "/api/company-profile"
        }
      ]
    };
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }, // Prevent click-jacking
          { key: "X-Content-Type-Options", value: "nosniff" }, // Prevent MIME-sniffing
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ],
      }
    ];
  }
};

export default withNextIntl(nextConfig);
