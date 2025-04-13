import PdfContainer from "./PdfContainer";

// eslint-disable-next-line react/prop-types
function Box({ subject, folder, type }) {
  if (type === "1") {
    return (
      <>
        <div className="card bg-base-200 border-2 border-accent w-100 shadow-sm my-5">
          <button
            tabIndex={0}
            role="button"
            className="btn p-4 bg-primary text-3xl font-bold"
          >
            {subject && typeof subject === "string"
              ? subject.toUpperCase()
              : "No Subject"}
          </button>
          <PdfContainer heading="Term1" folder={`${folder}/Term1`} />
          <PdfContainer heading="Term2" folder={`${folder}/Term2`} />
        </div>
      </>
    );
  } else if (type === "2") {
    return (
      <>
        <div className="card bg-base-200 border-2 border-accent w-100 shadow-sm my-5">
          <button
            tabIndex={0}
            role="button"
            className="btn p-4 bg-primary text-3xl font-bold"
          >
            {subject && typeof subject === "string"
              ? subject.toUpperCase()
              : "No Subject"}
          </button>
          <PdfContainer heading="Pdf Note" folder={folder} />
        </div>
      </>
    );
  }
}
export default Box;
