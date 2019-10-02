<template>
  <div id="room">
    <div class="chatroom-container">
      <div id="head">
        <RoomHead></RoomHead>
      </div>
      <div id="body">
        <RoomBody v-if="roomBody"></RoomBody>
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
import { mapState } from "vuex";

export default {
  components: {
    RoomHead,
    RoomBody,
    RoomFooter
  },
  computed: {
    ...mapState("Room", ["userRoom", "roomBody"]),
    ...mapState("Chat", ["message"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/rooms/RoomIndex.scss";
</style>