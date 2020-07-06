const webPush = require("web-push");

const vapidKeys = {
    "publicKey":"BKz0fjZ-iFWpRc2LIwBza6eOVOSpUwM7JQu_6S9AJMzqEmStQ3EZv0C7FePl-XHBkjueQrmzBHgSa-GD5A-Mbg8",
    "privateKey": "m4Cmbo9AhnF-DqI0dwWvXx19zDk07vAjl7Zqpg65_1c"
}

webPush.setVapidDetails(
    'mailto:ydiizx@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dwbuxQbpNTI:APA91bGP25feKIYgjWbvaOl0Te88zmq1OKbTiOrq3xZqWhne74Frahj48K6XjZZyGuT3051vdH3LzXnse2pnklRuEVb20HDkmICPnm0n5NE38n8KSpAyML9t2SLnoUX3KJhtL9xFHE_g",
    "keys":{
        "p256dh":"BErc6UjohrEO9OEdxKSr2eXJRC/JEXj85ftaEnstDHd9/DymJFy84n8A59yuaoZX1+VPJw6/hjZSjG1bPk6uJ30=",
        "auth":"ZLedLz4AqYrsGMDho74PdA=="
    }
}

var payload = `Update info hasil pertandingan hari ini, untuk lebih jelasnya silahkan Klik Ya`
var options = {
    gcmAPIKey: "240219262461",
    TTL: 60,
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)