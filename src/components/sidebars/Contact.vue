<template>
  <div id="contact">
    <div class="content-box">
      <transition-group
        :name="_contact.length > 0 ? 'flip-list' : ''"
        tag="div"
        :class="['content-group', mobileMode ? 'mobile-enter' : 'desktop-enter']"
      >
        <template v-for="(item, index) in _contact">
          <div class="list-group" :key="index">
            <div class="alpha-box">
              <div class="alpha" :style="{color: colors}">{{item[0].alpha}}</div>
            </div>
            <!-- End alpha-box -->
            <template v-for="it in item">
              <router-link
                :to="`/rooms/${it.rid}`"
                :key="it.id"
                class="item-inbox"
                role="button"
                ref="itemInbox"
                @click.native="chat(it)"
              >
                <div class="avatar-inbox-panel">
                  <div class="avatar-inbox">
                    <img
                      v-if="it.picture"
                      :src="`${picURL+it.user_id}/icon/${it.picture}`"
                      class="avatar"
                    />
                    <img v-else src="@/assets/img/user.svg" class="avatar-default" />
                  </div>
                </div>
                <!-- End avatar-inbox-panel -->
                <div class="inbox-detail">
                  <div class="name-time-box">
                    <div class="sender-name-box">
                      {{ it.username }} |
                      <i>@{{ it.wlc_id }}</i>
                    </div>
                  </div>
                  <div class="msg-box">
                    <div class="msg">{{ it.desc }}</div>
                  </div>
                </div>
                <!-- inbox-detail -->
              </router-link>
              <!-- End item-inbox -->
            </template>
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import randomColor from "randomcolor";
import { mapActions, mapState, mapGetters } from "vuex";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  data() {
    return {
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      colors: randomColor({
        luminosity: "dark",
        hue: "random"
      })
    };
  },
  watch: {
    txtSearch(val) {
      let fn = val.substring(1, 0);
      if (fn == "@")
        this.getContact({
          id: this.myID,
          _page: 2,
          text: val.substring(1, 5),
          fn: "@"
        });
      else
        this.getContact({
          id: this.myID,
          _page: 2,
          text: val,
          fn: ""
        });

      if (!val || val == "@")
        this.getContact({
          id: this.myID,
          _page: 1,
          text: "",
          fn: ""
        });
    }
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("AppData", ["mobileMode", "txtSearch", "newChat"]),
    ...mapState("Contact", "contact"),
    ...mapState("Room", ["roomStatus"]),
    ...mapGetters("Contact", ["_contact"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "showNewChat"]),
    ...mapActions("Contact", ["getContact"]),
    ...mapActions("Room", [
      "setRoom",
      "roomCheck",
      "getUserRoom",
      "getParticipantRoom",
      "setRoomBody",
      "setRoomListData"
    ]),
    ...mapActions("Chat", ["getMessage", "setRoomID", "setRoomType"]),
    chat(val) {
      clearTimeout(this.roomTimeOut);

      this.setRoomBody(false);

      this.setRoomListData({
        uid: val.user_id,
        rid: val.rid,
        rtype: 1
      });

      ds.event.subscribe(`chatroom/${val.rid}`, data => {
        this.getMessage(val.rid);
      });
      this.setRoomType(1);
      this.setRoomID(val.rid);
      this.roomCheck({ uid: val.user_id, rid: val.rid, rtype: val.rtype });
      this.getUserRoom({ uid: val.user_id });
      this.getMessage(val.rid);
      this.onChatClick({ cnt: true, module: "" });

      if (this.mobileMode) this.showNewChat(false);

      this.roomTimeOut = setTimeout(() => {
        this.setRoomBody(true);
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Contact.scss";
.flip-list-move {
  transition: transform 1s;
}
</style>
