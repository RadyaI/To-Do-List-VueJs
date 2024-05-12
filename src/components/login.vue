<template>
    <h1 class="title" align="center">To Do List</h1>
    <div class="container">
        <button class="btn-login" @click="login">LOGIN</button>
    </div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '@/firebase.js'
import { getDocs, collection } from 'firebase/firestore'

export default {
    name: 'app',
    methods: {
        async login() {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const signIn = await signInWithPopup(auth, provider)
            const data = signIn.user
            // Save
            const save = {
                name: data.displayName,
                email: data.email,
                photoUrl: data.photoURL,
                provider: data.providerData
            }
            sessionStorage.setItem('loginData', JSON.stringify(save))
            sessionStorage.setItem('isLoggedIn', true)
            this.$emit('login-success', true)
        }
    },
    mounted() {
        getDocs(collection(db, 'tes'))
    }
}
</script>

<style scoped>
.title {
    position: absolute;
    left: 0;
    top: 20px;
    right: 0;
    /* bottom: 0; */
    font-size: 50px;
    /* border: 1px solid blue; */
}

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.btn-login {
    border: none;
    background-color: black;
    color: white;
    padding: 10px 30px;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 10px;
}
</style>