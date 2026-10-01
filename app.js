const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

let products = [];

async function getProducts() {
    try {
        const response = await fetch(
            "https://dummyjson.com/products?limit=100"
        );

        products = await response.json();

        products = products.products;

        displayProducts(products);
        loadCategories();

    } catch (error) {
        console.log("Error:", error);
    }
}

function displayProducts(productList) {

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>${product.category}</p>

            <h4>$${product.price}</h4>

            <button onclick="viewDetails(${product.id})">
                View Details
            </button>
        `;

        productContainer.append(card);
    });
}

function loadCategories() {

    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categorySelect.append(option);
    });
}

searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    const result = products.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );

    displayProducts(result);
});

categorySelect.addEventListener("change", function () {

    const selectedCategory = this.value;

    if (selectedCategory === "all") {
        displayProducts(products);
        return;
    }

    const result = products.filter(product =>
        product.category === selectedCategory
    );

    displayProducts(result);
});

function viewDetails(id) {

    window.location.href = `details.html?id=${id}`;
}

getProducts();