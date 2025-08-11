import React, { useState } from 'react'

const MAX_SIZE_MB = 15;
const MAX_WIDTH = 4096;
const MAX_HEIGHT = 4096;
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
];
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff'];

const isAllowedExtension = (filename) => {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
};

const ImageUpload = (props) => {
  const [error, setError] = useState('');

  const ShowImagehandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    // Type and extension check
    if (!ALLOWED_TYPES.includes(file.type) || !isAllowedExtension(file.name)) {
      setError('Invalid file type. Please upload a PNG, JPG, JPEG, WEBP, GIF, BMP, or TIFF image.');
      return;
    }
    // Size check
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image size exceeds ${MAX_SIZE_MB}MB limit. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }
    // Dimension check (async)
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = function () {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        setError(`Image dimensions exceed ${MAX_WIDTH}x${MAX_HEIGHT} pixels. Your image: ${img.width}x${img.height}`);
        URL.revokeObjectURL(url);
        return;
      }
      setError('');
      URL.revokeObjectURL(url);
      props.UploadImageHandler(file);
    };
    img.onerror = function () {
      setError('Invalid or corrupted image file.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className='bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl'>
      <label htmlFor="fileInput" className=' p-6 text-center block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-all'>
        <input type="file" id='fileInput' className='hidden' onChange={ShowImagehandler} />
        <span className='text-lg font-medium text-gray-600'>Click and upload your file here.</span>
      </label>
      {error && (
        <div className='mt-4 text-red-600 font-semibold text-center'>{error}</div>
      )}
    </div>
  )
}

export default ImageUpload
