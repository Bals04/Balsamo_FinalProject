<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <div class="mb-4">
        <label for="lastname" class="block text-gray-700 font-bold mb-2">Last Name:</label>
        <input type="text" id="lastname" v-model="lastName" required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="firstname" class="block text-gray-700 font-bold mb-2">First Name:</label>
        <input type="text" id="firstname" v-model="firstName" required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="flex items-center justify-between">
        <button type="submit"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      lastName: '',
      firstName: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const formData = {
          lastname: this.lastName,
          firstname: this.firstName
        };
        const response = await axios.post('http://localhost:8080/api', formData);
        console.log(response.status);
        console.log('Form submitted successfully!', response.data);
        this.$router.push('/users');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }
};
</script>

