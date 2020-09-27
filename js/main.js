import * as BASE from "./base.js";

let studentList = [];

const fetchStudentList = () => {
    axios({
        url: `${BASE.BASE_URL}${BASE.GET_LIST_STUDENT_URL}`,
        method: "GET"
    })
    .then((res) => {
        studentList = res.data
        console.log(studentList);
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
        console.log(student);
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
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.MaSV}')">Delete</button>
                </td>
            </tr>
        `;
    }
    tableDanhSach.innerHTML = htmlContent;
}


const addNewStudent = () => {
    const studentID = document.querySelector("#id").value.trim();
    const studentName = document.querySelector("#name").value.trim();
    const studentEmail = document.querySelector("#email").value.trim();
    const studentPhone = document.querySelector("#phone").value.trim();
    const studentIdCard = document.querySelector("#idCard").value.trim();
    const studentMath = document.querySelector("#math").value.trim();
    const studentPhysics = document.querySelector("#physics").value.trim();
    const studentChemistry = document.querySelector("#chemistry").value.trim();
    let student = new Student(studentID, studentName, studentEmail, studentPhone, studentIdCard, studentMath, studentPhysics, studentChemistry);
    axios({
        url: `${BASE.BASE_URL}${BASE.ADD_NEW_STUDENT_URL}`,
        method: 'POST',
        data: student,
    })
    .then((res) => {
        console.log(res);
        fetchStudentList();
    })
    .catch((error) =>{
        console.log({...error});
    });
}

const deleteStudent = (id) => {
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

fetchStudentList();
window.addNewStudent = addNewStudent;
window.deleteStudent = deleteStudent;