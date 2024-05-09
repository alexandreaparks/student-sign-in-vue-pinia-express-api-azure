import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')  // create studentAPI object using mande

// define store takes the name of the store and a function that has data the store uses
export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref( [] )
    const mostRecentStudent = ref( {} )  // empty object
    const addNewStudentErrors = ref( [] )

    // can also store functions in pinia store to be used by all components

    // makes GET request to API - API runs a DB query and returns all the students
    function getAllStudents() {
        studentAPI.get().then( students => {
            sortedStudents.value = students  // save the list of students returned from API in studentList
        })
    }

    // makes POST request to API and then update the student list to reflect changes
    function addNewStudent(student) {
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body  // catch and store errors
        })
    }

    // makes DELETE request to API, then updates student list to reflect changes
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            mostRecentStudent.value = {}  // update welcome/goodbye messages
            getAllStudents()
        })
    }

    // makes PATCH request to API, then updates the student list to reflect changes
    function arrivedOrLeft (student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            mostRecentStudent.value = student  // update welcome/goodbye messages
            getAllStudents()
        })
    }

    const studentCount = computed(() => {
        return sortedStudents.value.length
    })


    return {  // return all variable/function/computed property names
        // reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        // functions
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        // computed properties
        studentCount
    }

})

