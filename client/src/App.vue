<script setup>

import { onMounted } from 'vue'

import NewStudentForm from "./components/NewStudentForm.vue"
import StudentMessage from "./components/StudentMessage.vue"
import StudentTable from "./components/StudentTable.vue"

import { useStudentStore } from './stores/StudentStore.js'  // import pinia store

const studentStore = useStudentStore()  // call studentStore and store in studentStore

onMounted( () => {
  // onMounted is called, and this code will run when the component is first mounted (displayed)
  studentStore.getAllStudents()  // call the function in the pinia store that makes the API call
})
</script>

<template>

  <NewStudentForm></NewStudentForm>

  <StudentTable></StudentTable>

  <StudentMessage></StudentMessage>

</template>

<style scoped>

</style>
