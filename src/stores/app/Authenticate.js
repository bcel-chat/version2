import ds from "@/helper/deepstream.js";
import router from "@/routers/router.js";
import code from "@/helper/father.js";
import store from "@/stores/store.js";

// import * as firebase from "firebase";
// import * as device from "device-uuid";

// import { debounce } from "lodash";

// const firebaseConfig = {
//   apiKey: "AIzaSyChPx8QKJSwSVHCjzWRLBqXfPg3kJKLKfo",
//   authDomain: "chat-bcel.firebaseapp.com",
//   databaseURL: "https://chat-bcel.firebaseio.com",
//   projectId: "chat-bcel",
//   storageBucket: "",
//   messagingSenderId: "175455949069",
//   appId: "1:175455949069:web:71d8ac49c4d1aa44"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//   "BATkt7EADcqt8OA4SFJbjg8jxj3yosg5pd8mBWeOO291t5eBNllS5_LK1iMgdByftWGvaA0xQBBhZznald6v3lg"
// ); // 1. Generate a new key pair

// // navigator.serviceWorker.register('sw/firebase-messaging-sw.js')
// //     .then((registration) => {
// //         messaging.useServiceWorker(registration);
// //     });

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("sw/firebase-messaging-sw.js")
//     .then(function(reg) {
//       messaging.useServiceWorker(reg);
//       reg.pushManager.getSubscription().then(() => {});
//     })
//     .catch(function(err) {
//       console.log("Service Worker registration failed: ", err);
//     });
// }

// const resquestPermission = user => {
//   messaging
//     .requestPermission()
//     .then(() => {
//       messaging
//         .getToken()
//         .then(token => {
//           const device_id = new device.DeviceUUID().get();
//           ds.rpc.make(
//             "/bcel/dashboard/flexible/interest/save/user/notification/token",
//             {
//               username: user,
//               diviceId: device_id,
//               token: token
//             },
//             () => {}
//           );
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     })
//     .catch(err => {
//       console.log("Unable to get permission to notify.", err);
//     });
// };

// messaging.onMessage(function(payload) {
//   // store.dispatch("Notification", payload.data)
//   const uname = JSON.parse(payload.data.recieveList);
//   const myname = JSON.parse(code.from(localStorage.getItem("thor")));

//   if (
//     uname.filter(id => {
//       myname.user.toLowerCase() == id.toLowerCase();
//     }).length <= 0
//   )
//     return;

//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//     var options = {
//       body: payload["notification"]["body"]
//     };
//     var n = new Notification(payload["notification"]["title"], options);
//     n.onclick = function(event) {
//       event.preventDefault(); // prevent the browser from focusing the Notification's tab
//     };
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function(permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         var options = {
//           body: payload["notification"]["body"]
//         };
//         var n = new Notification(payload["notification"]["title"], options);
//         n.onclick = function(event) {
//           event.preventDefault(); // prevent the browser from focusing the Notification's tab
//         };
//       }
//     });
//   }
// });

// const permissionCheck = user => {
//   ds.rpc.make(
//     "/bcel/api/flexible/interest/current/user",
//     {
//       userId: user
//     },
//     (err, result) => {
//       if (!err) {
//         localStorage.setItem("miya", code.to(result.userId));
//         resquestPermission(result.userId);
//         if (result["userId"]) {
//           store.commit("flexible_interest_module/addLoginUser", {
//             user: result["userId"]
//           });
//           window.localStorage.setItem("user", code.to(result["userId"]));
//           if (result["permission"] == 1 || result["permission"] == 2) {
//             window.localStorage.setItem("permission", code.to("true"));
//             store.commit("flexible_interest_module/setPMS", {
//               pms: "true"
//             });
//           } else if (result["permission"] == 3) {
//             window.localStorage.setItem("permission", code.to("report"));
//             store.commit("flexible_interest_module/setPMS", {
//               pms: "report"
//             });
//           } else if (result["permission"] == 0) {
//             window.localStorage.setItem("permission", code.to("false"));
//             store.commit("flexible_interest_module/setPMS", {
//               pms: "false"
//             });
//           }
//         }
//       }
//       // localStorage.setItem("miya", code.to('goku'))
//     }
//   );
// };

const authentication = {
  namespaced: true,
  state: {
    authData: null,
    authStatus: true,
    userRole: null,
    connectClose: null
  },
  mutations: {
    setAuthData(state, payload) {
      state.authData = payload.data;
      state.authStatus = payload.status;
      if (payload.data) {
        // permissionCheck(payload.data[0].uname);
        localStorage.setItem("freya", code.to(payload.data[0].uname));
        localStorage.setItem("badang", code.to(payload.data[0].wlc_id));
        localStorage.setItem("phone", code.to(payload.data[0].phone));
        state.setConnectClose = false;
        router.push("/");
      }

      let timeOut = debounce(() => {
        state.authStatus = true;
      }, 5000);

      timeOut();
    },
    setUserRole(state, payload) {
      state.userRole = payload;
    },
    setConnectClose(state, payload) {
      state.connectClose = payload;
    }
  },
  actions: {
    setAuthData({ commit }, payload) {
      ds.login(payload, (success, data) => {
        if (success) {
          commit("setUserRole", data[0].role);
          // localStorage.setItem("your_name", code.to(data[0].role));
          localStorage.setItem("thor", code.to(JSON.stringify(payload)));
          localStorage.setItem("roger", code.to(data[0].uid));
          store.commit("Settings/setProfile", {
            picture: data[0].picture,
            displayname: data[0].displayname,
            desc: data[0].description
          });
          commit("setAuthData", {
            data: data,
            status: success
          });
        } else {
          commit("setAuthData", {
            data: data,
            status: success
          });
        }
      });
      ds.on("error", () => {
        commit("setConnectClose", true);
      });
    },
    signout() {
      // commit("setAuthData", {
      //   data: null,
      //   status: true
      // });
      ds.close();
      let keysToRemove = [
        "roger",
        "miya",
        "freya",
        "thor",
        "badang",
        "phone",
        "user",
        "permission",
        "emojis",
        "timer",
        "otpBase",
        "otp"
      ];

      keysToRemove.forEach(e => {
        localStorage.removeItem(e);
      });

      location.reload();
    }
  }
};

export default authentication;
