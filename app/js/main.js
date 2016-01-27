(function() {
    'use strict';

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('button');

    if('serviceWorker' in navigator) {
        console.log('Service Worker is supported.');
        navigator.serviceWorker.register('sw.js').then(function(serviceWorkerRegistration) {
            reg = serviceWorkerRegistration;
            subscribeButton.disabled = false;
            console.log(':^)', reg);
        }).catch(function(err) {
            console.log(':^(', err);
        });
    }

    subscribeButton.addEventListener('click', function() {
        if(isSubscribed) {
            unsubscribe();
        } else {
            subscribe();
        }
    });

    function subscribe() {
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(pushSubscription) {
            sub = pushSubscription;
            console.log('Subscribed to endpoint: ', sub.endpoint);
            subscribeButton.textContent = 'Unsubscribe';
            isSubscribed = true;
        });
    }

    function unsubscribe() {
        sub.unsubscribe().then(function(event) {
            subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', event);
            isSubscribed = false;
        }).catch(function(error) {
            console.log('Error unsubscribing', error);
            subscribeButton.textContent = 'Subscribe';
        });
    }
}());
