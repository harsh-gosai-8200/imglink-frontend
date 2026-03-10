import React, { useState } from "react";
import { uploadImage } from "../services/api";

const ImageUploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0]; // fixed typo
    if (
      selected &&
      ["image/png", "image/jpeg", "image/webp"].includes(selected.type)
    ) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError(null);
    } else {
      setError("Only JPG, PNG, or WEBP images allowed.");
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await uploadImage(file);
      setUploadedUrl(data.url);
      onUploadSuccess && onUploadSuccess(data);
    } catch (error) {
      setError(error.response?.data || "Upload failed"); // fixed err -> error
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (uploadedUrl) navigator.clipboard.writeText(uploadedUrl);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full">
      {/* Clickable Upload Area */}
      <label
        htmlFor="fileInput"
        className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
      >
        {!preview ? (
          <>
            <p className="text-gray-500 text-lg font-medium">
              Tap here to upload an image
            </p>
            <p className="text-gray-400 text-sm">(JPG, PNG, WEBP)</p>
          </>
        ) : (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-6 py-2 rounded-md text-white font-semibold mt-4 w-full ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Uploaded URL */}
      {uploadedUrl && (
        <div className="flex items-center w-full mt-4">
          <input
            type="text"
            readOnly
            value={uploadedUrl}
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-r-md"
          >
            Copy Link
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploadForm;