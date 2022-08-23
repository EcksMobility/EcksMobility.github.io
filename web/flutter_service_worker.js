'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1a6137f5df01534f715688c512ab4aca",
"assets/assets/bg_lights.png": "256e3e8a8bcf30caf5e7702d7b660d57",
"assets/assets/logo.png": "e5a8066ce12448b80745bae6c70696db",
"assets/assets/svg/cross_nav_cta.svg": "988598600f30f0e82ede70485f5e3d2c",
"assets/assets/svg/cta_text_advanced.svg": "5e69728f06dcf8c791bd1957449b1c40",
"assets/assets/svg/cta_text_button.svg": "f371beef6431a04c82fe0c058d2423c8",
"assets/assets/svg/cta_text_main_btn.svg": "6eb0eae5a325076424a04d37e2b006ab",
"assets/assets/svg/cta_text_play_now.svg": "b1cf5e855121e0b15067578fdf88be3a",
"assets/assets/svg/cta_text_primary.svg": "54e43bc9640e329e28f004239f4cba7c",
"assets/assets/svg/cta_text_primary_btn.svg": "4b0463e9b3bf60f1f09550af1e62185d",
"assets/assets/svg/cta_text_scan.svg": "b206fbdf33a863a6b412fda1fc81267d",
"assets/assets/svg/cta_text_secondary.svg": "b855941ebcdc35451240424f6aaab7a3",
"assets/assets/svg/cta_text_secondary_btn.svg": "613a4aca95a68fe1b8aa9de9f878ec25",
"assets/assets/svg/cta_text_switches.svg": "0ecd2866e85fb9993273adcd6624dcf8",
"assets/assets/svg/cta_text_view.svg": "9fe7f2327f8a5a322838550e36ea26d5",
"assets/assets/svg/heading_advanced.svg": "7203b897b142e68e2dbfb60443a2a02a",
"assets/assets/svg/heading_buttons.svg": "cc328327ccd8fe8a1de497f9c05ed0fc",
"assets/assets/svg/heading_primary_btns.svg": "be21364d67d8df934ba468af79ec5b3b",
"assets/assets/svg/heading_secondary_btns.svg": "66144c4c7cb003db0228801c09308f28",
"assets/assets/svg/left_nav_cta.svg": "16afd66a30ac8e943591aefa13907216",
"assets/assets/svg/logo.svg": "6ce13d2ddbb1116d0fed404cc833f8d7",
"assets/assets/svg/neopop_framework_text.svg": "86280af53b345ce9879dc5021f041921",
"assets/assets/svg/right_nav_cta.svg": "258f44b8a160d31f284c391bd34963b0",
"assets/assets/svg/text_adjacent_buttons.svg": "8f2eadc280856b28421c6fb7085c4b3a",
"assets/assets/svg/text_config_buttons.svg": "1c33df83fc5d33deaba38a5406ce9e7d",
"assets/assets/svg/text_floating_tilted_button.svg": "ba631650e3eaed054c3f15b1a1d227f6",
"assets/assets/svg/text_non_floating_tilt_button.svg": "8549b5e12b393e95c34b7b6d4bd16246",
"assets/assets/svg/text_stroke_button.svg": "02ae5455415d3fb11f1360b907f1165f",
"assets/assets/svg/wrapper_bg.svg": "ace167432dad67e5af1949e013759a0f",
"assets/assets/wrapper_bg.png": "436e25cb962376b1b37938e6fbe17247",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "565c2742a724f3560cdc7c5caea205ee",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "4c1000a3c9df3b65301c92282bf1958d",
"/": "4c1000a3c9df3b65301c92282bf1958d",
"main.dart.js": "426da7f5a41150bcac0bf9da68f493f5",
"manifest.json": "08380c701c4df656fe3ad65663e94fb8",
"version.json": "0fa55017c2ceb0d58eaad12e95bd7d0f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
