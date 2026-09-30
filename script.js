const medicineForm = document.getElementById("medicineForm");
const medicineList = document.getElementById("medicineList");

const medicineName = document.getElementById("medicineName");
const dosage = document.getElementById("dosage");
const time = document.getElementById("time");
const frequency = document.getElementById("frequency");
const notes = document.getElementById("notes");

const medicineError = document.getElementById("medicineError");
const timeError = document.getElementById("timeError");

const today = document.getElementById("today");


// Show today's date

const currentDate = new Date();

today.textContent = currentDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
});




let medicines = JSON.parse(localStorage.getItem("medicines")) || [];



medicineForm.addEventListener("submit", function(event) {

    event.preventDefault();

    medicineError.textContent = "";
    timeError.textContent = "";

    let valid = true;

    if (medicineName.value.trim() === "") {
        medicineError.textContent = "Please enter medicine name.";
        valid = false;
    }

    if (time.value === "") {
        timeError.textContent = "Please select medicine time.";
        valid = false;
    }

    if (!valid) {
        return;
    }


    const medicine = {

        id: Date.now(),

        name: medicineName.value.trim(),

        dosage: dosage.value.trim() || "Not specified",

        time: time.value,

        frequency: frequency.value || "Not specified",

        notes: notes.value.trim() || "No notes"

    };


    medicines.push(medicine);

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    medicineForm.reset();

    displayMedicines();

    alert("Medicine added successfully!");
});




function displayMedicines() {

    medicineList.innerHTML = "";

    if (medicines.length === 0) {

        medicineList.innerHTML = `
            <div class="empty">
                <div>💊</div>
                <h3>No medicines added</h3>
                <p>Add your first medicine above.</p>
            </div>
        `;

        return;
    }


    medicines.sort((a, b) =>
        a.time.localeCompare(b.time)
    );


    medicines.forEach(function(medicine) {

        const card = document.createElement("div");

        card.classList.add("medicineCard");


        card.innerHTML = `

            <h3> ${medicine.name}</h3>

            <p>
                <strong>Dosage:</strong>
                ${medicine.dosage}
            </p>

            <p>
                <strong>Time:</strong>
                <span class="time">
                     ${medicine.time}
                </span>
            </p>

            <p>
                <strong>Frequency:</strong>
                ${medicine.frequency}
            </p>

            <p class="notes">
                <strong>Notes:</strong>
                ${medicine.notes}
            </p>

            <button class="deleteBtn"
                    onclick="deleteMedicine(${medicine.id})">
                Delete Medicine
            </button>
        `;


        medicineList.appendChild(card);

    });
}



function deleteMedicine(id) {

    medicines = medicines.filter(
        medicine => medicine.id !== id
    );

    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );

    displayMedicines();
}




displayMedicines();