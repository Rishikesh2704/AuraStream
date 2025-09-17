import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"cdn.noitatnemucod.net",
        port:'',
        pathname:'/thumbnail/**',
        search:'',
      },
      {
        protocol:'https',
        hostname:"tenor.com",
        port:'',
        pathname:'/view/**',
        search:'',
      },
      {
        protocol:'https',
        hostname:"cdn.myanimelist.net",
        port:'',
        pathname:'/images/anime/**',
        search:'',
      },
    ]
  }
};

export default nextConfig;
