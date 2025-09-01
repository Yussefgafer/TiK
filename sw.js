const cacheName = 'my-counter-app-v1';
const assetsToCache = [
  '/TiK/',         <!-- تم التعديل هنا (أضف اسم المستودع) -->
  '/TiK/index.html' <!-- تم التعديل هنا (أضف اسم المستودع) -->
  // ملاحظة: بما أن ملفات CSS و JS داخل ملف HTML، لا نحتاج لإضافتها هنا.
];

// Install Event: يتم تخزين الملفات هنا
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
  );
});

// Activate Event: يتم هنا تنظيف الكاش القديم إذا تغير اسم الكاش
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: يتم تقديم الملفات من الكاش إذا كانت متاحة
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        // إذا وجدنا الملف في الكاش، نعيده، وإلا نطلبه من الشبكة
        return response || fetch(e.request);
      })
  );
});