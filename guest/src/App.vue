<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
  height: 100%;

}
#app{
  height: 100%;
  min-width: 1080px;
  min-height: 720px;
  /* overflow: scroll; */
}
</style>
