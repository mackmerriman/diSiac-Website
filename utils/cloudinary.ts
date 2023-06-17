const cloudinaryUpload = async(file: File, upload_preset: string, resource_type: string) => {
    try {
        console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
        const cloudData = new FormData()
        cloudData.append('file', file)
        cloudData.append('upload_preset', upload_preset)
        cloudData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
        const cloudUrl: string = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`, {
            method: "POST",
            body: cloudData, 
        }).then(res => res.json()).then(data => data.url)
        console.log(`returning ${cloudUrl}`)
        return cloudUrl
    } catch (e) {
        console.error(e)
        return `Problem uploading image to cloudinary: ${e}`
    }
    
}
export default cloudinaryUpload