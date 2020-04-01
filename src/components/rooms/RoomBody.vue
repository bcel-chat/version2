<template>
  <div id="room-body" @dragover.prevent="setDropBox(true)">
    <div class="_container" ref="readScroll" @scroll="toScroll">
      <div class="room-inside">
        <div class="bb-space">
          <div class="room-logo" v-if="!message">
            <img class="logo" draggable="false" src="@/assets/img/logo_2.png" />
          </div>
        </div>
        <div class="bubble-wrapper" v-if="message">
          <template v-for="(msg, index) in message">
            <div :key="index" :style="[ mobileMode ? 'user-select: none' : '']">
              <bubble-date v-if="checkTime(index, msg.time) != null" :msg="msg.time"></bubble-date>
              <bubble-new-group v-if="msg.type == 2" :msg="msg"></bubble-new-group>
              <BubbleText v-else-if="msg.type == 1" :msg="msg" :index="index"></BubbleText>
              <bubble-mention v-if="msg.type == 3" :msg="msg"></bubble-mention>
              <bubble-picture v-if="msg.type == 4" :msg="msg"></bubble-picture>
              <bubble-sticker v-if="msg.type == 5" :msg="msg"></bubble-sticker>
            </div>
          </template>
          <BubblePictureDraf v-if="pictureStatus.display && pictureStatus.success == roomID"></BubblePictureDraf>
        </div>
      </div>
    </div>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <div class="to-bottom" v-if="toBottomDisplay">
        <div class="circle" @click="goBottom" role="button">
          <i class="material-icons">double_arrow</i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BubbleNewGroup from "./bubbles/bubbleNewGroup";
import BubbleText from "./bubbles/bubbleText.vue";
import BubbleMention from "./bubbles/bubbleMention.vue";
import BubblePictureDraf from "./bubbles/bubblePicture_draf.vue";
import BubblePicture from "./bubbles/bubblePicture.vue";
import BubbleDate from "./bubbles/bubbleDate.vue";
import BubbleSticker from "./bubbles/bubbleSticker.vue";
import { mapState, mapActions } from "vuex";
import ds from "@/helper/deepstream";
import { debounce } from "lodash";

export default {
  components: {
    BubbleNewGroup,
    BubbleDate,
    BubbleText,
    BubbleMention,
    BubblePictureDraf,
    BubblePicture,
    BubbleSticker
  },
  data() {
    return {
      moment: this.$moment,
      chat_id: [],
      i: 1,
      roomList: "",
      record: null,
      timeOut1: null,
      timeOut2: null,
      toBottomDisplay: false
    };
  },
  watch: {
    $route(to, from) {
      ds.event.unsubscribe(`chatroom/${from.params.id}`);
      // ds.event.emit(`chatroom/${this.roomListData.rid}`, this.roomListData.rid);
      this.clearMessage();
    },
    reload(val) {
      this.$nextTick(() => {
        if (
          val.rid == this.roomListData.rid &&
          val.uid == this.roomListData.uid
        )
          this.$refs.readScroll.scrollTop = this.$refs.readScroll.scrollHeight;
        else if (val.rid == this.roomListData.rid && !this.toBottomDisplay) {
          this.$refs.readScroll.scrollTop = this.$refs.readScroll.scrollHeight;
          setTimeout(() => {
            ds.event.emit(
              `chatroom/${this.roomListData.rid}`,
              this.roomListData.rid
            );
          }, 100);
        }
      });
    }
  },
  beforeMount() {
    clearTimeout(this.timeOut1);
    clearTimeout(this.timeOut2);
    // this.roomList = this.roomListData;
  },
  mounted() {
    //this.getData(this.roomListData);
    this.record = ds.record.getRecord(`chat`);
    // if (this.mobileMode)
    //   document.addEventListener("contextmenu", e => e.preventDefault());

    setTimeout(() => {
      window.scrollTo(0, this.$refs.readScroll.scrollHeight);
      // this.$refs.readScroll.scrollTop = this.$refs.readScroll.scrollHeight;
    }, 200);
  },
  computed: {
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Identify", ["myID"]),
    ...mapState("Chat", [
      "message",
      "roomID",
      "scroller",
      "pictureStatus",
      "reload"
    ]),
    ...mapState("Room", ["countReadMsg", "roomListData"])
  },
  methods: {
    ...mapActions("Chat", [
      "getUserRoom",
      "setRoomID",
      "setRoomType",
      "setScroller",
      "clearMessage",
      "getMessage",
      "reloadMessage",
      "moreMessage"
    ]),
    ...mapActions("Room", ["getUserRoom", "getCountReadMsg", "roomCheck"]),
    ...mapActions("Context", ["setDropBox"]),
    getData(val) {
      this.clearMessage();
      this.getCountReadMsg({ uid: this.myID, rid: val.rid });
      this.setRoomType(val.rtype);
      this.setRoomID(val.rid);
      this.roomCheck({ uid: val.uid, rid: val.rid, rtype: val.rtype });
      this.timeOut1 = setTimeout(() => {
        this.getMessage(val.rid);
        this.timeOut2 = setTimeout(() => {
          this.setScroller({
            uid: this.myID,
            rid: val.rid,
            page: 1
          });
        }, 100);
      }, 100);
    },
    checkTime(index, mydate) {
      let i;
      if (index > 0) {
        if (
          this.moment(this.message[index - 1].time).format("YYYY-MM-DD") ==
          this.moment(this.message[index].time).format("YYYY-MM-DD")
        ) {
          i = null;
        } else {
          i = mydate;
        }
      } else {
        i = mydate;
      }
      return i;
    },
    toScroll(e) {
      if (e.target.scrollTop == 0) {
        this.moreMessage({ rid: this.roomListData.rid, limit: 60 });
        // this.$refs.readScroll.scrollTop = 100 * 21;
      }

      let height = e.target.scrollHeight - e.target.clientHeight;
      if (e.target.scrollTop < height - 50) this.toBottomDisplay = true;
      else this.toBottomDisplay = false;
    },
    goBottom() {
      this.$refs.readScroll.scrollTop = this.$refs.readScroll.scrollHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/RoomBody.scss";
</style>
