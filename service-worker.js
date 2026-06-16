self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Firebase Authentication isteklerini hariç tut
  if (url.includes('identitytoolkit.googleapis.com') || url.includes('firebaseapp.com') || url.includes('wolatil-com.firebaseapp.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Diğer istekler için önbellek stratejisi
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return new Response('Ağ hatası: Çevrimdışı olabilirsiniz.', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});