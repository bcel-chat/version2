<template>
  <div class="reply-box" v-if="fileBoxData">
    <div class="reply-box-inside">
      <span class="close-box" title="Close">
        <span role="button" @click="setFileBoxToggle(false)">
          <i class="material-icons">close</i>
        </span>
      </span>
      <div class="file-box">
        <div class="file" role="button" v-for="(file, index) in fileBoxData" :key="index">
          <img class="picture" v-if="validateFile(file)" :src="convertBlob(file)" alt srcset />
          <div class="file-name-box" v-else>
            <span class="ico">
              <i class="material-icons">insert_drive_file</i>
            </span>
            <span class="file-name" :title="file.name">{{file.name}}</span>
          </div>
          <div class="pic-close" role="button" title="Cancel" @click="removeFile(file)">
            <i class="material-icons">close</i>
          </div>
        </div>
        <div class="add-box" role="button" title="Add">
          <label for="file" class="add" role="button">
            <i class="material-icons">add</i>
          </label>
          <input type="file" name="file" id="file" @change="add" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("Chat", ["fileBoxData"]),
    ...mapState("Identify", ["myID"])
  },
  methods: {
    ...mapActions("Chat", ["setFileBoxToggle", "addFile", "removeFile"]),
    convertBlob(val) {
      let blob = new Blob([val], { type: val.type });
      return URL.createObjectURL(blob);
    },
    validateFile(val) {
      let allowedExtension = ["jpeg", "jpg", "png", "gif", "bmp", "ico"];
      let fileExtension = val.name
        .split(".")
        .pop()
        .toLowerCase();
      let isValidFile = false;

      for (var index in allowedExtension) {
        if (fileExtension === allowedExtension[index]) {
          isValidFile = true;
          break;
        }
      }

      return isValidFile;
    },
    add(e) {
      this.addFile(e.target.files);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.reply-box {
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  // &::before {
  //   position: absolute;
  //   content: "";
  //   width: 0.3rem;
  //   height: 100%;
  //   background-color: $primary-color;
  //   border-radius: 0.3rem 0 0 0.3rem;
  // }

  .reply-box-inside {
    background-color: #ffffff;
    border-radius: 0.3rem;
    padding: 0.2rem 1.2rem 0.2rem 0.2rem;
    display: flex;
    height: auto;
    max-height: 12rem;
    overflow: hidden;
    .close-box {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.1rem;

      i {
        font-size: 1rem;
        color: $secondary-color;
      }
    }

    .file-box {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-flow: wrap;
      height: auto;
      width: 100%;
      overflow-y: auto;

      .file {
        position: relative;
        width: 6rem;
        height: 6rem;
        border-radius: 0.3rem;
        background-color: #ffffff;
        overflow: hidden;
        margin: 0.3rem;

        .picture {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .file-name-box {
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 0.3rem 0.3rem;
          overflow: hidden;

          .ico {
            position: absolute;
            display: flex;
            justify-content: flex-start;
            top: 0.6rem;
            left: 0.3rem;
            color: #47b6f1;
          }

          .file-name {
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 0.25rem;
          }
        }

        .pic-close {
          position: absolute;
          top: 0.2rem;
          right: 0.2rem;
          border-radius: 2rem;
          background-color: rgba(104, 104, 104, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1rem;
          width: 1rem;
          line-height: 100%;
          i {
            font-size: 0.8rem;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
      .add-box {
        justify-self: end;
        width: 3rem;
        height: 6rem;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.3rem;

        .add {
          border-radius: 2rem;
          background-color: rgba(185, 185, 185, 0.3);
          i {
            padding: 0.4rem;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
}

#file {
  display: none;
}
</style>