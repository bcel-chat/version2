import ds from "@/helper/deepstream.js"
import router from "@/routers/router.js"
import code from "@/helper/father.js"
import store from "@/stores/store.js"

import * as firebase from "firebase";
import * as device from "device-uuid";


const firebaseConfig = {
    apiKey: "AIzaSyChPx8QKJSwSVHCjzWRLBqXfPg3kJKLKfo",
    authDomain: "chat-bcel.firebaseapp.com",
    databaseURL: "https://chat-bcel.firebaseio.com",
    projectId: "chat-bcel",
    storageBucket: "",
    messagingSenderId: "175455949069",
    appId: "1:175455949069:web:71d8ac49c4d1aa44"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BATkt7EADcqt8OA4SFJbjg8jxj3yosg5pd8mBWeOO291t5eBNllS5_LK1iMgdByftWGvaA0xQBBhZznald6v3lg"); // 1. Generate a new key pair

// navigator.serviceWorker.register('sw/firebase-messaging-sw.js')
//     .then((registration) => {
//         messaging.useServiceWorker(registration);
//     });

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw/firebase-messaging-sw.js').then(function (reg) {
            messaging.useServiceWorker(reg);
            reg.pushManager.getSubscription().then(function (sub) {
                if (sub === null) {
                    // Update UI to ask user to register for Push
                    console.log('Not subscribed to push service!');
                } else {
                    // We have a subscription, update the database
                    console.log('Subscription object: ', sub);
                }
            });
        })
        .catch(function (err) {
            console.log('Service Worker registration failed: ', err);
        });
}

const resquestPermission = (user) => {
    messaging.requestPermission().then(() => {
        messaging.getToken().then((token) => {
                const device_id = new device.DeviceUUID().get()
                ds.rpc.make('/bcel/dashboard/flexible/interest/save/user/notification/token', {
                    "username": user,
                    "diviceId": device_id,
                    "token": token
                }, (err, data) => {

                })
            })
            .catch((err) => {
                console.log(err);
            })
    }).catch((err) => {
        console.log('Unable to get permission to notify.', err);
    });
}


messaging.onMessage(function (payload) {
    // store.dispatch("Notification", payload.data)
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var options = {
            body: payload['notification']['body']
        };
        var n = new Notification(payload['notification']['title'], options);
        n.onclick = function (event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
        }
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var options = {
                    body: payload['notification']['body']
                };
                var n = new Notification(payload['notification']['title'], options);
                n.onclick = function (event) {
                    event.preventDefault(); // prevent the browser from focusing the Notification's tab
                }
            }
        });
    }
})

const permissionCheck = (user) => {
    ds.rpc.make('/bcel/api/flexible/interest/current/user', {
        "userId": user
    }, (err, data) => {
        if (!err) {
            localStorage.setItem("miya", code.to(data.userId))
            resquestPermission(data.userId)
        }
        // localStorage.setItem("miya", code.to('goku'))
    })
}

const authentication = {
    namespaced: true,
    state: {
        authData: null,
        authStatus: true
    },
    mutations: {
        setAuthData(state, payload) {
            state.authData = payload.data
            state.authStatus = payload.status
            if (payload.data) {
                permissionCheck(payload.data[0].uname)
                localStorage.setItem("freya", code.to(payload.data[0].uname))
                localStorage.setItem("badang", code.to(payload.data[0].wlc_id))
                router.push("/")
            }
            setTimeout(() => {
                state.authStatus = true
            }, 5000);
        },
    },
    actions: {
        setAuthData({
            commit
        }, payload) {
            ds.login(payload, (success, data) => {
                if (success) {
                    localStorage.setItem("thor", code.to(JSON.stringify(payload)));
                    localStorage.setItem("roger", code.to(data[0].uid));
                    store.commit("Settings/setProfile", {
                        picture: data[0].picture,
                        displayname: data[0].displayname,
                        desc: data[0].description
                    })
                }
                commit("setAuthData", {
                    data: data,
                    status: success
                })
            })
        },
        signout({
            commit
        }) {
            localStorage.clear()
            commit("setAuthData", {
                data: null,
                status: true
            })
            ds.close()
            router.push("/signin")
        }
    }
}

export default authentication