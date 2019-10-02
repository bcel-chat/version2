<template>
  <div id="group-member">
    <div class="container">
      <div class="header">
        <div class="header-box">
          <div class="back-button" role="button" @click="deleteGroup">
            <transition enter-active-class="animated zoomIn">
              <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
            </transition>
          </div>
          <!-- End back-button -->
          <span class="title">
            <span class="main">New group</span>
            <span class="sub" v-if="participantAdded.length <= 0">Add participants</span>
            <span class="sub" v-else>{{ _selected }}</span>
          </span>
          <div class="control-box">
            <div class="button-box">
              <div class="ico-box" role="button" @click="searchToggle(true)">
                <i class="material-icons">search</i>
              </div>
            </div>
            <!-- End button-box -->
          </div>
          <!-- End control-box -->
        </div>
        <!-- End header-box -->
        <transition
          tag="span"
          class="icbox"
          name="bounce-edit"
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <div class="search-box" v-if="searchBox" style="animation-duration: .2s">
            <div class="header-box">
              <div class="search-icon-box" role="button" @click="searchToggle(false)">
                <i class="material-icons">arrow_back</i>
              </div>
              <!-- End search-icon-box -->
              <div class="search-input-box">
                <input
                  type="text"
                  ref="search"
                  placeholder="Search"
                  autofocus
                  v-model="txtSearch"
                  class="search"
                />
              </div>
              <!-- End search-input-box -->
              <div class="search-icon-box" v-if="txtSearch" @click="clearSearch" role="button">
                <i class="material-icons">clear</i>
              </div>
              <!-- End search-icon-box -->
            </div>
            <!-- End header-box -->
          </div>
          <!-- End search-box -->
        </transition>
      </div>
      <!-- End header -->
      <div class="members-section" :style="participantAdded.length > 0 ? styling.border : ''">
        <div class="members-section-inside">
          <transition-group
            tag="div"
            class="members-box"
            :style="participantAdded.length > 0 ? styling.pad : ''"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <template v-for="item in participantAdded">
              <Chip :values="item" :key="item.uid" style="animation-duration: .2s"></Chip>
            </template>
          </transition-group>
        </div>
      </div>
      <transition-group tag="div" enter-active-class="animate fadeInUp" class="content">
        <Contact v-if="startUp" key="1" :style="styling.all" />
      </transition-group>
      <transition enter-active-class="animated fadeIn">
        <div id="footer" v-if="participantAdded.length > 0" :style="styling.all">
          <span class="btn-next" role="button" @click="showGroupSubject(true)">
            <i class="material-icons">arrow_forward</i>
          </span>
        </div>
      </transition>
      <!-- End content -->
    </div>
    <!-- End container -->
  </div>
</template>

<script>
import Contact from "@/components/sidebars/GroupContact.vue";
import Chip from "./subcomponents/Chip.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    Contact,
    Chip
  },
  data() {
    return {
      members: [{ name: "ສຸວັນນະ ສອນທະລີ" }],
      styling: {
        all: {
          animationDuration: ".2s"
        },
        border: {
          borderBottom: "solid 0.063rem rgba(136, 152, 170, .12)"
        },
        pad: {
          padding: "1rem .8rem"
        }
      },
      startUp: false,
      txtSearch: "",
      searchBox: false
    };
  },
  watch: {
    txtSearch(val) {
      this.setTxtSearch(val);
    }
  },
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 300);
  },
  computed: {
    ...mapState("Group", ["participantAdded"]),
    ...mapGetters("Group", ["_selected"])
  },
  methods: {
    ...mapActions("AppData", [
      "showNewChat",
      "showGroupSubject",
      "setTxtSearch"
    ]),
    ...mapActions("Group", ["deleteGroup"]),
    searchToggle(e) {
      this.searchBox = e;
      this.$nextTick(() => {
        this.clearSearch();
      });
    },
    clearSearch() {
      this.txtSearch = "";
      if (this.searchBox) this.$refs.search.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/AddParticipant.scss";
</style>