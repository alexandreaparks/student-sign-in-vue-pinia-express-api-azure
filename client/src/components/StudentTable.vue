<script setup>

import { useStudentStore } from '../stores/StudentStore.js'  // importing store into component

import { storeToRefs } from 'pinia' // import to convert data in store into refs within this component

const studentStore = useStudentStore()  // reference the store

const { sortedStudents, studentCount } = storeToRefs(studentStore)  // convert data in store to ref in this component

const deleteStudent = (student) => {
  studentStore.deleteStudent(student)  // use studentStore function deleteStudent
}

const arrivedOrLeft = (student) => {
  studentStore.arrivedOrLeft(student)
}

</script>

<template>

  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>

    <h5 class="card-subtitle text-muted" v-if="studentCount === 1">{{ studentCount }} student in class</h5>
    <h5 class="card-subtitle text-muted" v-else>{{ studentCount }} students in class</h5>

    <div id="student-table">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th>Delete?</th>
        </tr>
        </thead>

        <tbody>
          <!-- create table rows
          Each row will have a checkbox, bound to the app's data
          When the checkbox is checked/unchecked,
          the student will be signed in/out -->

          <!-- add present class if the student is present, add absent if the student is not present-->
          <tr v-for="student in sortedStudents" v-bind:class="{ present: student.present, absent: !student.present}">

            <td>{{ student.name }}</td>
            <td>{{ student.starID }}</td>
            <td>
              <input type="checkbox" v-model="student.present" v-on:change="arrivedOrLeft(student)">
              <span v-if="student.present" class="mx-3">Here!</span>
              <span v-else class="mx-3">Not present</span>
            </td>
            <td><button v-on:click="deleteStudent(student)" class="btn btn-danger">
              <i class="bi bi-trash-fill"></i> Delete
            </button>
            </td>

          </tr>

        </tbody>

      </table>
    </div>
  </div>

</template>

<style scoped>

#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}

</style>