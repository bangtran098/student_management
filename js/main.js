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
            </tr>
        `;
    }
    tableDanhSach.innerHTML = htmlContent;

}

fetchStudentList();