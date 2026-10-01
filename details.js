const detailsContainer =
    document.getElementById("detailsContainer");

const search = new URLSearchParams(window.location.search);

const productId = search.get("id");

async function getProductDetails() {

    try {

        const response = await fetch(
            `https://dummyjson.com/products/${productId}`
        );

        const product = await response.json();

        displayDetails(product);

    } catch (error) {

        console.log("Error:", error);
    }
}

function displayDetails(product) {

    detailsContainer.innerHTML = `

        <div class="details-card">

            <img
                src="${product.thumbnail}"
                alt="${product.title}"
            >

            <div>

                <h1>${product.title}</h1>

                <p>
                    ${product.description}
                </p>

                <h2>
                    $${product.price}
                </h2>

                <p>
                    Category: ${product.category}
                </p>

                <p>
                    Rating: ${product.rating}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>

            </div>

        </div>
    `;
}

getProductDetails();