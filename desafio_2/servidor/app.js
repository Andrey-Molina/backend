
const express = require("express")
const {ProductManager, Product} = require("./src/clases/ProductManager.js");
const port= 3000
const app= express()
let productManager = new ProductManager()


// App como instancia de express

app.get("/", (req,res)=>{
    res.send("Respuesta del server")
})

app.get("/products", async (req,res)=>{
    res.setHeader('Content-Type', "application/json")

    let productManager = new ProductManager()
    let products = await productManager.getProducts()

    await productManager.addProduct(new Product(1, "Product 1", 6.99, "img", "3g4s5", 1))
    await productManager.addProduct(new Product(2, "Product 2", 4.99, "img", "ab4gs", 5));

    let limit = req.query.limit
    if (limit){
        products = products.slice(0,limit)
    }

    res.json(
        products
    )
})

app.get("/products/:id", async (req,res) => {
    // HANDLER not callback in this case
    let id = req.params.id
    id = Number(id)

    if(isNaN(id)){
        return res.json("Ingresa un tipo de dato numerico")
    }else {
        console.log(id)
        return res.json(productManager.getProductById(id))
    }
})

const server = app.get("*", (req, res) =>{
    res.status(404).json({
        message:"error 404 - page not found"
    })
})

app.listen(port,()=>console.log(`Server online en puerto ${port}`))
