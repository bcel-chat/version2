<template>
  <div id="new-chat">
    <div class="container">
      <div class="header">
        <div class="header-box">
          <div class="back-button" role="button" @click="showNewChat(false)">
            <transition enter-active-class="animated zoomIn">
              <i class="material-icons" v-if="startUp" key="1">arrow_downward</i>
            </transition>
          </div>
          <!-- End back-button -->
          <span class="title">New chat</span>
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
      <div class="new-group-box">
        <div class="ng-btn-box">
          <transition enter-active-class="animated zoomIn">
            <button
              class="btn-new-group"
              :style="styling.all"
              v-if="startUp"
              role="button"
              @click="newGroup"
            >
              <i class="material-icons">group_add</i>
              <span>New group</span>
            </button>
          </transition>
        </div>
        <!-- End ng-btn-box -->
      </div>
      <!-- End new-group-box -->
      <transition-group tag="div" enter-active-class="animate fadeInUp" class="content">
        <Contact v-if="startUp" key="1" :style="styling.all" />
      </transition-group>
      <!-- End content -->
    </div>
    <!-- End container -->
  </div>
</template>

<script>
import Contact from "@/components/sidebars/Contact.vue";
import { mapActions, mapState } from "vuex";
import code from "@/helper/father.js";

export default {
  components: {
    Contact
  },
  data() {
    return {
      startUp: false,
      styling: {
        all: {
          animationDuration: ".2s"
        }
      },
      txtSearch: "",
      searchBox: false
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
  mounted() {
    setTimeout(() => {
      this.startUp = true;
    }, 300);
  },
  computed: {
    ...mapState("Identify", ["myID"])
  },
  methods: {
    ...mapActions("AppData", ["showNewChat", "showAddParticipant"]),
    ...mapActions("Group", ["setGroup"]),
    ...mapActions("Contact", ["getContact"]),
    searchToggle(e) {
      this.searchBox = e;
      this.$nextTick(() => {
        this.clearSearch();
      });
    },
    clearSearch() {
      this.txtSearch = "";
      if (this.searchBox) this.$refs.search.focus();
    },
    newGroup() {
      this.setGroup({
        rid: 0,
        uid: this.myID,
        name: "name",
        img: "img",
        active: 0,
        _page: 1
      });

      this.showAddParticipant(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sidebars/NewChat.scss";
</style>