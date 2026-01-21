import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfTextExtractor from './PdfTextExtractor.jsx';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfUploader() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    alert('File uploaded: ' + data.fileName);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <button onClick={uploadFile}>Upload</button>

      {file && (
        <>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>

          <PdfTextExtractor file={file} />
        </>
      )}
    </div>
  );
}

export default PdfUploader;
