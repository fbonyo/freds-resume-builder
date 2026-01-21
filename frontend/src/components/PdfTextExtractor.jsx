import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfTextExtractor({ file, keywords = [] }) {
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

      // Highlight keywords
      let highlighted = fullText;
      keywords.forEach(kw => {
        const re = new RegExp(kw, 'gi');
        highlighted = highlighted.replace(re, match => `<mark>${match}</mark>`);
      });

      setText(highlighted);
    };
    reader.readAsArrayBuffer(file);
  }, [file, keywords]);

  return (
    <div
      className="text-box"
      dangerouslySetInnerHTML={{ __html: text || 'No text extracted yet.' }}
    />
  );
}

export default PdfTextExtractor;
