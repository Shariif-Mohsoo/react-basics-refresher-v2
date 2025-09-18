import axios from "axios";

const searchImages = async (term) =>{
    const response=await axios.get("https://api.unsplash.com/search/photos",{
        headers:{
            Authorization: "Client-ID I6CmYu7LK9dERIdC09ZJQ8R4VSr1S-cLx2vpGG-QZZs"
        },
        params:{
            query:term
        },
    })
    // console.log(response.data.results);
    return response.data.results;
}
export default searchImages;