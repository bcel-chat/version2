<template>
  <!-- <div id="drawer">
        <Settings v-if="sidebar" key="1" :style="styling"></Settings>
        <NewChat v-else-if="newChat" key="2" :style="styling"></NewChat>
        <AddParticipant v-else-if="addParticipant" key="3" :style="styling"></AddParticipant>
        <GroupSubject v-if="GroupSubject" key="4" :style="styling"></GroupSubject>
  </div>-->
  <router-view name="drawer"></router-view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>