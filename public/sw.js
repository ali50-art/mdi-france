if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let r={};const t=e=>s(e,n),d={module:{uri:n},exports:r,require:t};a[n]=Promise.all(i.map((e=>d[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/031aa83e-7d82a9093131a73a.js",revision:"7d82a9093131a73a"},{url:"/_next/static/chunks/1494-2b1bc47dd99a8ae0.js",revision:"2b1bc47dd99a8ae0"},{url:"/_next/static/chunks/1903-4ea0b1f20f61e5e0.js",revision:"4ea0b1f20f61e5e0"},{url:"/_next/static/chunks/2216-c20567b17cc05552.js",revision:"c20567b17cc05552"},{url:"/_next/static/chunks/2657-31acf118ac93d396.js",revision:"31acf118ac93d396"},{url:"/_next/static/chunks/2898-796efe8b4fe7b781.js",revision:"796efe8b4fe7b781"},{url:"/_next/static/chunks/3845-78faa1c8093bb34a.js",revision:"78faa1c8093bb34a"},{url:"/_next/static/chunks/6154-6b73446113f5386b.js",revision:"6b73446113f5386b"},{url:"/_next/static/chunks/6323-e189d79d9ed52548.js",revision:"e189d79d9ed52548"},{url:"/_next/static/chunks/6330-a8cd42e44d7a8f5c.js",revision:"a8cd42e44d7a8f5c"},{url:"/_next/static/chunks/636.7d200d69a6813554.js",revision:"7d200d69a6813554"},{url:"/_next/static/chunks/6792-1383c90e77967c79.js",revision:"1383c90e77967c79"},{url:"/_next/static/chunks/6867-a5ae7de9fcc5602a.js",revision:"a5ae7de9fcc5602a"},{url:"/_next/static/chunks/70cfe1b1.a3cd2c0b1d50a1c2.js",revision:"a3cd2c0b1d50a1c2"},{url:"/_next/static/chunks/7229.61acbf8ec170ae16.js",revision:"61acbf8ec170ae16"},{url:"/_next/static/chunks/72a30a16.44f9b25e6b2ded83.js",revision:"44f9b25e6b2ded83"},{url:"/_next/static/chunks/7856.f4f7bf4692c5fed8.js",revision:"f4f7bf4692c5fed8"},{url:"/_next/static/chunks/9537-7471a01dbf28da02.js",revision:"7471a01dbf28da02"},{url:"/_next/static/chunks/9562-f7f26719f115cdba.js",revision:"f7f26719f115cdba"},{url:"/_next/static/chunks/9639-eefa53998454492c.js",revision:"eefa53998454492c"},{url:"/_next/static/chunks/ad7f724d.e3b820c9c158b1ca.js",revision:"e3b820c9c158b1ca"},{url:"/_next/static/chunks/e78312c5-1986dbcd61ab5bed.js",revision:"1986dbcd61ab5bed"},{url:"/_next/static/chunks/ee8b1517-4799127e3acc0262.js",revision:"4799127e3acc0262"},{url:"/_next/static/chunks/framework-06a91fef12f27585.js",revision:"06a91fef12f27585"},{url:"/_next/static/chunks/main-20bae27561643d7a.js",revision:"20bae27561643d7a"},{url:"/_next/static/chunks/pages/401-40c5c752e5b4e3af.js",revision:"40c5c752e5b4e3af"},{url:"/_next/static/chunks/pages/404-17f551a6ad16e10a.js",revision:"17f551a6ad16e10a"},{url:"/_next/static/chunks/pages/500-47f3e7dc72ef9f09.js",revision:"47f3e7dc72ef9f09"},{url:"/_next/static/chunks/pages/_app-fc0786628563e0b2.js",revision:"fc0786628563e0b2"},{url:"/_next/static/chunks/pages/_error-82b79221b9ed784b.js",revision:"82b79221b9ed784b"},{url:"/_next/static/chunks/pages/admin-instalateur-aa1bcefbf27b4835.js",revision:"aa1bcefbf27b4835"},{url:"/_next/static/chunks/pages/admin-logistique/inprogress-59e2eca56fb3cf7e.js",revision:"59e2eca56fb3cf7e"},{url:"/_next/static/chunks/pages/admin-logistique/retour-86c3eb6e59575630.js",revision:"86c3eb6e59575630"},{url:"/_next/static/chunks/pages/admin-statestique-f2a28174f60e5a1d.js",revision:"f2a28174f60e5a1d"},{url:"/_next/static/chunks/pages/index-ea166f1ae8fb8cb1.js",revision:"ea166f1ae8fb8cb1"},{url:"/_next/static/chunks/pages/instalateur-dahsboard-f103256b49c5fa24.js",revision:"f103256b49c5fa24"},{url:"/_next/static/chunks/pages/instalateur/constructeur-bd4633c620c118b9.js",revision:"bd4633c620c118b9"},{url:"/_next/static/chunks/pages/instalateur/instalateur-history-c4e9a1fadec62ab1.js",revision:"c4e9a1fadec62ab1"},{url:"/_next/static/chunks/pages/login-6630fbbd7fff6a7a.js",revision:"6630fbbd7fff6a7a"},{url:"/_next/static/chunks/pages/logistique-admin/inProgress-7da31e03230a88b2.js",revision:"7da31e03230a88b2"},{url:"/_next/static/chunks/pages/logistique-admin/inProgress/%5Bslug%5D-5c1388c936936633.js",revision:"5c1388c936936633"},{url:"/_next/static/chunks/pages/logistique-admin/retour-ebca74453e29ac73.js",revision:"ebca74453e29ac73"},{url:"/_next/static/chunks/pages/logistique-admin/retour/%5Bslug%5D-c4866766ac8ac857.js",revision:"c4866766ac8ac857"},{url:"/_next/static/chunks/pages/logistique/inProgress-e0b23e75d89cc3f5.js",revision:"e0b23e75d89cc3f5"},{url:"/_next/static/chunks/pages/logistique/inProgress/%5Bslug%5D-af91c5e8b124c972.js",revision:"af91c5e8b124c972"},{url:"/_next/static/chunks/pages/logistique/retour-bd6d26c63a41452c.js",revision:"bd6d26c63a41452c"},{url:"/_next/static/chunks/pages/logistique/retour/%5Bslug%5D-89ba106a1d77f5e8.js",revision:"89ba106a1d77f5e8"},{url:"/_next/static/chunks/pages/material-9e77a51065bbe607.js",revision:"9e77a51065bbe607"},{url:"/_next/static/chunks/pages/orderDetails-a7ed2f6f43522e37.js",revision:"a7ed2f6f43522e37"},{url:"/_next/static/chunks/pages/suivi-chantier-a14660b71de91a99.js",revision:"a14660b71de91a99"},{url:"/_next/static/chunks/pages/suivi-chantier/%5Bslug%5D-379ffbaf666b1b43.js",revision:"379ffbaf666b1b43"},{url:"/_next/static/chunks/pages/users-93a4c6e2884a2a75.js",revision:"93a4c6e2884a2a75"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-3036c38ea37b6d89.js",revision:"3036c38ea37b6d89"},{url:"/_next/static/css/00907eb975caaf69.css",revision:"00907eb975caaf69"},{url:"/_next/static/css/30fd6dae99bf48e4.css",revision:"30fd6dae99bf48e4"},{url:"/_next/static/hMay3AQSz08lxAps_G7qZ/_buildManifest.js",revision:"4f2816e9f6aae07c9edef9f91b90a4b0"},{url:"/_next/static/hMay3AQSz08lxAps_G7qZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"7abbd1b14a59608a02059211103a5f86"},{url:"/icon-256x256.png",revision:"4f0cc839b7acb7bbb84eb9e7e648ff03"},{url:"/icon-384x384.png",revision:"bbdf45730d665b9e1d62bda4aa9692ee"},{url:"/icon-512x512.png",revision:"09f516b885f33bf3292bb73c6bdbea38"},{url:"/images/apple-touch-icon - Copie.png",revision:"abead32a69df75255c09d10aea3d0058"},{url:"/images/apple-touch-icon.png",revision:"b0fa10c006167d84b4be8e1531adf7db"},{url:"/images/avatars/1.png",revision:"9bf9f227ddc04e24ee3398ddf2421062"},{url:"/images/cards/amazon-echo-dot.png",revision:"77c99c1bd982541069510a00c2f3f935"},{url:"/images/cards/american-express-with-bg.png",revision:"054a2329db74b636a5452d7dee8f0f58"},{url:"/images/cards/analog-clock.jpg",revision:"c5a4d40515fecb7854a38598625ed588"},{url:"/images/cards/apple-iPhone-13.png",revision:"6bb967e1eb6f63d027053c5fda5de80b"},{url:"/images/cards/apple-watch-series-7.png",revision:"2aa2f84f125594618434500c19b2fcfe"},{url:"/images/cards/australia.png",revision:"74a8a44da716aacb292b062eeeb561c5"},{url:"/images/cards/background-user.png",revision:"463fc51e0473f3fb8bad9823755fd435"},{url:"/images/cards/beats-studio-2.png",revision:"12bf02cc5a42d670f745947718b6ee68"},{url:"/images/cards/brazil.png",revision:"ed9cd6d0f22a08e1b58993fb6849dff1"},{url:"/images/cards/china.png",revision:"48a221dee4a40f0a8e87d1da3772850b"},{url:"/images/cards/congratulations-john.png",revision:"b600c4d30845a1e39f57e1eb572e1783"},{url:"/images/cards/france.png",revision:"ebddb1418775631ac4b8be01736c2993"},{url:"/images/cards/glass-house.png",revision:"c12c0fae9dce7d65dfd06d7ec0d31e81"},{url:"/images/cards/graphic-illustration-1.png",revision:"9e49db1917d13a1a43079710e9d144e1"},{url:"/images/cards/graphic-illustration-2.png",revision:"495b17f663b3ad07072465a21ec9fa51"},{url:"/images/cards/graphic-illustration-3.png",revision:"582e9b0a39f7a247434084770d5f0a4a"},{url:"/images/cards/iPhone-11-pro.png",revision:"10a11bb91c4eaa3a19eddc11f8f50279"},{url:"/images/cards/india.png",revision:"b26a800477db5a6e7ab66c4a751d90f7"},{url:"/images/cards/mastercard-with-bg.png",revision:"bc3f61f49f2948fae2d4984a2e6b1f1b"},{url:"/images/cards/nike-air-jordan.png",revision:"40644ceb2d2476e23a7c63da47d06216"},{url:"/images/cards/paper-boat.png",revision:"449cb04468d70acc325eca648a6334d4"},{url:"/images/cards/paypal.png",revision:"e16d0df649d3159648afc564446f1a4c"},{url:"/images/cards/play-station-console.png",revision:"e30e8be6090b013993659a1c91b593d4"},{url:"/images/cards/us.png",revision:"cb79d2765e8b8ea9b141738eecfb2072"},{url:"/images/cards/visa-with-bg.png",revision:"0830fac5d5fab385d931cd915b800b44"},{url:"/images/cards/watch-on-hand.jpg",revision:"8d9473f8ccb889f4be5f881e71cdce06"},{url:"/images/favicon.png",revision:"29f03b97f1445fdfbc36c3286472dea7"},{url:"/images/inWork.jpg",revision:"0b7e62fc939856e7fa5b530c7d1cc0b0"},{url:"/images/logo.png",revision:"f1788502ee41e186911976cf82be16f9"},{url:"/images/logo.svg",revision:"25ffd4c66ece1eb6c6d3a30c5c096edc"},{url:"/images/pages/401.png",revision:"f7847f22aee813bd9e89236f72731ae2"},{url:"/images/pages/404.png",revision:"41e4888eb8aecf78f7a68609bb10c677"},{url:"/images/pages/auth-v2-forgot-password-illustration-dark.png",revision:"4903dec7a0f245852b42d271e8cea0f2"},{url:"/images/pages/auth-v2-forgot-password-illustration-light.png",revision:"f5b7a1ce5b33c484f8bdf3eebb03a893"},{url:"/images/pages/auth-v2-login-illustration-bordered-dark.png",revision:"708b29d98b7c0fb22c43fe110d30711a"},{url:"/images/pages/auth-v2-login-illustration-bordered-light.png",revision:"584425a932091c2bbc06f77b630ee327"},{url:"/images/pages/auth-v2-login-illustration-dark.png",revision:"146accc9b8bc10cd2c56f28b58da0992"},{url:"/images/pages/auth-v2-login-illustration-light.png",revision:"827ebd7ac2eb65ea9a3d85490b77288c"},{url:"/images/pages/auth-v2-mask-dark.png",revision:"5aa3aab68f21ae85493957d2d84d84c9"},{url:"/images/pages/auth-v2-mask-light.png",revision:"5919d6e95af34ba3ab8e2cf179ebfe0d"},{url:"/images/pages/auth-v2-register-illustration-bordered-dark.png",revision:"3ba4f5c1b6d3ca934bda90bc688444b0"},{url:"/images/pages/auth-v2-register-illustration-bordered-light.png",revision:"90d4d411a7349dbf08461c93738e7072"},{url:"/images/pages/auth-v2-register-illustration-dark.png",revision:"d717fcf636b650e9a6ad26107125f175"},{url:"/images/pages/auth-v2-register-illustration-light.png",revision:"d26bda98cca6281e5497792977976ec3"},{url:"/images/pages/misc-mask-dark.png",revision:"4573139fc226684bf7af479fd371e672"},{url:"/images/pages/misc-mask-light.png",revision:"0d953103d6c7245c6002ed9d73b621ba"},{url:"/manifest.json",revision:"d5065e84403f3dce02b2f4556014440b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel copy.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
