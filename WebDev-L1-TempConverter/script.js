const form = document.getElementById("converter-form");
const tempInput = document.getElementById("temp-input");
const unitSelect = document.getElementById("unit-select");
const errorMsg = document.getElementById("error-msg");
const resetBtn = document.getElementById("reset-btn");

const celsiusOut = document.getElementById("celsius-out");
const fahrenheitOut = document.getElementById("fahrenheit-out");
const kelvinOut = document.getElementById("kelvin-out");

function formatValue(num) {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

function clearOutputs() {
    celsiusOut.textContent = "-- °C";
    fahrenheitOut.textContent = "-- °F";
    kelvinOut.textContent = "-- K";
}

function convertTemperature(value, unit) {
    let celsius;

    if (unit === "celsius") {
        celsius = value;
    } else if (unit === "fahrenheit") {
        celsius = ((value - 32) * 5) / 9;
    } else {
        celsius = value - 273.15;
    }

    const fahrenheit = (celsius * 9) / 5 + 32;
    const kelvin = celsius + 273.15;

    return { celsius, fahrenheit, kelvin };
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const rawValue = tempInput.value.trim();
    const parsedValue = Number(rawValue);

    if (rawValue === "" || Number.isNaN(parsedValue)) {
        errorMsg.textContent = "Please enter a valid numeric temperature.";
        tempInput.classList.add("input-invalid");
        clearOutputs();
        return;
    }

    errorMsg.textContent = "";
    tempInput.classList.remove("input-invalid");

    const { celsius, fahrenheit, kelvin } = convertTemperature(
        parsedValue,
        unitSelect.value
    );

    celsiusOut.textContent = `${formatValue(celsius)} °C`;
    fahrenheitOut.textContent = `${formatValue(fahrenheit)} °F`;
    kelvinOut.textContent = `${formatValue(kelvin)} K`;
});

resetBtn.addEventListener("click", () => {
    form.reset();
    errorMsg.textContent = "";
    tempInput.classList.remove("input-invalid");
    clearOutputs();
    tempInput.focus();
});