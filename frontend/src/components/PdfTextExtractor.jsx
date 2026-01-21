import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfTextExtractor({ file }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
      const typedarray = new Uint8Array(e.target.result);
      const pdf = await pdfjs.getDocument(typedarray).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
      }
      setText(fullText);
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  return (
    <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px', background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Extracted Text:</h3>
      {text || 'No text extracted yet.'}
    </div>
  );
}

export default PdfTextExtractor;
