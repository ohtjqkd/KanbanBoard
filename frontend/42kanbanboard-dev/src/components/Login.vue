<template>
  <div id="logIn">
      Log화면
      <button @click="handleLogin">Google ID로 로그인</button>
  </div>
</template>

<script>
export default {
  methods: {
    async handleLogin () {
      try {
        const GoogleUser = await this.$gAuth.signIn()
        console.log(GoogleUser)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style>

</style>
