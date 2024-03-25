const fs = require("fs")
const path = require("path")

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
        this.path = path.join(__dirname, "..", "/data/entrega_1.json")
    }

    addProduct(product) {

        // we pass in the instanced class as an argument and validate it's data if correct
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios.")
        }
        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código ya está en uso.");
        }

        // we add an id field to the instanced class and sum one to it
        product.id = this.nextId++;

        // here is where the instanced class is being pushed into an array
        this.products.push(product);

        // and here is where the array is being saved into a json file jiji
        fs.writeFileSync(this.path, JSON.stringify(this.products,null ,5),(error)=>{
            if(error){
                console.log(error.message)
            }
        })
    }

    // "this." referring to the current instanced class being manipulated

    // it returns a copy of the array subtracting the object with the matched id and it saves that
    // copy back into the products array

     removeProduct(productId) {
         let fileRead = JSON.parse(fs.readFileSync(this.path, {encoding: "utf-8"}))
         this.products = fileRead.filter(product => product.id !== productId);
         return fs.writeFileSync(this.path, JSON.stringify(this.products,null ,5),(error)=>{
             if(error){
                 console.log(error.message)
             }
         })
    }

    getProductById(productId) {
        console.log(this.path)

        let fileRead = JSON.parse(fs.readFileSync(this.path, {encoding: "utf-8"}))
        console.log(this.path)
        const foundProduct = fileRead.find(product => product.id === productId);
        if (foundProduct){
            return foundProduct
        }else {
            console.log((`Producto ${foundProduct} inexistente`));
        }
    }


    async getProducts() {
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding: "utf-8"}))
        }else{
            return []
        }
    }

    async updateProduct(id, newPrice) {
        return new Promise((resolve, reject) => {
            // Find the product with the specified id
            const productIndex = this.products.findIndex(product => product.id === id);

            // If the product is found, update its price
            if (productIndex !== -1) {
                // Update the product's price with the new value
                this.products[productIndex].price = newPrice;

                // Save the updated products array to the file
                fs.writeFile(this.path, JSON.stringify(this.products, null, 5), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Product price updated successfully');
                    }
                });
            } else {
                reject('Product not found');
            }
        });
    }

}
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

module.exports= {ProductManager, Product}

const asyncEnvironment= async ()=>{
// se crea una instancia de la clase 'molde' productManager para obtener sus metodos
    let productManager = new ProductManager();
    // await productManager.addProduct(new Product(1, "Product 1", 6.99, "img", "3g4s5", 1));
    // await productManager.addProduct(new Product(2, "Product 2", 4.99, "img", "ab4gs", 5));
    // await productManager.addProduct(new Product(3, "Product 3", 1.99, "img", "vv44c", 16));
    // console.log(await productManager.getProducts())
    console.log(productManager.getProductById(1));
    // await productManager.updateProduct(1, 200000)
    // await productManager.updateProduct(1, 5.99)
    // await productManager.removeProduct(1)
    // console.log(await productManager.getProducts())
    // console.log(productManager.getProductById(2));
}

asyncEnvironment()


