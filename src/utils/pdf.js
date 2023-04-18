import { jsPDF } from 'jspdf'
import { formatText } from './format'

export function createPDF(data) {
  const copy = { ...data }
  delete copy.base64Image
  delete copy.createdAt
  delete copy.id

  const doc = new jsPDF()

  const map = new Map(Object.entries(copy))

  let index = 0
  const lineSpacing = 8
  const maxTextWidth = 180

  for (const [key, value] of map) {
    let textLines = []
    const formattedKey = formatText(key)

    if (Array.isArray(value)) {
      textLines.push(`${formattedKey}:`)
      value.forEach((item) => textLines.push(`- ${item}`))
    } else {
      textLines = doc.splitTextToSize(`${formattedKey}: ${value}`, maxTextWidth)
    }

    const textOffset = 10 + index * lineSpacing

    doc.setFontSize(10)
    doc.text(textLines, 10, textOffset)
    index += textLines.length
  }

  return doc
}

export function createAndDownloadPdf(data, pdfName) {
  const doc = createPDF(data)
  downloadPDF(doc, pdfName)
}

export function downloadPDF(pdfDoc, pdfName) {
  pdfDoc.save(`${pdfName}.pdf`)
}
