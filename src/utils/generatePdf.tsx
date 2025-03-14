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

    pdf.text(`ETAT RECAPITULATIF`, 150, 49, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`je soussigné:  `, 150, 55, { align: 'center' })
    pdf.text(`MD INDUSTRIE`, 150, 60, { align: 'center' })
    pdf.text(`23 Avenue des Frères  Montgolfier`, 150, 65, { align: 'center' })
    pdf.text(`69680 CHASSIEU`, 150, 70, { align: 'center' })
    pdf.text(
      `Atteste sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers
    `,
      150,
      80,
      { align: 'center' }
    )

    pdf.text(`Au bénéfice de : `, 150, 89, { align: 'center' })
    pdf.text(`${data2[0].address}`, 150, 96, { align: 'center' })
    pdf.text(`${data2[0].ville} ${data2[0].codePostal}`, 150, 101, { align: 'center' })
    pdf.text(`Marque : MDI TECHNOLOGIE`, 150, 138, { align: 'center' })
    pdf.setFontSize(12)

    pdf.text(`Référence : ISOVAN`, 150, 143, {
      align: 'center'
    })
    pdf.text(`Isolant laine de verre: : ISOVER TECH ROLLL3.0 - classé au feu A1`, 150, 148, {
      align: 'center'
    })
    pdf.text(`Température fluide caloporteur : 70°C`, 150, 156, {
      align: 'center'
    })
    pdf.text(`Résistance thermique : 1,58 m².K/W à une température moyenne de 50 °C `, 150, 161, { align: 'center' })
    pdf.text(`: 1,27 m².K/W à une température moyenne de 100°C`, 172, 166, { align: 'center' })

    pdf.text(`Température maximale : 250°C`, 150, 171, {
      align: 'center'
    })

    pdf.text(`Nombre des points singuliers posés : `, 150, 180, {
      align: 'center'
    })
    pdf.text(`DN20 a DN65 = ${Between20And65}`, 150, 185, {
      align: 'center'
    })
    pdf.text(`DN66 a DN100 = ${Between66And100}`, 150, 190, {
      align: 'center'
    })
    pdf.text(`DN > 100 = ${morThen100}`, 150, 195, {
      align: 'center'
    })

    pdf.text(`Total de points singuliers = ${data.length}`, 150, 200, {
      align: 'center'
    })
    pdf.addPage()

    // Dynamic content on subsequent pages
    pdf.setFontSize(12)
    const tableHeader = [
      `lieu d'implantation`,
      `Type de point singulier`,
      `Référence matelas`,
      'Masse volumique',
      'N° De repérage',
      'dn',
      'Nature de fluidecaloporteur'
    ]
    pdf.autoTable({
      startY: 30,

      head: [tableHeader],
      body: data
    })

    // Save the PDF using save() method
    pdf.save('RES/TER.pdf')
  }

  return (
    <Button fullWidth variant='tonal' color='secondary' onClick={generatePdf}>
      Vérifier
    </Button>
  )
}

export default PDFGenerator
