

self.addEventListener("install", function (event) {
    event.waitUntil(
      caches.open("my-cache-name").then(function (cache) {
        cache.addAll([
          "/",
          "./index.html",
          "../src",
          "../src/db.js"
        ]);
      })
    );
  });
  
  self.addEventListener("activate", function (event) {
    console.log("Service worker activated", event);
    console.log("hello")
  });
  
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.match(event.request).then(function (res) {
        return res || fetch(event.request);
      })
    );
  });
  