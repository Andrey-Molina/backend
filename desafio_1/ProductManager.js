
class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios.")
        }

        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código ya está en uso.");
        }

        product.id = this.nextId++;
        this.products.push(product);
    }

    removeProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        console.log(this.products)
    }

    getProductById(productId) {

        const foundProduct = this.products.find(product => product.id === productId);

        if (foundProduct){
            return foundProduct
        }else {
            console.log(("Id inexistente"));
        }
    }

    getProducts() {
        return this.products;
    }
}

// Ejemplo de uso
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());


productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
productManager.addProduct(new Product(2, "Product 2", 4.99, "img", "ab4gs", 1));
// productManager.addProduct(new Product(3, "Product 3", 19.99, "img", "dbh63", 6));
// productManager.removeProduct(2);

console.log(productManager.getProducts());


console.log(productManager.getProductById(2));
