let total


async function start() {
    let infoProducts = [];

    const response = await fetch('https://desafio.xlow.com.br/search');
    const products = await response.json();

    const total = products.length;

    for (const e of products) {
        const response = await fetch(`https://desafio.xlow.com.br/search/${e.productId}`);
        const product = await response.json();

        infoProducts.push(product);
    }

    insertProducts(products, infoProducts);
    showTotal(total);
}

start()

function insertProducts(products, infoProducts) {
    const main = document.querySelector('#board');

    for (let i = 0; i < products.length; i++) {
        const data = products[i];
        const item = infoProducts[i];

        const imagesHTML = item.items.flatMap((item, index) => {
            const imageClass = 'small_image';
            return item.images.map(image => `
                <img class="${imageClass}" src="${image.imageUrl}" alt="${image.imageText}">
            `);
        }).join('');

        const productHTML = `
            <div class="product">
                <img class="image" src="${item.items[0].images[0].imageUrl}" alt="${item.items[0].images[0].imageText}">
                <div class="small_images">${imagesHTML}</div>
                <h3 class="title">${data.productName}</h3>
                <p class="off">R$${transformPrice(data.listPrice)}</p>
                <span class="price">R$${transformPrice(data.bestPrice)}</span>
                <button class="buy">COMPRAR</button>
            </div>
        `;

        main.insertAdjacentHTML('beforeend', productHTML);
    }

    // Função para trocar a imagem ao clicar nas fotos pequenas
    const productImages = main.querySelectorAll('.product');
    productImages.forEach(product => {
        const smallImages = product.querySelectorAll('.small_image');
        const mainImage = product.querySelector('.image');

        smallImages.forEach((smallImage, index) => {
            smallImage.addEventListener('click', () => {
                mainImage.src = smallImage.src;
                mainImage.alt = smallImage.alt;
            });
        });
    });
}

function transformPrice(price) {

    return (price / 100).toFixed(2)
}

function showTotal(length) {

    const span = document.querySelector('#length')
    span.innerHTML = `${length} Produtos.`
}

function changeDesktopRows() {

    const spa = document.querySelector('.desktop')
    const principal = document.querySelector('#board')
    if (spa.innerHTML === '4 Produtos por linha') {
        principal.classList.remove('principal')
        principal.classList.add('principal2')
        spa.innerHTML = '5 Produtos por linha'
    } else {
        principal.classList.remove('principal2')
        principal.classList.add('principal')
        spa.innerHTML = '4 Produtos por linha'
    }
}

function changeMobileRows() {

    const spa = document.querySelector('.mobile')
    const principal = document.querySelector('#board')
    if (spa.innerHTML === '2 Produtos por linha') {
        principal.classList.remove('principal')
        principal.classList.add('principal2')
        spa.innerHTML = '1 Produtos por linha'
    } else {
        principal.classList.remove('principal2')
        principal.classList.add('principal')
        spa.innerHTML = '2 Produtos por linha'
    }
}