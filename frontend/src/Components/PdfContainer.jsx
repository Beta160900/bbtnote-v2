import { useState, useEffect } from "react";
import PdfFile from "./PdfFile";

// eslint-disable-next-line react/prop-types
function PdfContainer({ heading, folder }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchFiles = () => {
    fetch(`${apiUrl}/file?subfolder=${folder}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.files) {
          setFiles(data.files);
        }
      })
      .catch((err) => {
        console.error("Error fetching files:", err);
      });
  };

  useEffect(() => {
    if (isDropdownOpen) {
      fetchFiles();
    }
  }, [isDropdownOpen, folder]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    setIsUploading(true);
    try {
      const response = await fetch(`${apiUrl}/upload-pdf?folder=${folder}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const result = await response.json();
      console.log("File uploaded:", result.fileUrl);

      // Refresh file list
      fetchFiles();
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div tabIndex={0}>
      <button
        onClick={toggleDropdown}
        className="btn btn-ghost w-full my-2 flex justify-between"
      >
        <h1 className="inline-block text-xl font-bold text-primary-content">
          {heading}
        </h1>

        {isDropdownOpen ? (
          // Pause icon
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M8 5V19" />
              <path d="M16 5V19" />
            </g>
          </svg>
        ) : (
          // Play icon
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 3L20 12 6 21 6 3z" />
            </g>
          </svg>
        )}
      </button>

      {isDropdownOpen && (
        <div className="grid grid-cols-1 gap-4 max-h-100 overflow-scroll">
          <div>
            {files.length > 0 ? (
              files.map((file, index) => <PdfFile key={index} url={file.url} />)
            ) : (
              <p className="text-center">No PDF files found.</p>
            )}
          </div>

          <form
            onSubmit={handleUpload}
            className="flex flex-col pb-6 items-center justify-center space-y-4"
          >
            <h1 className="text-2xl text-center">Upload file</h1>
            <input
              type="file"
              accept="application/pdf"
              name="fileInput"
              className="mt-2"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button
              className="btn btn-primary mt-2"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload PDF"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PdfContainer;
