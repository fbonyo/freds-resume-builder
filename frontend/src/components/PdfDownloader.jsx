import React from 'react';
import html2pdf from 'html2pdf.js';

function PdfDownloader({ elementId }) {
  const downloadPdf = () => {
    const element = document.getElementById(elementId);
    if (!element) return;
    html2pdf().from(element).save('resume.pdf');
  };

  return (
    <button onClick={downloadPdf} style={{ marginTop: '10px' }}>
      Download PDF
    </button>
  );
}

export default PdfDownloader;
