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