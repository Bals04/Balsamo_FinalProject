<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Users</h1>
      <button class="bg-red-500 py-2 px-4 rounded-lg text-white" @click="logout()">LOGOUT</button>

    </div>
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b bg-gray-800 text-white">ID</th>
          <th class="py-2 px-4 border-b bg-gray-800 text-white">Lastname</th>
          <th class="py-2 px-4 border-b bg-gray-800 text-white">Firstname</th>
          <th class="py-2 px-4 border-b bg-gray-800 text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ user.ID }}</td>
          <td class="py-2 px-4 border-b">{{ user.Lastname }}</td>
          <td class="py-2 px-4 border-b">{{ user.Firstname }}</td>
          <td class="py-2 px-4 border-b flex space-x-2">
            <button @click="navigateToUpdateForm(user.ID)" class="action-btn-update">Update</button>
            <button @click="deleteUser(user.ID)" class="action-btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 flex justify-start">
      <button @click="navigateTo('/new')" class="action-btn">NEW</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('http://localhost:8080/api/load'); 
        this.users = response.data;
      } catch (error) {
        console.error('Error making GET request:', error);
      }
    },
    navigateToUpdateForm(id) {
      this.$router.push(`/updateForm/${id}`);
    },
    async deleteUser(userId) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/${userId}`);
        this.users = this.users.filter(user => user.ID !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async logout() {
      this.$router.push('/'); 
    }
  },
};
</script>

<style scoped>
.action-btn {
  @apply bg-green-500 text-white py-2 px-4 rounded-md;
}
.action-btn-update {
  @apply bg-blue-500 text-white py-2 px-4 rounded-md;
}
.action-btn-delete {
  @apply bg-red-500 text-white py-2 px-4 rounded-md;
}
.action-btn:hover, .action-btn-update:hover, .action-btn-delete:hover {
  @apply bg-opacity-75;
}
</style>
