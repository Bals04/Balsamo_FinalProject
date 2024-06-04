<template>
  //log in form
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          
        >
          Login
        </button>
        <button @click="navigateTo('users')">Navigate</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const router = useRouter();


const login = async () => {
  try {
    const formData = {
      username: email.value,
      password: password.value
    };

    const response = await axios.post(`http://localhost:8080/auth`, formData);
    console.log(response.status);
    console.log('Logged in successfully!', response.data);
    router.push('/users');

  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>


