if ("serviceWorker" in navigator) {
    registerSw();
    requestNotifPermiss();
  } else {
    console.error("ServiceWorker Not Supported in This Browser")
  }

function registerSw() {
  return navigator.serviceWorker.register("/service-worker.js")
    .then(registration => {
      console.log("Berhasil Registrasi")
      return registration;
    }).catch(err => {
      console.error("gagal registrasi Error : ", error)
    })
}

function requestNotifPermiss() {
  if ("Notification" in window) {
    Notification.requestPermission().then(result => {
      if (result === "denied") {
        console.log("tidak diizinkan");
        return;
      } else if (result === "default") {
        console.error("Permintaan Diabaikan")
        return;
      }
      if (("PushManager" in window)) {
        navigator.serviceWorker.getRegistration()
          .then(registration => {
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BKz0fjZ-iFWpRc2LIwBza6eOVOSpUwM7JQu_6S9AJMzqEmStQ3EZv0C7FePl-XHBkjueQrmzBHgSa-GD5A-Mbg8")
            }).then(subscribe => {
              console.log("Subscribe Berhasil, endpoint : ", subscribe.endpoint);
              console.log("p256dh Key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
              console.log("p256dh Key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
            }).catch(err => {
              console.error("Gagal Subscribe , Error: ", err)
            });
          });
      }
    });
  }
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArr = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++){
    outputArr[i] = rawData.charCodeAt(i);
  }
  return outputArr;
}