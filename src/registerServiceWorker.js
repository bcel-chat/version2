/* eslint-disable no-console */

import { register } from "register-service-worker";

import ds from "./helper/deepstream";
import push from "push.js";
import store from "./stores/store";

// if (process.env.NODE_ENV === 'production') {
register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
    // if (Notification.permission != 'granted')
    //   Notification.requestPermission()
  },
  registered() {
    // ds.event.subscribe(`notification`, data => {
    //   if (data.uid != store.state.Identify.myID)
    //     if (data.rid != store.state.Room.participantRoom.rid)
    //       push.create(data.sender, {
    //         body: data.msg,
    //         icon: data.icon,
    //         timeout: 4000,
    //         onClick: function () {
    //           window.focus();
    //           this.close();
    //         }
    //       })
    // })
  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    console.log("New content is downloading.");
  },
  updated() {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  }
});
// }
