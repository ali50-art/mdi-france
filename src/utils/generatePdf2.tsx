import React from 'react'
import Button from '@mui/material/Button'
import jsPDF from 'jspdf'

import 'jspdf-autotable'

const PDFGenerator = ({ data, data2 }: any) => {
  // Define custom dimensions (height and width)

  // Create a new jsPDF instance with swapped dimensions
  const pdf: any = new jsPDF({
    orientation: 'l', // Swap orientation based on dimensions
    unit: 'mm'
  })

  const generatePdf = () => {
    // Add logo image

    pdf.setFontSize(15)

    pdf.text(`ETAT RECAPITULATIF INDUSTERIS`, 150, 49, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`je sousigné `, 150, 55, { align: 'center' })
    pdf.text(`MD INDUSTRIE`, 150, 60, { align: 'center' })
    pdf.text(`23 Avenue Fréres Montgolfier`, 150, 65, { align: 'center' })
    pdf.text(`69680 CHASSIEU`, 150, 70, { align: 'center' })
    pdf.text(
      `Attest sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers
    `,
      150,
      80,
      { align: 'center' }
    )
    pdf.text(`je sousigné `, 150, 89, { align: 'center' })
    pdf.text(`${data2[0].address}`, 150, 96, { align: 'center' })
    pdf.text(`${data2[0].ville} ${data2[0].codePostal}`, 150, 101, { align: 'center' })
    pdf.text(`Marque : MDI TECHNOLOGIE`, 150, 115, { align: 'center' })
    pdf.text(
      `Résistance thermique : 1,5 m².K/w sur un réseau d'au chaude et retour de condensats a température moyenne de 70°c`,
      150,
      128,
      { align: 'center' }
    )
    pdf.text(`: 1,2 m².K/w sur un réseau vapeur a tempurature moyenne de 110°c`, 150, 133, { align: 'center' })
    pdf.text(`: 1,2 m².K/w sur un réseau fluide organique a tempurature moyenne de 120°c`, 150, 138, {
      align: 'center'
    })
    pdf.text(`: 1,18 m².K/W sur un réseau de fluide organique à une température moyenne de 120°C`, 150, 144, {
      align: 'center'
    })

    pdf.text(`Isolant et référance : Laine de verre ISOVER TECH ROLL 3.0- classé au feu A1`, 150, 150, {
      align: 'center'
    })

    pdf.text(`Température maximale : 300°C`, 150, 155, {
      align: 'center'
    })

    pdf.text(`Référance : ISOVAN`, 150, 165, {
      align: 'center'
    })

    pdf.text(`Total de points singuliers = ${data.length}`, 150, 175, {
      align: 'center'
    })
    pdf.addPage()

    // Dynamic content on subsequent pages
    pdf.setFontSize(12)
    const tableHeader = [
      `lieu d'implantation`,
      `Types de point singulier`,
      `Référence mateles`,
      'N° De repérage',
      'Fluid'
    ]
    pdf.autoTable({
      startY: 30,
      head: [tableHeader],
      body: data
    })

    // Save the PDF using save() method
    pdf.save('example.pdf')
  }

  return (
    <Button fullWidth variant='tonal' color='secondary' onClick={generatePdf}>
      Vérifier
    </Button>
  )
}

export default PDFGenerator
