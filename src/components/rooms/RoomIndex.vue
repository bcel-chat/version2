<template>
  <div id="room">
    <div class="chatroom-container">
      <div id="head">
        <RoomHead></RoomHead>
      </div>
      <div id="body">
        <RoomBody></RoomBody>
      </div>
      <div id="footer">
        <RoomFooter></RoomFooter>
      </div>
    </div>
  </div>
</template>

<script>
import RoomHead from "@/components/rooms/RoomHeader.vue";
import RoomBody from "@/components/rooms/RoomBody.vue";
import RoomFooter from "@/components/rooms/RoomFooter.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    RoomHead,
    RoomBody,
    RoomFooter
  },
  computed: {
    ...mapState("Room", ["userRoom", "roomBody"]),
    ...mapState("Chat", ["message"])
  },
  methods: {
    ...mapActions("AppData", ["onChatClick", "setModuleLink"]),
    ...mapActions("Room", ["setRoomActive"])
  },
  beforeDestroy() {
    this.onChatClick({ cnt: false, module: "" });
    this.setRoomActive({
      status: false,
      rid: ""
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/RoomIndex.scss";
</style>