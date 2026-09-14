/* =========================================
   CARRINHO
========================================= */

let cart = [];


/* Adicionar produto */

function addToCart(name, price, image) {

    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    updateCart();
    openCart();

}


/* Atualizar carrinho */

function updateCart() {

    const container = document.getElementById("cartItems");
    const count = document.getElementById("cartCount");
    const totalElement = document.getElementById("cartTotal");

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <p>Seu carrinho está vazio.</p>
                <small>Escolha alguma delícia no cardápio!</small>
            </div>
        `;

        count.textContent = "0";
        totalElement.textContent = "R$ 0,00";

        return;
    }


    let total = 0;
    let quantityTotal = 0;

    container.innerHTML = "";


    cart.forEach((item, index) => {

        const subtotal = item.price * item.quantity;

        total += subtotal;
        quantityTotal += item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>
                        R$ ${subtotal.toFixed(2).replace(".", ",")}
                    </span>

                    <div class="quantity">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    count.textContent = quantityTotal;

    totalElement.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");

}


/* Alterar quantidade */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();

}


/* Abrir carrinho */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("open");

    document.body.style.overflow = "hidden";

}


/* Fechar carrinho */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("open");

    document.body.style.overflow = "";

}


/* Fechar clicando fora */

function closeCartOutside(event) {

    if (event.target.id === "cartOverlay") {
        closeCart();
    }

}


/* Mostrar ou esconder endereço */

function toggleAddress() {

    const orderType =
        document.getElementById("orderType").value;

    const addressGroup =
        document.getElementById("addressGroup");

    const address =
        document.getElementById("address");


    if (orderType === "Entrega") {

        addressGroup.style.display = "block";
        address.required = true;

    } else {

        addressGroup.style.display = "none";
        address.required = false;
        address.value = "";

    }

}


/* =========================================
   FINALIZAR PEDIDO PELO WHATSAPP
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio! 🍔");

        return;

    }


    const paymentMethod =
        document.getElementById("paymentMethod").value;

    const orderType =
        document.getElementById("orderType").value;

    const address =
        document.getElementById("address").value.trim();

    const observations =
        document.getElementById("observations").value.trim();


    if (paymentMethod === "") {

        alert("Selecione a forma de pagamento.");

        return;

    }


    if (orderType === "Entrega" && address === "") {

        alert("Digite o endereço para entrega.");

        return;

    }


    let message =
        "🍔 *NOVO PEDIDO - MORDIDA BURGER*%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;


        message +=
            `${item.quantity}x ${item.name} - R$ ${subtotal
                .toFixed(2)
                .replace(".", ",")}%0A`;

    });


    message +=
        `%0A💰 *Total: R$ ${total
            .toFixed(2)
            .replace(".", ",")}*`;


    message +=
        `%0A💳 *Pagamento:* ${paymentMethod}`;


    message +=
        `%0A📦 *Recebimento:* ${orderType}`;


    if (orderType === "Entrega") {

        message +=
            `%0A📍 *Endereço:* ${address}`;

    }


    if (observations !== "") {

        message +=
            `%0A📝 *Observações:* ${observations}`;

    }


    message +=
        "%0A%0A❤️ Obrigado pelo pedido!";


    const phone = "5587991699046";


    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}


/* =========================================
   FILTRO DO CARDÁPIO
========================================= */

function filterProducts(category, button) {

    const buttons =
        document.querySelectorAll(".category");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        if (
            category === "todos" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}
