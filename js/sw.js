const CACHE_NAME = 'kebab-cache';
const FILES_TO_CACHE = [
    '/index.html',
    '/js/app.js',
    '/js/modules/*',
    '/public/img/*',
    '/skin/css/main.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response)
                return response;

            return fetch(e.request)
                .then(res => {
                    if(!res || res.status !== 200 || res.type !== 'basic')
                        return res;

                    const resToCache = res.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(e.request, resToCache);
                        });

                    return res;
                });
        })
    );
});
  