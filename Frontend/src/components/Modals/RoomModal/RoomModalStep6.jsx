import { CornerDownRight } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const RoomModalStep6 = ({ formData, setFormData, onBack, onSubmit, isSubmitting }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const fileArray = Array.from(files).filter(file => {
      if (!validTypes.includes(file.type)) {
        setError('Only JPG, PNG, and WEBP images are allowed');
        return false;
      }
      if (file.size > maxSize) {
        setError('Image size should be less than 5MB');
        return false;
      }
      return true;
    });
    
    if (fileArray.length === 0) return;
    
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    
    setSelectedFiles(prev => [...prev, ...newFiles].slice(0, 10)); // Limit to 10 files
  };
  
  const removeFile = (id) => {
    setSelectedFiles(files => {
      const fileToRemove = files.find(file => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return files.filter(file => file.id !== id);
    });
  };
  
  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      setError('Please upload at least one image');
      return;
    }
    
    const formDataToSubmit = new FormData();
    
    // Append all form data except propertyImages
    Object.keys(formData).forEach(key => {
      if (key !== 'roomImages' && formData[key] !== undefined && formData[key] !== null) {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    
    // Append all selected files
    selectedFiles.forEach(fileData => {
      formDataToSubmit.append('roomImages', fileData.file);
    });
    
    // Update form state with file objects
    setFormData(prev => ({
      ...prev,
      propertyImages: selectedFiles.map(item => item.file)
    }));
    
    onSubmit(formDataToSubmit);
  };
  
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  // Clean up object URLs
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);
  
  return (
    <div>
      
      <div className="mb-4">
      <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
        <CornerDownRight />
        <h1 className='font-semibold'>Final Step : Room Images</h1>
      </div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Room Images</label>
        
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg, image/png, image/webp"
            multiple
            onChange={handleFileInput}
            
          />
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="text-lg font-medium text-gray-700">Drop your images here or click to browse</p>
            <p className="text-sm text-gray-500">Upload up to 10 images (JPEG, PNG, WEBP)</p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Images ({selectedFiles.length})
            <span className="text-xs text-gray-500 ml-2">Max 10 images</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedFiles.map(file => (
              <div key={file.id} className="relative group">
                <div className="h-24 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={file.preview} 
                    alt={file.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || selectedFiles.length === 0}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 ${
            isSubmitting || selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default RoomModalStep6