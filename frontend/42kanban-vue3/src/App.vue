<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-if="user" @click="handleLogin">{{user}}</div>
    <div v-if="!user" @click="handleLogin">Vue3GoogleOauth.</div>
    <router-view />
  </div>
</template>

<script>
import { getCurrentInstance, inject } from '@vue/runtime-core'

export default {
  name: 'App',
  setup() {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    const app = getCurrentInstance()
    const user = app.appContext.config.user;
    console.log(user);
    return {
      Vue3GoogleOauth,
      user
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
