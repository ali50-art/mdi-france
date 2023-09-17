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
  const handleCount = () => {
    let nb = 0
    let nb2 = 0
    let nb3 = 0

    data2.forEach((el: any) => {
      if (el[4] == 'vapeur') {
        nb += 1
      } else if (el[4] == 'Eau surchauffée') {
        nb2 += 1
      } else {
        nb3 += 1
      }
    })

    return [nb, nb2, nb3]
  }
  const generatePdf = () => {
    const [nb, nb2, nb3] = handleCount()

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

    pdf.text(`ETAT RECAPITULATIF`, 150, 49, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`je sousigné `, 150, 55, { align: 'center' })
    if (data.orderDetailId) {
      pdf.text(`${data.orderDetailId.name}`, 150, 60, { align: 'center' })
      pdf.text(`${data.orderDetailId.address}`, 150, 65, { align: 'center' })
      pdf.text(`${data.orderDetailId.ville} ${data.orderDetailId.codePost}`, 150, 70, { align: 'center' })
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
    pdf.text(
      `Résistance thermique : 1,2 m².K/W sur un réseau d'eau surchauffée à température moyenne de 90°C
      `,
      150,
      128,
      { align: 'center' }
    )
    pdf.text(
      `: 1 m².K/W sur un réseau vapeur à température moyenne de 110°C
    `,
      150,
      133,
      {
        align: 'center'
      }
    )
    pdf.text(
      `: 1 m².K/W sur un réseau de fluide organique à température moyenne de 120°C
    `,
      150,
      138,
      {
        align: 'center'
      }
    )
    pdf.text(`Isolant et Référence : Laine de verre ISOVER TECH ROLL 3.0 - classé au feu A1`, 150, 155, {
      align: 'center'
    })
    pdf.text(`Température maximale : 200°C1`, 150, 160, {
      align: 'center'
    })

    pdf.text(`points en eau chaude au retour de condensats en circuit fermé`, 150, 170, {
      align: 'center'
    })

    // Define the checkbox position and size
    pdf.text(`Type de fonctionnement : `, 120, 180, {
      align: 'center'
    })
    const checkboxX = 150
    const checkboxY = 180
    const checkboxSize = 4

    // Set the line width for a bold appearance
    pdf.setLineWidth(0.7) // You can adjust the line width as needed

    // Checkbox square
    pdf.rect(checkboxX, checkboxY, checkboxSize, checkboxSize)

    // Checkmark lines
    if (data.typeOfFunction == '1') {
      pdf.line(checkboxX, checkboxY, checkboxX + checkboxSize, checkboxY + checkboxSize)
      pdf.line(checkboxX, checkboxY + checkboxSize, checkboxX + checkboxSize, checkboxY)
    }

    pdf.text(`2x8`, 160, 184, {
      align: 'center'
    })
    const checkboxX2 = 150
    const checkboxY2 = 185
    const checkboxSize2 = 4

    // Set the line width for a bold appearance
    pdf.setLineWidth(0.7) // You can adjust the line width as needed

    // Checkbox square
    pdf.rect(checkboxX2, checkboxY2, checkboxSize2, checkboxSize2)

    // Checkmark lines
    if (data.typeOfFunction == '2') {
      pdf.line(checkboxX2, checkboxY2, checkboxX2 + checkboxSize2, checkboxY2 + checkboxSize2)
      pdf.line(checkboxX2, checkboxY2 + checkboxSize2, checkboxX2 + checkboxSize2, checkboxY2)
    }

    pdf.text(`3x8 avec arrêt le week-end`, 182, 189, {
      align: 'center'
    })
    const checkboxX3 = 150
    const checkboxY3 = 190
    const checkboxSize3 = 4

    // Set the line width for a bold appearance
    pdf.setLineWidth(0.7) // You can adjust the line width as needed

    // Checkbox square
    pdf.rect(checkboxX3, checkboxY3, checkboxSize3, checkboxSize3)

    // Checkmark lines
    if (data.typeOfFunction == '3') {
      pdf.line(checkboxX3, checkboxY3, checkboxX3 + checkboxSize3, checkboxY3 + checkboxSize3)
      pdf.line(checkboxX3, checkboxY3 + checkboxSize3, checkboxX3 + checkboxSize3, checkboxY3)
    }

    pdf.text(`3x8 sans arrêt le week-end`, 183, 194, {
      align: 'center'
    })
    pdf.addPage()
    pdf.text(`vapeur = ${nb}`, 150, 10, {
      align: 'center'
    })
    pdf.text(`Eau surchauffée = ${nb2}`, 150, 15, {
      align: 'center'
    })
    pdf.text(`Fluide organique = ${nb3}`, 150, 20, {
      align: 'center'
    })
    pdf.text(`Total de points singuliers = ${data2.length}`, 150, 28, {
      align: 'center'
    })

    // Dynamic content on subsequent pages
    pdf.setFontSize(12)
    const tableHeader = [
      `Zone d'implantation`,
      `Type de point singulier`,
      `Référence matelas`,
      'N° De repérage',
      'Fluide'
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
      Télécharger
    </Button>
  )
}

export default PDFGenerator
