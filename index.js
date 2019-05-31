function Student(){
    this.title = 'Student'
}

function Girl(){
    Student.call(this)
    this.sex = 'female'
}

let femaleStudent = new Girl()

console.log(femaleStudent)
