import React, { useState } from 'react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import { TermsConditionsViewer } from '../__styles__'
import terms from '../../../assets/files/foundations-terms-010925.pdf'

export function TermsAndConditionsPdf({ finalisePdfLoad }) {
  const [numPages, setNumPages] = useState<number | null>(null)
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    finalisePdfLoad(true)

    setNumPages(numPages)
  }

  return (
    <TermsConditionsViewer>
      <div className="pdf-viewer">
        <Document file={terms} onLoadSuccess={onDocumentLoadSuccess} loading="Loading..." scale={1.5}>
          {Array.from({ length: numPages ?? 0 }, (_, i) => (
            <Page key={i + 1} pageNumber={i + 1} renderTextLayer={false} renderAnnotationLayer={false} loading="" />
          ))}
        </Document>
      </div>
    </TermsConditionsViewer>
  )
}
