const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.currentId = this.getLastId();
    }

    addProduct(product) {
        product.id = ++this.currentId;
        this.saveProducts([product]);
    }

    getProducts() {
        let products = [];
        try {
            const productsObject = JSON.parse(fs.readFileSync(this.path));
            
            products = Object.values(productsObject);
        } catch (error) {
            console.error('Error reading file:', error);
        }
        return products;
    }
    

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        updatedProduct.id = id;
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        products[index] = updatedProduct;
        this.saveProducts(products);
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        products.splice(index, 1);
        this.saveProducts(products);
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products));
    }

    getLastId() {
        let products = this.getProducts();
        if (products.length === 0) {
            return 0;
        }
        products.sort((a, b) => b.id - a.id);
        return products[0].id;
    }
}

module.exports = ProductManager;

