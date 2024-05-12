<template>
  <div>
    <login v-if="!isLoggedIn" @login-success="setLogin"></login>
    <mainPage v-if="isLoggedIn"></mainPage> 
  </div>
</template>

<script>
import login from '@/components/login.vue'
import mainPage from '@/components/mainPage.vue'

export default {
  name: 'app',
  components: {
    login: login,
    mainPage: mainPage
  },
  data() {
    return {
      isLoggedIn: sessionStorage.getItem('isLoggedIn')
    }
  },
  methods: {
    setLogin(login) {
      this.isLoggedIn = login
    }
  }
}
</script>