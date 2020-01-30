import ds from "@/helper/deepstream.js";
import code from "@/helper/father.js";
import axios from "axios";
import store from "../store";

const settings = {
  namespaced: true,
  state: {
    profile: {
      picture: "",
      name: "",
      about: ""
    },
    sResult: "",
    menuItems: null
  },
  mutations: {
    setProfile(state, payload) {
      state.profile.picture = payload.picture;
      state.profile.name = payload.displayname;
      state.profile.about = payload.desc;
    },
    setProfilePicture(state, payload) {
      state.profile.picture = payload;
    },
    searchUser(state, payload) {
      state.sResult = payload[0];
    },
    getMenuItem(state, payload) {
      state.menuItems = payload;
    }
  },
  actions: {
    getProfile({ commit }, payload) {
      ds.rpc.make(
        "getProfile",
        {
          id: payload
        },
        (err, data) => {
          if (!err) {
            commit("setProfile", data[0]);
          } else console.log(err);
        }
      );
    },
    setName(context, payload) {
      let uid = code.from(localStorage.getItem("roger"));
      ds.rpc.make(
        "setNameAbout",
        {
          id: uid,
          text: payload,
          _page: 1
        },
        (err, data) => {
          if (!err) {
            context.dispatch("getProfile", uid);
          } else console.log(err);
        }
      );
    },
    setAbout(context, payload) {
      let uid = code.from(localStorage.getItem("roger"));
      ds.rpc.make(
        "setNameAbout",
        {
          id: uid,
          text: payload,
          _page: 2
        },
        (err, data) => {
          if (!err) {
            context.dispatch("getProfile", uid);
          } else console.log(err);
        }
      );
    },
    async setProfilePicture(context, payload) {
      let uid = code.from(localStorage.getItem("roger"));

      let formData = new FormData();
      formData.append("file", payload);
      formData.append("uid", uid);
      formData.append("rid", 0);
      formData.append("_page", 1);

      const res = await axios.post(
        `${process.env.VUE_APP_ACCESS_API}/profilepicture`,
        formData
      );
      if (res.data) {
        context.dispatch("getProfile", res.data);
        store.dispatch("AppData/showCrop", { show: false, page: 0 });
      }
    },
    async setProfilePictureIcon(context, payload) {
      let uid = code.from(localStorage.getItem("roger"));

      let formData = new FormData();
      formData.append("file", payload);
      formData.append("uid", uid);

      const res = await axios.post(
        `${process.env.VUE_APP_ACCESS_API}/profilepictureIcon`,
        formData
      );
    },
    async searchUser({ commit, dispatch, state }, payload) {
      ds.rpc.make("settingSearchUser", payload, (err, data) => {
        if (!err) {
          commit("searchUser", data);
          if (state.sResult)
            dispatch("getMenuItem", {
              user: state.sResult.uid,
              text: "",
              _page: 1
            });
        }
      });
    },
    async getMenuItem({ commit }, payload) {
      ds.rpc.make("getMenuItem", payload, (err, data) => {
        if (!err) commit("getMenuItem", data);
      });
    },
    async menuPermission({ dispatch }, payload) {
      ds.rpc.make("updateMenuPermission", payload, (err, data) => {
        if (!err) dispatch("getMenuItem", payload.uid);
      });
    }
  }
};

export default settings;
