import * as BASE from "./base.js";

let studentList = [];

const fetchStudentList = () => {
    axios({
        url: `${BASE.BASE_URL}${BASE.GET_LIST_STUDENT_URL}`,
        method: "GET"
    })
    .then((res) => {
        studentList = res.data
        showListStudent();
    })
    .catch((error) => {
        console.log({...error});
    });
}

let showListStudent = () => {
    let tableDanhSach = document.querySelector("#tableDanhSach");
    tableDanhSach.innerHTML = "";
    let htmlContent = "";
    for (let student of studentList) {
        htmlContent += `
            <tr>
                <td>${student.MaSV}</td>
                <td>${student.HoTen}</td>
                <td>${student.Email}</td>
                <td>${student.SoDT}</td>
                <td>${student.DiemToan}</td>
                <td>${student.DiemLy}</td>
                <td>${student.DiemHoa}</td>
                <td>
                    <button class="btn btn-success" onclick="getInforStudent('${student.MaSV}')">Update</button>
                    <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">Delete</button>
                </td>
            </tr>
        `;
    }
    tableDanhSach.innerHTML = htmlContent;
}

const getDataStudentFromForm = () => {
    const studentID = document.querySelector("#id").value.trim();
    const studentName = document.querySelector("#name").value.trim();
    const studentEmail = document.querySelector("#email").value.trim();
    const studentPhone = document.querySelector("#phone").value.trim();
    const studentIdCard = document.querySelector("#idCard").value.trim();
    const studentMath = document.querySelector("#math").value.trim();
    const studentPhysics = document.querySelector("#physics").value.trim();
    const studentChemistry = document.querySelector("#chemistry").value.trim();
    let student = new Student(studentID, studentName, studentEmail, studentPhone, studentIdCard, studentMath, studentPhysics, studentChemistry);

    return student;
}

const resetDataForm = () => {
    document.querySelector("#btnReset").click();
    document.querySelector("#id").removeAttribute("disabled");

}

const addNewStudent = () => {
    resetDataForm();
    let student = getDataStudentFromForm();
    axios({
        url: `${BASE.BASE_URL}${BASE.ADD_NEW_STUDENT_URL}`,
        method: 'POST',
        data: student,
    })
    .then((res) => {
        fetchStudentList();
        $('#myModal').modal('hide');
    })
    .catch((error) =>{
        console.log({...error});
    });
}

const deleteStudent = id => {
    axios({
        url: `${BASE.BASE_URL}${BASE.DELETE_STUDENT_BY_ID_URL}/${id}`,
        method: "DELETE"
    })
    .then((res) => {
        fetchStudentList();
    })
    .catch((error) => {
        console.log({...error});
    })
}

const getInforStudent = id => {
    axios({
        url: `${BASE.BASE_URL}${BASE.GET_STUDENT_BY_ID_URL}/${id}`,
        method: 'get'
    })
    .then(res => {
        let student = res.data;
        //trigger btn add
        document.querySelector("#btnThem").click();
        fillDataStudent(student);
    })
    .catch(error => {
        console.log({...error});
    })
}

const fillDataStudent = student => {
    document.querySelector("#id").value = student.MaSV;
    document.querySelector("#name").value = student.HoTen;
    document.querySelector("#email").value = student.Email;
    document.querySelector("#phone").value = student.SoDT;
    document.querySelector("#idCard").value = student.CMND;
    document.querySelector("#math").value = student.DiemToan;
    document.querySelector("#physics").value = student.DiemLy;
    document.querySelector("#chemistry").value = student.DiemHoa;
    document.querySelector("#id").setAttribute("disabled", true);
}

const updateStudent = () => {
    
    let student = getDataStudentFromForm();
    axios({
        url: `${BASE.BASE_URL}${BASE.UPDATE_STUDENT_URL}`,
        method: 'PUT',
        data: student
    })
    .then( res => {
        fetchStudentList();
        $('#myModal').modal('hide');
    })
    .catch(error => {
        console.log({...error});
    })
}

fetchStudentList();
window.addNewStudent = addNewStudent;
window.deleteStudent = deleteStudent;
window.getInforStudent = getInforStudent;
window.updateStudent = updateStudent;
