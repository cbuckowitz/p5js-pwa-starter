"use strict";

const STATIC_CACHE_NAME = "static-cache-v4";

const STATIC_CACHE_FILES = [
  "/",
  "/index.html",
  "/scripts/sketch.js",
  "/lib/p5.min.js",
  "/styles/style.css",
  "/p5js-pwa-starter/",
  "/p5js-pwa-starter/index.html",
  "/p5js-pwa-starter/scripts/sketch.js",
  "/p5js-pwa-starter/lib/p5.min.js",
  "/p5js-pwa-starter/styles/style.css"
];


self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_FILES)).catch(
      err => console.error(err)
    )
  );

  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== STATIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});