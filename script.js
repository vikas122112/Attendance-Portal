let tempData = {};

function openModal() {
  const name = document.getElementById("name").value;
  const erp = document.getElementById("erp").value;
  const year = document.getElementById("year").value;
  const course = document.getElementById("course").value;

  if (!name || !erp || !year || !course) {
    alert("Fill all fields");
    return;
  }

  tempData = { name, erp, year, course };

  document.getElementById("modal").style.display = "flex";
}

function markAttendance(status) {
  const data = {
    name: tempData.name,
    erp: tempData.erp,
    year: tempData.year,
    course: tempData.course,
    status: status
  };

  // 🔥 Get old data
  let records = JSON.parse(localStorage.getItem("attendance")) || [];

  // 🔥 Add new data
  records.push(data);

  // 🔥 Save back
  localStorage.setItem("attendance", JSON.stringify(records));

  addToTable(data);

  document.getElementById("modal").style.display = "none";

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("erp").value = "";
  document.getElementById("year").value = "";
  document.getElementById("course").value = "";
}

function addToTable(data) {
  const table = document.getElementById("tableBody");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${data.name}</td>
    <td>${data.erp}</td>
    <td>${data.year}</td>
    <td>${data.course}</td>
    <td>${data.status}</td>
  `;

  table.appendChild(row);
}

// 🔥 Load saved data on page load
window.onload = function () {
  let records = JSON.parse(localStorage.getItem("attendance")) || [];

  records.forEach(data => {
    addToTable(data);
  });
};
