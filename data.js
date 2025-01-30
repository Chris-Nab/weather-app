const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");

const apiKey = "9859e03b24c92783a5e3c80219223164";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputVal = input.value; // Get the city name

  if (!inputVal) {
    msg.textContent = "Please enter a city name!";
    return;
  }

  const existingCities = document.querySelectorAll(".city-name span");
  const cityExists = Array.from(existingCities).some(
    (city) => city.textContent.toLowerCase() === inputVal.toLowerCase()
  );

  if (cityExists) {
    msg.textContent = `You already know the weather for ${inputVal.toUpperCase()}`;
    return;
  }


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      // Create the new list item
      const li = document.createElement("li");
      li.classList.add("city");
      li.innerHTML = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;

      list.appendChild(li); // Append new city to the list

      msg.textContent = "";
      form.reset();
      input.focus();
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });
});
