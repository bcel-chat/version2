import ds from "@/helper/deepstream.js"
import code from "@/helper/father.js"
import axios from "axios"

const settings = {
  namespaced: true,
  state: {
    profile: {
      picture: '',
      name: '',
      about: ''
    }
  },
  mutations: {
    setProfile(state, payload) {
      state.profile.picture = payload.picture
      state.profile.name = payload.displayname
      state.profile.about = payload.desc
    },
    setProfilePicture(state, payload) {
      state.profile.picture = payload;
    }
  },
  actions: {
    getProfile({
      commit
    }, payload) {
      ds.rpc.make('getProfile', {
        id: payload,
      }, (err, data) => {
        if (!err) {
          commit("setProfile", data[0])
        } else
          console.log(err);
      })
    },
    setName(context, payload) {
      let uid = code.from(localStorage.getItem("roger"))
      ds.rpc.make('setNameAbout', {
        id: uid,
        text: payload,
        _page: 1
      }, (err, data) => {
        if (!err) {
          context.dispatch("getProfile", uid)
        } else
          console.log(err);
      })
    },
    setAbout(context, payload) {
      let uid = code.from(localStorage.getItem("roger"))
      ds.rpc.make('setNameAbout', {
        id: uid,
        text: payload,
        _page: 2
      }, (err, data) => {
        if (!err) {
          context.dispatch("getProfile", uid)
        } else
          console.log(err);
      })
    },
    async setProfilePicture(context, payload) {
      let uid = code.from(localStorage.getItem("roger"))

      let formData = new FormData();
      formData.append("file", payload);
      formData.append("uid", uid);
      formData.append("rid", 0);
      formData.append("_page", 1);

      const res = await axios.post(
        `${process.env.VUE_APP_ACCESS_API}/profilepicture`,
        formData
      )
      context.dispatch("getProfile", res.data)

    }
  }
};

export default settings;