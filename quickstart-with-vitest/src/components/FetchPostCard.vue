<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const post = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchPost = async () => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/post/1')
    post.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div>
    <div v-if="post">
      <h1 data-testid="post-title">{{ post.title }}</h1>
      <p data-testid="post-body">{{ post.body }}</p>
    </div>
    <div v-if="loading" data-testid="loader">Loading...</div>
    <div v-if="error" data-testid="error-message">{{ error }}</div>
  </div>
</template>
