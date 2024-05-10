<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ body }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}
</style>
