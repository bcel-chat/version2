<template>
  <div id="emoji">
    <div class="header-tab">
      <template v-for="(tab, index) in tabs">
        <span
          :title="tab.title"
          :key="index"
          :class="['tab', indexDef == index ? 'active' : '']"
          @click="selectIcon(index)"
          role="button"
        >
          <i class="material-icons">{{tab.icon}}</i>
        </span>
      </template>
    </div>
    <div class="emoji-tab">
      <div class="emoji-tab-inner">
        <template v-for="(emoji, index) in emojis">
          <div
            class="emoji"
            :title="emoji.name"
            :key="index"
            role="button"
            @touchstart="sticker(emoji)"
          >
            <img class="img-emoji" :src="emoji.path" alt srcset />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      indexDef: 0,
      recently: [],
      emojis: JSON.parse(localStorage.getItem("emojis")),
      tabs: [
        {
          title: "Emoji",
          icon: "sentiment_very_satisfied"
        }
      ]
    };
  },
  mounted() {
    this.recently = JSON.parse(localStorage.getItem("recently"));
  },
  methods: {
    ...mapActions("Context", ["setStickerBox"]),
    selectIcon(val) {
      this.indexDef = val;
    },
    sticker(emoji) {
      this.setStickerBox({ status: true, name: emoji.name, src: emoji.src });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#emoji {
  position: relative;
  width: 100%;
  height: 13rem;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.header-tab {
  position: relative;
  display: flex;
  width: 100%;
  height: 2.5rem;
  background-color: $info-color;

  .tab {
    display: flex;
    align-items: center;
    color: #9faabd;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  .active {
    color: $secondary-color;
    border-bottom: solid 2px $primary-color;
  }
}
.emoji-tab {
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  overflow: auto;
  padding: 0.3rem;
  background-color: white;
  border-radius: 0.2rem;
  .emoji-tab-inner {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .emoji {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      margin: 2px;
      padding: 5px;
      transition: all 0.2s;

      &:active {
        background-color: #9faabd;
        border-radius: 3px;
        box-shadow: inset 0px 0px 3px 1px rgba(32, 52, 65, 0.3);
      }

      @media screen and (min-width: 370px) {
        width: 48px;
        height: 48px;
      }

      @media screen and (min-width: 400px) {
        width: 53px;
        height: 53px;
      }

      @media screen and (min-width: 760px) {
        width: 56px;
        height: 56px;
        &:hover {
          background-color: $info-color;
        }
      }

      .img-emoji {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>