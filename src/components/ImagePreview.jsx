import React from 'react'

const MAX_SIZE_MB = 15;
const MAX_WIDTH = 4096;
const MAX_HEIGHT = 4096;
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff'];

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImagePreview = ({ file, uploaded, enhanced, loading }) => {
  return (
    <div className='flex flex-col items-center w-full'>
      {/* File Information */}
      {file && (
        <div className='bg-gray-50 rounded-lg p-4 mb-6 max-w-4xl w-full'>
          <h3 className='font-semibold text-gray-800 mb-3'>File Information</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
            <div>
              <span className='font-medium text-gray-600'>Name:</span>
              <p className='truncate text-gray-800'>{file.name}</p>
            </div>
            <div>
              <span className='font-medium text-gray-600'>Size:</span>
              <p className='text-gray-800'>{formatFileSize(file.size)}</p>
            </div>
            <div>
              <span className='font-medium text-gray-600'>Type:</span>
              <p className='text-gray-800'>{file.type}</p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
        {/* Original Image */}
        <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
          <h2 className='text-xl font-semibold text-center bg-gray-800 text-white py-3'>
            Original Image
          </h2>
          <div className='relative'>
            {uploaded ? (
              <img 
                src={uploaded || "/placeholder.svg"} 
                alt='Original uploaded image' 
                className='w-full h-80 object-cover' 
              />
            ) : (
              <div className='flex items-center justify-center h-80 bg-gray-100 text-gray-500'>
                No Image Selected
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Image */}
        <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
          <h2 className='text-xl font-semibold text-center bg-blue-800 text-white py-3'>
            Enhanced Image
          </h2>
          <div className='relative'>
            {loading ? (
              <div className='flex items-center justify-center h-80 bg-gray-100'>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                  <p className='text-gray-600'>Processing...</p>
                </div>
              </div>
            ) : enhanced ? (
              <img 
                src={enhanced || "/placeholder.svg"} 
                alt='Enhanced image' 
                className='w-full h-80 object-cover' 
              />
            ) : (
              <div className='flex items-center justify-center h-80 bg-gray-100 text-gray-500'>
                No Enhanced Image
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      {enhanced && !loading && (
        <div className='flex justify-center mt-6'>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = enhanced;
              link.download = `enhanced-image-${Date.now()}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className='flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
            <span>Download Enhanced Image</span>
          </button>
        </div>
      )}

      {/* Requirements Info */}
      <div className='mt-6 max-w-4xl w-full'>
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h4 className='font-semibold text-blue-800 mb-2'>Image Requirements</h4>
          <div className='text-sm text-blue-700 space-y-1'>
            <div>• Maximum file size: {MAX_SIZE_MB}MB</div>
            <div>• Maximum dimensions: {MAX_WIDTH}×{MAX_HEIGHT} pixels</div>
            <div>• Supported formats: {ALLOWED_EXTENSIONS.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;