const upload_preset= import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloud_name= import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const uploadCloud = async file => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'post',
        body: data,
    });

   const images= await res.json();
   return images;
};

export default uploadCloud;