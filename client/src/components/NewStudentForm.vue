<script setup>

import {ref, watch} from 'vue'
import { useStudentStore } from '../stores/StudentStore.js'
import {storeToRefs} from "pinia";

const studentStore = useStudentStore()  // reference store to use for adding a new student

const newStudentName = ref('')
const newStarID = ref('')

const errors = ref([])

const { addNewStudentErrors } = storeToRefs(studentStore)

watch( addNewStudentErrors, () => {
  if (addNewStudentErrors.value) {
    alert(addNewStudentErrors.value.join('\n'))
  }
})

function addStudent() {

  errors.value = []  // reset errors array

  if (!newStudentName.value) {
    errors.value.push('Enter name')
  }
  if (!newStarID.value) {
    errors.value.push('Enter star ID')
  }

  if (errors.value.length === 0) {  // if no errors

    // build a new student object
    let student = {
      name: newStudentName.value,
      starID: newStarID.value,
      present: false
    }

    // add to list
    // add by calling addNewStudent function in the studentStore
    studentStore.addNewStudent(student)

    // clear both input fields
    newStudentName.value = ''
    newStarID.value = ''

  }


}



</script>

<template>

  <div id="new-student-form-errors" class="m-2">
    <!--show errors from form validation
        if there are errors, show the div-->
    <div v-if="errors.length > 0" class="alert alert-danger">
      <li v-for="error in errors">
        {{ error }}
      </li>
    </div>
  </div>


  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add a new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <!-- v-model newStudentName -->
      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <!-- v-model newStarID -->
      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- v-on:click event handler -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>

</template>

<style scoped>

</style>