// Inicializa o recupera los productos del localStorage para el index 2
let products2 = JSON.parse(localStorage.getItem('drugstoreProducts2')) || [];

// Función para renderizar los productos del index 2 en la tabla
function renderProducts2() {
    const table = document.getElementById('productTable2');
    table.innerHTML = `
        <tr>
            <th>Nombre del Producto</th>
            <th>Precio</th>
            <th>Código de Barras</th>
            <th>Tipo</th>
            <th>Acciones</th>
        </tr>
    `;

    products2.forEach((product, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.price}</td>
            <td>${product.barcode}</td>
            <td>${product.productType}</td>
            <td>
                <button onclick="editProduct2(${index})">Editar</button>
                <button onclick="deleteProduct2(${index})">Eliminar</button>
            </td>
        `;
    });
}

// Función para agregar o actualizar un producto en el index 2
function addOrUpdateProduct2() {
    const productName = document.getElementById('productName2').value;
    const price = document.getElementById('price2').value;
    const barcode = document.getElementById('barcode2').value;
    const productType = document.getElementById('productType2').value;
    const productId = document.getElementById('productId2').value;

    if (productName && price && barcode && productType) {
        if (productId !== '') {
            // Actualizar producto existente
            const index = parseInt(productId);
            products2[index] = { productName, price, barcode, productType };
        } else {
            // Agregar nuevo producto
            products2.push({ productName, price, barcode, productType });
        }

        localStorage.setItem('drugstoreProducts2', JSON.stringify(products2));
        renderProducts2();

        // Limpiar los campos del formulario del index 2
        document.getElementById('productName2').value = '';
        document.getElementById('price2').value = '';
        document.getElementById('barcode2').value = '';
        document.getElementById('productType2').value = '';
        document.getElementById('productId2').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Función para editar un producto del index 2
function editProduct2(index) {
    const product = products2[index];
    document.getElementById('productName2').value = product.productName;
    document.getElementById('price2').value = product.price;
    document.getElementById('barcode2').value = product.barcode;
    document.getElementById('productType2').value = product.productType;
    document.getElementById('productId2').value = index;
}

// Función para eliminar un producto del index 2
function deleteProduct2(index) {
    products2.splice(index, 1);
    localStorage.setItem('drugstoreProducts2', JSON.stringify(products2));
    renderProducts2();
}

// Llama a la función para mostrar los productos del index 2 al cargar la página
window.onload = renderProducts2;
