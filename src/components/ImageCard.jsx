import React from "react";

function ImageCard({ fileName, url }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
      <img src={url} alt={fileName} className="w-full h-48 object-cover" />
      <div className="p-4 w-full flex flex-col items-center">
        <p className="text-gray-700 font-medium mb-2 truncate w-full text-center">{fileName}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
        >
          Open
        </a>
      </div>
    </div>
  );
}

export default ImageCard;