// eslint-disable-next-line react/prop-types
function PdfFile({ url }) {
  // Extract the filename for display
  const fileName = url?.split("/").pop();

  return (
    <>
      <div className="card w-full max-w-3xl bg-base-100 shadow-lg rounded-xl p-6 my-4 ml-3">
        <h2 className="text-xl font-bold text-center text-primary-content mb-4">
          {fileName || "Document"}
        </h2>

        {/* Scrollable iframe for PDF */}
        <div className="w-full h-96 overflow-hidden rounded-lg border border-base-300 shadow-md">
          <iframe src={url} className="w-full h-full" title={fileName}></iframe>
        </div>

        {/* Buttons for opening or downloading */}
        <div className="mt-4 flex justify-center ">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-primary-content w-[80%] "
          >
            Open in New Tab
          </a>
        </div>
      </div>
    </>
  );
}

export default PdfFile;
