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

const PDFGenerator = ({ data, data2, res }: any) => {
  // Define custom dimensions (height and width)

  // Create a new jsPDF instance with swapped dimensions
  const pdf: any = new jsPDF({
    orientation: 'l', // Swap orientation based on dimensions
    unit: 'mm'
  })
  const handleDn = () => {
    let Between20And65 = 0
    let Between66And100 = 0
    let morThen100 = 0
    res.forEach((el: any) => {
      const dn: number = el?.dn
      if (20 <= dn && dn <= 65) {
        Between20And65 += 1
      } else if (dn >= 66 && dn <= 100) {
        Between66And100 += 1
      } else {
        morThen100 += 1
      }
    })

    return [Between20And65, Between66And100, morThen100]
  }
  const generatePdf = () => {
    // Add logo image
    const [Between20And65, Between66And100, morThen100] = handleDn()

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
    pdf.text(`Résistance thermique : 1,27m2.K/W à une température moyenne de 100°C`, 150, 128, { align: 'center' })
    pdf.text(`: 1,58 m².K/W à une température moyenne de 50 °C`, 172, 133, { align: 'center' })
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
    pdf.text(`DN20 a DN65 = ${Between20And65}`, 150, 170, {
      align: 'center'
    })
    pdf.text(`DN66 a DN100 = ${Between66And100}`, 150, 175, {
      align: 'center'
    })
    pdf.text(`DN > 100 = ${morThen100}`, 150, 180, {
      align: 'center'
    })

    pdf.text(`Total de points singuliers = ${data.length}`, 150, 190, {
      align: 'center'
    })
    pdf.addPage()

    // Dynamic content on subsequent pages
    pdf.setFontSize(12)
    const tableHeader = [
      `lieu d'implantation`,
      `Types de point singulier`,
      `Référence mateles`,
      'Mass volumique',
      'N° De repérage',
      'dn',
      'Nature de flu ide calopor teur'
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
