// Продължи с твоя vanilla JavaScript код тук.
const navBtn = document.getElementById("nav-btn");
const links = document.querySelector("nav .links");
const productsDiv = document.getElementById("products-div");
const itemsDiv = document.getElementById("items-div");
const form = document.getElementById("form");
const formBtn = document.getElementById("submitBtn");

navBtn.addEventListener("click", (event) => {
    links.classList.toggle("active");
});

let html = "";

const getData = async () => {
    const response = await fetch("http://localhost:4000/desserts");
    const data = await response.json();
    return data;
};

const data = await getData();

// render products
data.forEach((dessert) => {
    html = "";
    const div = document.createElement("div");
    div.classList.add("product");

    html += `
            <div class="image-container">
                <img
                    src="./public/images/${dessert.image}"
                    alt=""
                    width="6rem"
                />
            </div>
            <div class="decor">
                <img
                    src="./public/images/text_decor.svg"
                    alt=""
                />
            </div>
            <h4 class="name">${dessert.name}</h4>
            <p class="description">
                ${dessert.description_short}
            </p>
            <button class="action">Научете повече</button>
    `;

    div.innerHTML = html;
    productsDiv.append(div);
});

data.reverse();
// render desserts
data.forEach((dessert) => {
    html = "";
    const div = document.createElement("div");
    div.classList.add("item");

    html += `
    <div class="image-container">
        <img
            src="./public/images/${dessert.image}"
            alt=""
        />
    </div>
    <div class="info">
        <h4 class="name">${dessert.name}</h4>
        <p class="description">
            ${dessert.description_long}
        </p>
        <p class="ingredients">
            <span class="highlight"
                >Основни съставки:</span
            >
           ${dessert.ingredients_text}
        </p>
    </div>
    <div class="macros">
        <div class="macro">
            <h6 class="macro-name">Калории:</h6>
            <p class="value">${dessert.nutrition.calories}</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Общо мазнини:</h6>
            <p class="value">${dessert.nutrition.totalFat}g</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Наситени мазнини:</h6>
            <p class="value">${dessert.nutrition.saturatedFat}g</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Общо въглехидрати:</h6>
            <p class="value">${dessert.nutrition.totalCarbs}g</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Протеин:</h6>
            <p class="value">${dessert.nutrition.protein}g</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Захари:</h6>
            <p class="value">${dessert.nutrition.sugars}g</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Натрий:</h6>
            <p class="value">${dessert.nutrition.sodium}mg</p>
        </div>
        <div class="macro">
            <h6 class="macro-name">Холестерол:</h6>
            <p class="value">${dessert.nutrition.cholesterol}mg</p>
        </div>
    </div>
    `;

    div.innerHTML = html;
    itemsDiv.prepend(div);
});

formBtn.addEventListener("click", async (e) => {
    const formData = new FormData(form);
    // formdata gets modified by the formdata event
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const request = formData.get("question/request");
    const data = { name, phone, email, request };

    await fetch("http://localhost:4000/form_submissions", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Context-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
});
