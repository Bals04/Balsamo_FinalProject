<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="form-container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-72">
      <h1 class="text-center text-gray-700 text-xl font-bold mb-4">UPDATE FORM</h1>
      <div class="mb-4">
        <label for="lastname" class="block text-gray-700 font-bold mb-2">Last Name:</label>
        <input v-model="lastname" type="text" id="lastname" name="lastname" required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="firstname" class="block text-gray-700 font-bold mb-2">First Name:</label>
        <input v-model="firstname" type="text" id="firstname" name="firstname" required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <button @click="updateInfo"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
        UPDATE
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

// Define reactive state for the form fields
const lastname = ref('');
const firstname = ref('');

const router = useRouter();

const updateInfo = async () => {
  try {
    const formData = {
      lastname: lastname.value,
      firstname: firstname.value
    };

    const response = await axios.put(`http://localhost:8080/api/${id}`, formData);
    console.log(response.status);
    console.log('Form updated successfully!', response.data);
    router.push('/users');

  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>


