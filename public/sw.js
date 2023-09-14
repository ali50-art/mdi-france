if (!self.define) {
  let e,
    s = {}
  const i = (i, a) => (
    (i = new URL(i + '.js', a).href),
    s[i] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = i), (e.onload = s), document.head.appendChild(e)
        } else (e = i), importScripts(i), s()
      }).then(() => {
        let e = s[i]
        if (!e) throw new Error(`Module ${i} didn’t register its module`)

        return e
      })
  )
  self.define = (a, n) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[c]) return
    let t = {}
    const r = e => i(e, c),
      d = { module: { uri: c }, exports: t, require: r }
    s[c] = Promise.all(a.map(e => d[e] || r(e))).then(e => (n(...e), t))
  }
}
define(['./workbox-7c2a5a06'], function (e) {
  'use strict'
  importScripts(),
    self.addEventListener('message', e => {
      e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
    }),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/3dvamd1xSi6CODlRUr9ik/_buildManifest.js', revision: 'b3cb901f12f3545db3d024f0c36532bf' },
        { url: '/_next/static/3dvamd1xSi6CODlRUr9ik/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/216-047dc76bb0287cdb.js', revision: '047dc76bb0287cdb' },
        { url: '/_next/static/chunks/229.a52521ac48ec5c68.js', revision: 'a52521ac48ec5c68' },
        { url: '/_next/static/chunks/323-4208d59cd764101e.js', revision: '4208d59cd764101e' },
        { url: '/_next/static/chunks/494-5fcc608a1b305103.js', revision: '5fcc608a1b305103' },
        { url: '/_next/static/chunks/636.5555b5682751b0bb.js', revision: '5555b5682751b0bb' },
        { url: '/_next/static/chunks/639-0c8b9ee1fdd72871.js', revision: '0c8b9ee1fdd72871' },
        { url: '/_next/static/chunks/657-398adbac975c5143.js', revision: '398adbac975c5143' },
        { url: '/_next/static/chunks/70cfe1b1.1b45601286fc6459.js', revision: '1b45601286fc6459' },
        { url: '/_next/static/chunks/72a30a16.ea874e4c904b6716.js', revision: 'ea874e4c904b6716' },
        { url: '/_next/static/chunks/789-94891f35f7832836.js', revision: '94891f35f7832836' },
        { url: '/_next/static/chunks/792-2f49e75e6d52f330.js', revision: '2f49e75e6d52f330' },
        { url: '/_next/static/chunks/80-176dd8a929e995ef.js', revision: '176dd8a929e995ef' },
        { url: '/_next/static/chunks/856.72ca03801db3f74a.js', revision: '72ca03801db3f74a' },
        { url: '/_next/static/chunks/903-288f8eb118732ef9.js', revision: '288f8eb118732ef9' },
        { url: '/_next/static/chunks/91-389b542036ed84a7.js', revision: '389b542036ed84a7' },
        { url: '/_next/static/chunks/924-de19ad4bfcbf3f26.js', revision: 'de19ad4bfcbf3f26' },
        { url: '/_next/static/chunks/ad7f724d.d4b95899d7449235.js', revision: 'd4b95899d7449235' },
        { url: '/_next/static/chunks/e78312c5-5404fa05d2113c12.js', revision: '5404fa05d2113c12' },
        { url: '/_next/static/chunks/framework-ff0cb1de24dfef7d.js', revision: 'ff0cb1de24dfef7d' },
        { url: '/_next/static/chunks/main-158c87e2d5434753.js', revision: '158c87e2d5434753' },
        { url: '/_next/static/chunks/pages/401-3472b4d2439fe35a.js', revision: '3472b4d2439fe35a' },
        { url: '/_next/static/chunks/pages/404-528b6711fde21f4b.js', revision: '528b6711fde21f4b' },
        { url: '/_next/static/chunks/pages/500-21889b59625ca695.js', revision: '21889b59625ca695' },
        { url: '/_next/static/chunks/pages/_app-7cecb1c888720275.js', revision: '7cecb1c888720275' },
        { url: '/_next/static/chunks/pages/_error-3f6d1c55bb8051ab.js', revision: '3f6d1c55bb8051ab' },
        { url: '/_next/static/chunks/pages/admin-installateur-78e996c726903314.js', revision: '78e996c726903314' },
        {
          url: '/_next/static/chunks/pages/admin-logistique/inprogress-34b916cb3a34d88f.js',
          revision: '34b916cb3a34d88f'
        },
        { url: '/_next/static/chunks/pages/admin-logistique/retour-5bc6e566320c007d.js', revision: '5bc6e566320c007d' },
        { url: '/_next/static/chunks/pages/constructeur-21683fd037d9fa19.js', revision: '21683fd037d9fa19' },
        { url: '/_next/static/chunks/pages/index-767919b05e7d83bf.js', revision: '767919b05e7d83bf' },
        { url: '/_next/static/chunks/pages/installateur-dahsboard-1ab056cf4c2ad382.js', revision: '1ab056cf4c2ad382' },
        { url: '/_next/static/chunks/pages/login-d394537bef321d0b.js', revision: 'd394537bef321d0b' },
        { url: '/_next/static/chunks/pages/logistique/inProgress-353a49e33f7dbf2b.js', revision: '353a49e33f7dbf2b' },
        {
          url: '/_next/static/chunks/pages/logistique/inProgress/%5Bslug%5D-bb4c076d24c46697.js',
          revision: 'bb4c076d24c46697'
        },
        { url: '/_next/static/chunks/pages/logistique/retour-ba35bc259338babf.js', revision: 'ba35bc259338babf' },
        {
          url: '/_next/static/chunks/pages/logistique/retour/%5Bslug%5D-297310a35ad3d5d7.js',
          revision: '297310a35ad3d5d7'
        },
        { url: '/_next/static/chunks/pages/material-30946a1fbb4f65bb.js', revision: '30946a1fbb4f65bb' },
        { url: '/_next/static/chunks/pages/orderDetails-eb339f229fd39773.js', revision: 'eb339f229fd39773' },
        { url: '/_next/static/chunks/pages/suivi-chantier-5110f3fcc7e4d850.js', revision: '5110f3fcc7e4d850' },
        {
          url: '/_next/static/chunks/pages/suivi-chantier/%5Bslug%5D-d5c1dc2f3ebce84b.js',
          revision: 'd5c1dc2f3ebce84b'
        },
        { url: '/_next/static/chunks/pages/users-ba344ec7587cae73.js', revision: 'ba344ec7587cae73' },
        { url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js', revision: '837c0df77fd5009c9e46d446188ecfd0' },
        { url: '/_next/static/chunks/webpack-2f5bec044732a353.js', revision: '2f5bec044732a353' },
        { url: '/_next/static/css/00907eb975caaf69.css', revision: '00907eb975caaf69' },
        { url: '/_next/static/css/30fd6dae99bf48e4.css', revision: '30fd6dae99bf48e4' },
        { url: '/icon-192x192.png', revision: '7abbd1b14a59608a02059211103a5f86' },
        { url: '/icon-256x256.png', revision: '4f0cc839b7acb7bbb84eb9e7e648ff03' },
        { url: '/icon-384x384.png', revision: 'bbdf45730d665b9e1d62bda4aa9692ee' },
        { url: '/icon-512x512.png', revision: '09f516b885f33bf3292bb73c6bdbea38' },
        { url: '/images/apple-touch-icon - Copie.png', revision: 'abead32a69df75255c09d10aea3d0058' },
        { url: '/images/apple-touch-icon.png', revision: 'b0fa10c006167d84b4be8e1531adf7db' },
        { url: '/images/avatars/1.png', revision: '9bf9f227ddc04e24ee3398ddf2421062' },
        { url: '/images/favicon.png', revision: '29f03b97f1445fdfbc36c3286472dea7' },
        { url: '/images/logo.png', revision: 'f1788502ee41e186911976cf82be16f9' },
        { url: '/images/logo.svg', revision: '25ffd4c66ece1eb6c6d3a30c5c096edc' },
        { url: '/images/pages/401.png', revision: 'f7847f22aee813bd9e89236f72731ae2' },
        { url: '/images/pages/404.png', revision: '41e4888eb8aecf78f7a68609bb10c677' },
        {
          url: '/images/pages/auth-v2-forgot-password-illustration-dark.png',
          revision: '4903dec7a0f245852b42d271e8cea0f2'
        },
        {
          url: '/images/pages/auth-v2-forgot-password-illustration-light.png',
          revision: 'f5b7a1ce5b33c484f8bdf3eebb03a893'
        },
        {
          url: '/images/pages/auth-v2-login-illustration-bordered-dark.png',
          revision: '708b29d98b7c0fb22c43fe110d30711a'
        },
        {
          url: '/images/pages/auth-v2-login-illustration-bordered-light.png',
          revision: '584425a932091c2bbc06f77b630ee327'
        },
        { url: '/images/pages/auth-v2-login-illustration-dark.png', revision: '146accc9b8bc10cd2c56f28b58da0992' },
        { url: '/images/pages/auth-v2-login-illustration-light.png', revision: '827ebd7ac2eb65ea9a3d85490b77288c' },
        { url: '/images/pages/auth-v2-mask-dark.png', revision: '5aa3aab68f21ae85493957d2d84d84c9' },
        { url: '/images/pages/auth-v2-mask-light.png', revision: '5919d6e95af34ba3ab8e2cf179ebfe0d' },
        {
          url: '/images/pages/auth-v2-register-illustration-bordered-dark.png',
          revision: '3ba4f5c1b6d3ca934bda90bc688444b0'
        },
        {
          url: '/images/pages/auth-v2-register-illustration-bordered-light.png',
          revision: '90d4d411a7349dbf08461c93738e7072'
        },
        { url: '/images/pages/auth-v2-register-illustration-dark.png', revision: 'd717fcf636b650e9a6ad26107125f175' },
        { url: '/images/pages/auth-v2-register-illustration-light.png', revision: 'd26bda98cca6281e5497792977976ec3' },
        { url: '/images/pages/misc-mask-dark.png', revision: '4573139fc226684bf7af479fd371e672' },
        { url: '/images/pages/misc-mask-light.png', revision: '0d953103d6c7245c6002ed9d73b621ba' },
        { url: '/manifest.json', revision: 'c96a59ffc87f044ce9b3746b60d32fc7' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/thirteen.svg', revision: '53f96b8290673ef9d2895908e69b2f92' },
        { url: '/vercel copy.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
        { url: '/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: i, state: a }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s
          }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname

        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1

        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })]
      }),
      'GET'
    )
})
