import React from 'react'
import Button from '@mui/material/Button'
import jsPDF from 'jspdf'

import 'jspdf-autotable'

// const centerText = (pdf: any, title: any) => {
//   const pageWidth = pdf.internal.pageSize.getWidth()
//   const titleWidth = (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize()) / pdf.internal.scaleFactor

//   // Calculate the x-coordinate to center the text
//   const xCenter = (pageWidth - titleWidth) / 2

//   return pdf.text(title, xCenter, 20)
// }

const PDFGenerator = ({ data, data2 }: any) => {
  // Define custom dimensions (height and width)

  // Create a new jsPDF instance with swapped dimensions
  const pdf: any = new jsPDF({
    orientation: 'l', // Swap orientation based on dimensions
    unit: 'mm'
  })

  const generatePdf = () => {
    // Add logo image
    const imgWidth = 50 // Adjust the width of the logo
    const imgHeight = 30 // Adjust the height of the logo
    const xPosition = (pdf.internal.pageSize.getWidth() - imgWidth) / 2
    if (data.orderDetailId) {
      pdf.addImage(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/orderDetails/${data.orderDetailId.photo}`,
        'PNG',
        xPosition,
        10,
        imgWidth,
        imgHeight
      )
    }

    pdf.setFontSize(15)

    pdf.text(`ETAT RECAPITULATIF INDUSTERIS`, 150, 49, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`je sousigné `, 150, 55, { align: 'center' })
    if (data.orderDetailId) {
      pdf.text(`${data.orderDetailId.name}`, 150, 60, { align: 'center' })
      pdf.text(`${data.orderDetailId.address}`, 150, 65, { align: 'center' })
      pdf.text(`${data.orderDetailId.ville} ${data.orderDetailId.codePostal}`, 150, 70, { align: 'center' })
    } else {
      pdf.text(`MD INDUSTRIE`, 150, 60, { align: 'center' })
      pdf.text(`23 Avenue Fréres Montgolfier`, 150, 65, { align: 'center' })
      pdf.text(`69680 CHASSIEU`, 150, 70, { align: 'center' })
    }

    pdf.text(
      `Attest sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers
    `,
      150,
      80,
      { align: 'center' }
    )

    pdf.text(`à l'adresse de travaux :`, 150, 89, { align: 'center' })
    pdf.text(`${data.clientAdress}`, 150, 96, { align: 'center' })
    pdf.text(`${data.clientVille} ${data.clientCodePostal}`, 150, 101, { align: 'center' })
    pdf.text(`Marque : MDI TECHNOLOGIE`, 150, 115, { align: 'center' })
    pdf.text(`Résistance thermique : 1,58 m².K/w à un tempurature moyenne de 50°c`, 150, 128, { align: 'center' })
    pdf.text(`: 1,27 m².K/w à un tempurature moyenne de 100°c et non 1,58`, 172, 133, { align: 'center' })
    pdf.text(`Isolant et référance : Laine de verre ISOVER TECH ROLL 3.0 - classé au feu A1`, 150, 138, {
      align: 'center'
    })
    pdf.text(`Température maximale : 200°C1`, 150, 145, {
      align: 'center'
    })
    pdf.text(`Température fluide caloporteur : 70°C`, 150, 150, {
      align: 'center'
    })
    pdf.text(`Référance : ISOVAN`, 150, 155, {
      align: 'center'
    })
    pdf.text(`Lieu d'implantationdes metelas : CHAUFFERIE`, 150, 160, {
      align: 'center'
    })
    pdf.text(`Nomber de points singuliers posés : `, 150, 165, {
      align: 'center'
    })

    pdf.text(`Total de points singuliers = ${data?.pdefDetails.length}`, 150, 190, {
      align: 'center'
    })
    pdf.addPage()

    // Dynamic content on subsequent pages
    pdf.setFontSize(12)
    const tableHeader = [
      `lieu d'implantation`,
      `Type de point singulier`,
      `Référence matelas`,
      'N° De repérage',
      'Nature de flu ide calopor teur'
    ]
    pdf.autoTable({
      startY: 30,

      head: [tableHeader],
      body: data2
    })

    // Save the PDF using save() method
    pdf.save('example.pdf')
  }

  return (
    <Button fullWidth variant='tonal' color='secondary' onClick={generatePdf}>
      Télecharger
    </Button>
  )
}

export default PDFGenerator
