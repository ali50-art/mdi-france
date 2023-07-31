/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const withFonts = require('next-fonts')
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  skipWaiting: false
})

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

const config = withPWA({
  trailingSlash: true,
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
})
module.exports = withFonts(config)
