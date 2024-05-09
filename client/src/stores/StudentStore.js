import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// define store takes the name of the store and a function that has data the store uses
export const useStudentStore = defineStore('students', () => {

    const studentList = ref([
        { name: 'Alexandrea', starID: 'yy2888bl', present: false },
        { name: 'Zoey', starID: 'ha2601yj', present: false },
        { name: 'Austin', starID: 'uh2654gd', present: false }

    ])

    const mostRecentStudent = ref( {} )  // empty object

    // can also store functions in pinia store to be used by all components
    function addNewStudent(student) {
        studentList.value.push(student)
    }

    function deleteStudent(studentToDelete) {
        studentList.value = studentList.value.filter( (student) => {
            return studentToDelete !== student  // filters list to only include students that are not equal to studentToDelete
        })
    }

    function arrivedOrLeft (student) {
        mostRecentStudent.value = student  // assign the student passed to this function to be the mostRecentStudent
    }

    const studentCount = computed(() => {
        return studentList.value.length
    })

    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        } )
    })


    return {  // return all variable/function/computed property names
        // reactive data
        studentList,
        mostRecentStudent,

        // functions
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        // computed properties
        studentCount,
        sortedStudents
    }

})

