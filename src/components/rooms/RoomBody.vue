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
            </div>
          </template>
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
import BubblePicture from "./bubbles/bubblePicture.vue";
import BubbleDate from "./bubbles/bubbleDate.vue";
import { mapState, mapActions } from "vuex";
import ds from "@/helper/deepstream";
import { debounce } from "lodash";

export default {
  components: {
    BubbleNewGroup,
    BubbleDate,
    BubbleText,
    BubbleMention,
    BubblePicture
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
    },
    message(val) {}
  },
  beforeMount() {
    clearTimeout(this.timeOut1);
    clearTimeout(this.timeOut2);
    // this.roomList = this.roomListData;
  },
  mounted() {
    //this.getData(this.roomListData);
    this.record = ds.record.getRecord(`chat`);
    if (this.mobileMode)
      document.addEventListener("contextmenu", e => e.preventDefault());

    setTimeout(() => {
      this.$refs.readScroll.scrollTop = this.$refs.readScroll.scrollHeight;
    }, 200);

    this.$refs.readScroll.addEventListener("scroll", e => {
      // console.log(this.$refs.readScroll.scrollTop);
      // console.log(e);
    });
  },
  beforeDestroy() {
    // ds.event.unsubscribe(`chatroom/${this.roomList.rid}`);
    // ds.event.unsubscribe(`scroller/${this.roomList.rid}`);
    // this.record.unsubscribe(`typing/${this.roomList.rid}`);
    // this.record.unsubscribe(`online/${this.roomList.uid}`);
  },
  computed: {
    ...mapState("AppData", ["mobileMode"]),
    ...mapState("Identify", ["myID"]),
    ...mapState("Chat", ["message", "roomID", "scroller"]),
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
      "reloadMessage"
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
      let height = e.target.scrollHeight - e.target.clientHeight;

      if (e.target.scrollTop < height - 50) this.toBottomDisplay = true;
      else this.toBottomDisplay = false;

      // if (e.target.scrollTop == 0) {
      //   this.reloadMessage({
      //     uid: this.myID,
      //     rid: this.roomList.rid,
      //     length: this.message.length + 20
      //   });
      // }
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
