import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')  // create studentAPI object using mande

// define store takes the name of the store and a function that has data the store uses
export const useStudentStore = defineStore('students', () => {

    const studentList = ref( [] )

    const mostRecentStudent = ref( {} )  // empty object

    // function to make API call - API runs a DB query and returns all the students
    function getAllStudents() {
        studentAPI.get().then( students => {
            studentList.value = students  // save the list of students returned from API in studentList
        })
    }

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
        getAllStudents,

        // computed properties
        studentCount,
        sortedStudents
    }

})

