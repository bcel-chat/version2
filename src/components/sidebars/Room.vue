<template>
  <div id="chat">
    <!-- <button @click="onClick">Add</button> -->
    <div class="content-box">
      <transition-group
        name="flip-list"
        tag="div"
        :class="[
          'content-group',
          mobileMode ? 'mobile-enter' : 'desktop-enter'
        ]"
      >
        <template v-for="item in room">
          <router-link
            :to="`/rooms/${item.rid}`"
            :key="item.rid"
            :class="[
              'item-inbox',
              roomActive.status && roomActive.rid == item.rid
                ? 'roomActive'
                : ''
            ]"
            role="button"
            ref="itemInbox"
            @click.native="chat(item.myid, item.rid, item.rtype)"
            @mouseover="refID = item.rid"
            @mouseleave="roomArrow ? (refID = item.rid) : (refID = '')"
          >
            <div class="avatar-inbox-panel">
              <div class="avatar-inbox">
                <img
                  v-if="item.picture || item.rimg"
                  :src="`${picURL}${item.rtype == 1 ? item.myid : item.rid}/icon/${
        item.rtype == 1 ? item.picture : item.rimg
      }`"
                  class="avatar"
                  alt
                  srcset
                />
                <img v-else src="@/assets/img/user.svg" class="avatar-default" />
              </div>
            </div>
            <!-- End avatar-inbox-panel -->
            <div class="inbox-detail">
              <div class="name-time-box">
                <div
                  class="sender-name-box"
                  :title="
                    item.rtype == 1 ? getFirstname(item.chatwith) : item.rname
                  "
                >
                  {{
                  item.rtype == 1 ? getFirstname(item.chatwith) : item.rname
                  }}
                </div>
                <div class="time-box" :title="checkTime(item.time)">{{ checkTime(item.time) }}</div>
              </div>
              <!-- End name-time-box -->
              <div class="msg-box">
                <div
                  v-if="item.msg_type == 1"
                  class="msg"
                  :title="`${userRoomCheck(item)}${item.msg}`"
                >
                  <strong class="person_">{{ userRoomCheck(item) }}</strong>
                  {{ item.msg }}
                </div>
                <div
                  v-if="item.msg_type == 2"
                  class="msg"
                  style="font-weight: 600"
                  :title="
                    `${
                      item.uid == myID
                        ? 'You created this group'
                        : `${getFirstname(item.sender)} added you to this group`
                    }${item.msg}`
                  "
                >
                  {{
                  `${
                  item.uid == myID
                  ? "You created this group"
                  : `${getFirstname(item.sender)} added you to this group`
                  }${item.msg}`
                  }}
                </div>
                <div class="msg" v-if="item.msg_type == 3">
                  <i class="fas fa-quote-left"></i>
                  <span class="quoted">Quoted message</span>
                </div>
                <div
                  class="msg"
                  v-if="item.msg_type == 4"
                  :title="
                    `${
                      item.uid == myID
                        ? 'You sent file file'
                        : `${getFirstname(item.sender)} sent file`
                    }`
                  "
                >
                  {{
                  `${
                  item.uid == myID
                  ? "You sent file"
                  : `${getFirstname(item.sender)} sent file`
                  }`
                  }}
                </div>
                <div
                  v-if="item.msg_type == 5"
                  class="msg"
                  :title="`${userRoomCheck(item)}${item.msg}`"
                >
                  <strong class="person_">{{ userRoomCheck(item) }}</strong>
                  <div class="sticker">
                    <img
                      data-v-5679474e
                      :src="`/chat/img/emojis/${item.path}`"
                      alt
                      srcset
                      class="img-emoji"
                    />
                  </div>
                </div>
                <div class="msg-counter-box" v-if="item.unread > 0 && item.msg_type != 2">
                  <span>
                    <div class="counter-box">
                      <span class="counter" :title="`Unread ${item.unread}`">
                        {{
                        item.unread
                        }}
                      </span>
                    </div>
                  </span>
                </div>
                <!-- Endmsg-counter-box -->
                <!-- <transition
                  enter-active-class="animated fadeInRight"
                  leave-active-class="animated fadeOutRight"
                >
                  <div
                    class="arrow-box"
                    v-if="refID == item.rid && !mobileMode || roomArrow && refID == item.rid && !mobileMode"
                    @click.stop="setRoomArrow"
                    ref="arrow"
                    style="animation-duration: .2s"
                  >
                    <i class="material-icons">keyboard_arrow_down</i>
                  </div>
                </transition>-->
              </div>
              <!-- End msg-box -->
            </div>
            <!-- End inbox-detail -->
          </router-link>
          <!-- End item-inbox -->
        </template>
      </transition-group>
    </div>
    <!-- End content-box -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import code from "@/helper/father";
import ds from "@/helper/deepstream";

export default {
  data() {
    return {
      refID: "",
      moment: this.$moment,
      record: null,
      roomID: null,
      picURL: process.env.VUE_APP_PICTURE_PROFILE,
      base64: []
    };
  },
  watch: {
    roomArrow(val) {
      if (!val) this.refID = "";
    },
    txtSearch(val) {
      let fn = val.substring(1, 0);
      if (fn == "@")
        this.getRoom({
          id: this.myID,
          _page: 2,
          text: val.substring(1, 5),
          fn: "@"
        });
      else
        this.getRoom({
          id: this.myID,
          _page: 2,
          text: val,
          fn: ""
        });
      if (!val)
        this.getRoom({
          id: this.myID,
          _page: 1,
          text: val,
          fn: ""
        });
    }
  },

  mounted() {
    this.record = ds.record.getRecord(`chat`);
  },
  computed: {
    ...mapState("AppData", ["mobileMode", "txtSearch"]),
    ...mapState("Room", [
      "room",
      "userRoom",
      "roomStatus",
      "roomActive",
      "isTyping"
    ]),
    ...mapState("Chat", ["scroller"]),
    ...mapState("Identify", ["myID"]),
    ...mapState("Context", ["roomArrow"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "showInfo"]),
    ...mapActions("Chat", [
      "getMessage",
      "setScroller",
      "getUserRoom",
      "setRoomID",
      "setRoomType",
      "reloadMessage"
    ]),
    ...mapActions("Room", [
      "setRoom",
      "getRoom",
      "roomCheck",
      "setRoomActive",
      "setIsTyping",
      "setIsOnline",
      "setRoomBody",
      "setRoomListData",
      "getParticipantRoom",
      "getUserRoom",
      "roomListData",
      "getCountReadMsg"
    ]),
    ...mapActions("Group", ["getParticipantId", "setGroup"]),
    ...mapActions("Contact", ["getContact"]),
    ...mapActions("Context", ["setRoomArrow"]),
    checkTime(mydate) {
      const cw = this.moment(mydate).isSame(new Date(), "week");
      let week = "";
      if (cw) week = "dddd";
      else week = "DD/MM/YYYY";

      return this.moment(mydate).calendar(null, {
        sameDay: "h:mm A",
        lastDay: "[Yesterday]",
        lastWeek: week,
        sameElse: "DD/MM/YYYY"
      });
    },
    chat(uid, rid, rtype) {
      this.roomID = rid;

      ds.event.subscribe(`chatroom/${rid}`, data => {
        if (data)
          if (data.rid == this.roomID) {
            this.getMessage({ rid: rid, limit: 30 });
          }
      });

      setTimeout(() => {
        this.onChatClick({ cnt: true, module: "" });
      }, 100);

      this.showInfo(false);
      this.setRoomListData({ uid: uid, rid: rid, rtype: rtype });
      this.getParticipantRoom({ uid: this.myID, rid: rid });
      this.getParticipantId({ uid: this.myID, rid: rid });
      this.getUserRoom({ uid: uid });

      this.getCountReadMsg({ uid: this.myID, rid: rid });
      this.setRoomType(rtype);
      this.setRoomID(rid);
      this.roomCheck({ uid: uid, rid: rid, rtype: rtype });
      this.getMessage({ rid: rid, limit: 30 });

      this.record.subscribe(`typing/${rid}`, this.getTyping, true);
      this.record.subscribe(`online/${uid}`, this.getOnline, true);
    },
    getOnline(data) {
      if (data) if (data.user != this.myID) this.setIsOnline(data);
    },
    getTyping(data) {
      if (data)
        if (data.sender != this.myID && data.roomID == this.roomID)
          this.setIsTyping(data.type);
    },
    getFirstname(name) {
      if (name) return name.split(" ")[0];
    },
    userRoomCheck(item) {
      if (item.rtype == 1) {
        if (item.uid == this.myID) return "You: ";
        else return "";
      } else {
        if (item.uid == this.myID) return "You: ";
        else return `${this.getFirstname(item.sender)}: `;
      }
    },
    async imgSource(item, index) {
      let img = document.createElement("img");
      const src = `${this.picURL}${
        item.rtype == 1 ? item.myid : item.rid
      }/icon/${item.rtype == 1 ? item.picture : item.rimg}`;

      localStorage.setItem("imgSrc", JSON.stringify([]));
      img.src = src;

      img.onload = () => {
        var oc = document.createElement("canvas"),
          octx = oc.getContext("2d");
        oc.width = img.width;
        oc.height = img.height;
        octx.drawImage(img, 0, 0);
        this.base64.push(oc.toDataURL());
        if (JSON.parse(localStorage.getItem("imgSrc")).length < index)
          localStorage.setItem("imgSrc", JSON.stringify(this.base64));
      };

      setTimeout(() => {
        console.log(JSON.parse(localStorage.getItem("imgSrc"))[index]);
      }, 100);

      return img.src;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/Room.scss";
.flip-list-move {
  transition: transform 0.3s;
}
</style>
