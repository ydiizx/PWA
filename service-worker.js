importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: '/', revision: '1'},
  {url: '/index.html', revision: '1'},
  {url: '/navbar.html', revision: '1'},
  {url: '/detailteam.html', revision: '1'},
  {url: '/manifest.json', revision: '1'},
  {url: '/pages/home.html', revision: '1'},
  {url: '/pages/match.html', revision: '1'},
  {url: '/pages/saved.html', revision: '1'},
  {url: '/css/materialize.min.css', revision: '1'},
  {url: '/js/api.js', revision: '1'},
  {url: '/js/cekswnotif.js', revision: '1'},
  {url: '/js/db.js', revision: '1'},
  {url: '/js/detail.js', revision: '1'},
  {url: '/js/getdata.js', revision: '1'},
  {url: '/js/idb.js', revision: '1'},
  {url: '/js/materialize.min.js', revision: '1'},
  {url: '/js/nav.js', revision: '1'},
  {url: '/img/checkmark.png', revision: '1'},
  {url: '/img/xmark.png', revision: '1'},
  {url: '/img/icon/Icon-128.png', revision: '1'},
  {url: '/img/icon/Icon-144.png', revision: '1'},
  {url: '/img/icon/Icon-152.png', revision: '1'},
  {url: '/img/icon/Icon-180.png', revision: '1'},
  {url: '/img/icon/Icon-192.png', revision: '1'},
  {url: '/img/icon/Icon-256.png', revision: '1'},
  {url: '/img/icon/Icon-512.png', revision: '1'},
  ],
  {
  ignoreURLParametersMatching: [/.*/]
  }
)

workbox.routing.registerRoute(
  /\.(?:css|js)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "Assets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 60 * 60 * 24 * 60,
      })
    ]
  })
)

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 60 * 60 * 24 * 60,
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  new workbox.strategies.StaleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp("https://fonts.googleapis.com/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets"
  })
)

self.addEventListener("push", function(event) {
  var body;
  console.log(event)
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push Message No Payload"
  }

  var options = {
    body:body,
    badge: 'img/icon/Icon-120.png',
    icon: 'img/icon/Icon-256.png',
    vibrate: [100,50,100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        'action': 'yes',
        'title':'Ya',
        'icon':'/img/checkmark.png'
      },
      {
        'action': 'no',
        'title': 'No',
        'icon': '/img/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification("Info Football", options)
  )
})

self.addEventListener("notificationclick", function (event) {
  if (!event.action) {
    console.log("Notification Click");
    return;
  }

  switch (event.action) {
    case 'yes':
      console.log("Pengguna Pilih Yes")
      clients.openWindow("/")
      break;
    case 'no':
      console.log("Pengguna Pilih Tidak");
      break;
    default:
        console.log(`action yang dipilih tidak ada dipilihan : ${event.action}`);
        break;
  }
})