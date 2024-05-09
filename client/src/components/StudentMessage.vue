<script setup>

import { useStudentStore } from '../stores/StudentStore.js'  // importing store into component

import { storeToRefs } from 'pinia' // import to convert data in store into refs within this component

const studentStore = useStudentStore()  // reference the store

const { mostRecentStudent } = storeToRefs(studentStore)  // convert mostRecentStudent in store to ref in this component

</script>

<template>

  <div id="welcome-or-goodbye-message" class="m-2">

    <!-- show a message when a student arrives or leaves  -->
    <div v-if="mostRecentStudent.name">

      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome {{ mostRecentStudent.name }}!
      </div>
      <div v-else class="alert alert-info">
        Goodbye {{ mostRecentStudent.name }}, see you later!
      </div>

    </div>


  </div>

</template>

<style scoped>

</style>