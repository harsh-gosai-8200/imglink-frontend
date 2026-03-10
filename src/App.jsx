import { useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageUploadForm from "./components/ImageUploadForm";

function App() {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUploadSuccess = (imageData) => {
    console.log("Uploaded image:", imageData);
    setUploadedImages([imageData, ...uploadedImages]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        ImgLink — Open Source Image Link Generator
      </h1>

      <div className="max-w-xl mx-auto">
        <ImageUploadForm onUploadSuccess={handleUploadSuccess} />
      </div>

      {uploadedImages.length > 0 && (
        <div className="mt-10 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Uploaded Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {uploadedImages.map((img) => (
              <ImageCard key={img.fileName} fileName={img.fileName} url={img.url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;