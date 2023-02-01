<template>
  <div id="logIn">
    <div id="buttonDiv"></div>
  </div>
</template>

<script>
import { inject } from 'vue'
import axios from 'axios'
import jwtDecoder from 'vue-jwt-decode'

export default {
  setup() {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    let script = document.createElement('script')
    script.async = true
    script.src = 'https://accounts.google.com/gsi/client'
    document.head.appendChild(script)
    function handleCredentialResponse(response) {
      var credential = response.credential
      console.log("Encoded JWT ID token: " + credential)
      axios.post('http://localhost:3000/login/google', {
        credential: credential
      }, { withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
       }).then((res) => {
        const access_decode = jwtDecoder.decode(res.data.accessToken);
        // window.location.href = '/'
      }).catch((err) => {
        console.log(err)
      })
    }
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "1066142769848-nb4mnr77e05v52jjpear80vu8mvjvt6v.apps.googleusercontent.com",
        callback: handleCredentialResponse
      })
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      )
      // google.accounts.id.prompt() // also display the One Tap dialog
    }
    return {
      Vue3GoogleOauth,
      
    }
  }
}
</script>
<style>

</style>
