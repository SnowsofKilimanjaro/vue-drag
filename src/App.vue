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

<style >
#app,html{
 height: 100%;
}
body{
  height: calc(100% - 16px);
}
</style>
