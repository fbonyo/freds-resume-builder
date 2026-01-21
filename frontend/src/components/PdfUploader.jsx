import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfTextExtractor from './PdfTextExtractor.jsx';
import PdfDownloader from './PdfDownloader.jsx';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfUploader() {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const onFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const uploadFile = async (file) => {
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

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  return (
    <div
      className={dragOver ? "card drag-over" : "card"}
      id="resume-container"
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <h2>Fred's Resume Builder</h2>
      <input type="file" multiple accept="application/pdf" onChange={onFileChange} />
      {files.map((file, idx) => (
        <div key={idx} className="card pdf-container">
          <h3>{file.name}</h3>
          <button onClick={() => uploadFile(file)}>Upload</button>
          <Document file={file}>
            {Array.from(new Array(file.numPages || 1), (el, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>
          <PdfTextExtractor file={file} />
        </div>
      ))}
      <PdfDownloader elementId="resume-container" />
    </div>
  );
}

export default PdfUploader;
