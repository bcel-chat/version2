<template>
  <span class="chip-box">
    <span class="chip-avatar">
      <img
        class="avatar"
        v-if="values.picture"
        :src="`${picURL+values.uid}/icon/${values.picture}`"
      />
      <!-- <img class="avatar-default" v-else src="@/assets/img/user.svg" /> -->
      <i class="material-icons avatar-default" v-else>person_outline</i>
    </span>
    <span class="chip-name">{{ values.displayname }}</span>
    <span
      class="chip-close"
      role="button"
      @click="setParticipant({
                        rid: roomID,
                        uid: values.uid,
                        assigner: myID,
                        _page: 2
                      })"
    >
      <i class="material-icons ic">close</i>
    </span>
  </span>
</template>

<script>
import { mapActions, mapState } from "vuex";
import code from "@/helper/father";

export default {
  props: ["values"],
  data() {
    return {
      picURL: process.env.VUE_APP_PICTURE_PROFILE
    };
  },
  computed: {
    ...mapState("Identify", ["myID"]),
    ...mapState("Group", ["roomID"])
  },
  methods: {
    ...mapActions("Group", ["setParticipant"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.chip-box {
  display: flex;
  height: 1.6rem;
  align-items: center;
  justify-content: center;
  margin: 0.4rem;
  border-radius: 1rem;
  border: solid 0.01rem $info-color;
  box-shadow: 0 0.1rem 0.4em 0.03rem $secondary-shadow-color;
}

.chip-avatar {
  position: relative;
  height: 100%;
  width: 1.6rem;
  border-radius: 50%;
  background-color: #cf95f5;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .avatar-default {
    position: relative;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
  }
}

.chip-name {
  margin: 0 0.5rem;
  color: $semi-secondary-color;
  line-height: 100%;
  font-size: 0.8rem;
}

.chip-close {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: $primary-color;
  margin-right: 0.2rem;

  i.material-icons {
    color: white;
    font-size: 0.8rem !important;
  }
}
</style>
