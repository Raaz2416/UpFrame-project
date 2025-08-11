import React from 'react'
import { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { enhancedImageAPI } from '../utils/enhanceImageAPI'

const Home = () => {
    const [uploadImage,setUploadImage]=useState(null);
    const [enhancedImage,setEnhancedImage]=useState(null);
    const [loading,setLoading]=useState(false)

    // const enhanced

    const UploadImageHandler = async(file)=>{
        setUploadImage(URL.createObjectURL(file))
        setLoading(true)

        try{
            const enhancedURL = await enhancedImageAPI(file)
            
            setEnhancedImage(enhancedURL)
            setLoading(false)

        }catch(error){
            console.log('error', error)
            alert("Error while enhancong the image . Please try again later ")
            
        }
        

    }
  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview loading={loading} uploaded={uploadImage} enhanced={enhancedImage} />
    </  >
  )
}

export default Home
