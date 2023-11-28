// Inicializa o recupera los productos del localStorage
let products = JSON.parse(localStorage.getItem('drugstoreProducts')) || [];

// Función para renderizar los productos en la tabla
function renderProducts() {
    const table = document.getElementById('productTable');
    table.innerHTML = `
        <tr>
            <th>Nombre del Producto</th>
            <th>Precio</th>
            <th>Código de Barras</th>
            <th>Tipo</th>
            <th>Acciones</th>
        </tr>
    `;

    products.forEach((product, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.price}</td>
            <td>${product.barcode}</td>
            <td>${product.productType}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
    });
}

// Función para agregar o actualizar un producto
function addOrUpdateProduct() {
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const barcode = document.getElementById('barcode').value;
    const productType = document.getElementById('productType').value;
    const productId = document.getElementById('productId').value;

    if (productName && price && barcode && productType) {
        if (productId !== '') {
            // Actualizar producto existente
            const index = parseInt(productId);
            products[index] = { productName, price, barcode, productType };
        } else {
            // Agregar nuevo producto
            products.push({ productName, price, barcode, productType });
        }

        localStorage.setItem('drugstoreProducts', JSON.stringify(products));
        renderProducts();

        // Limpiar los campos del formulario
        document.getElementById('productName').value = '';
        document.getElementById('price').value = '';
        document.getElementById('barcode').value = '';
        document.getElementById('productType').value = '';
        document.getElementById('productId').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Función para editar un producto
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.productName;
    document.getElementById('price').value = product.price;
    document.getElementById('barcode').value = product.barcode;
    document.getElementById('productType').value = product.productType;
    document.getElementById('productId').value = index;
}

// Función para eliminar un producto
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('drugstoreProducts', JSON.stringify(products));
    renderProducts();
}

// Llama a la función para mostrar los productos al cargar la página
window.onload = renderProducts;
