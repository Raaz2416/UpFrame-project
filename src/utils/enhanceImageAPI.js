import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;
const maxRetries = parseInt(import.meta.env.VITE_MAXIMUM_RETRIES); // since env vars are strings

export const enhancedImageAPI=async(file)=>{
    
    try{

        const taskId=await uploadImage(file)

        
                         // after uploading image 
                         // it takes some time to enhance there fore secoind api should call until the image is not ready                                                         
        const enhancedImageData = await PollForEnhancedImage(taskId)


        return enhancedImageData.image
    }catch(error){
        console.log('error.message', error.message);
        
    }
}

const uploadImage=async(file)=>{
   
   try{
    const formData=new FormData();
    formData.append("image_file",file);

    const {data}=await axios.post(`${baseUrl}/api/tasks/visual/scale`,formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            "X-API-KEY":apiKey
        }
    })

    if(!data?.data?.task_id){
        throw new Error("Failed to upload image")
    }


    
    
    return data.data.task_id;
} catch (error) {
    if (!navigator.onLine) {
        console.error("You're offline. Please check your internet connection.");
    } else {
        console.error("Network error details:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Status:", error.response.status);
        } else if (error.request) {
            console.error("Request was made but no response:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
    }
}


}


const fetchEnhancedImage=async(taskid)=>{

    const{ data}=await axios.get(`${baseUrl}/api/tasks/visual/scale/${taskid}`,{
        headers:{
           
            "X-API-KEY":apiKey
        }
    })

    if(!data?.data){
        throw new Error("Failed to fetch enhanced image")
    }



    return data.data;

}


const PollForEnhancedImage = async(taskid,retries=0)=>{

    const result= await fetchEnhancedImage(taskid);

    if(result.state === 4){
        console.log(`Processing...${retries}/${maxRetries}`);
        
        if(retries>=maxRetries){
            throw new Error ("Maximum tries reach ed. Please try again.")
        }

        await new Promise((resolve)=>setTimeout(resolve,2000) );

        return PollForEnhancedImage(taskid,retries+1);
    }

    return result;
}

