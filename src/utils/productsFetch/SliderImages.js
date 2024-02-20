export async function getSliderImages(type) {
    try {
        const images = await fetch(`https://fakestoreapi.com/${type}`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getJwelleryProducts() {
    try {
        const images = await fetch(`https://fakestoreapi.com/products/category/jewelery`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getElectronicsProducts() {
    try {
        const images = await fetch(`https://fakestoreapi.com/products/category/electronics?limit=4`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getMenClothingProducts() {
    try {
        const images = await fetch(`https://fakestoreapi.com/products/category/men's%20clothing?limit=4`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getWoMenClothingProducts() {
    try {
        const images = await fetch(`https://fakestoreapi.com/products/category/women's%20clothing?limit=4`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getSingleProduct({id}) {
    try {
        const images = await fetch(`https://fakestoreapi.com/products/${id}`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getRecommendedProduct({category}) {
    try {
        const images = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=4`)
        const imageData = await images.json();
        // console.log(imageData);
        return imageData;
    } catch (error) {
        console.log(error)
    }
}


export async function getSearchedProduct({word}) {
    try {
        const product = await fetch(`https://fakestoreapi.com/products`)
        const productData = await product.json();
        const MyWordProduct = productData.filter((product)=>{
            return product.title.toLowerCase().includes(word);
        })
        console.log(MyWordProduct)
        return MyWordProduct;
    } catch (error) {
        console.log(error)
    }
}