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

    pdf.text(`ETAT RECAPITULATIF INDUSTRIE`, 150, 49, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`je soussigné `, 150, 55, { align: 'center' })
    if (data.orderDetailId) {
      pdf.setFontSize(12)
      pdf.text(`${data.orderDetailId.name}`, 150, 65, { align: 'center' })
      pdf.text(`${data.orderDetailId.address}`, 150, 70, { align: 'center' })
      pdf.text(`${data.orderDetailId.ville} ${data.orderDetailId.codePost}`, 150, 75, { align: 'center' })
    }

    pdf.text(
      `Atteste sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers
    `,
      150,
      82,
      { align: 'center' }
    )
    pdf.setFontSize(13)
    pdf.text(`au bénéfice de  :`, 150, 89, { align: 'center' })

    pdf.setFontSize(12)
    pdf.text(`${data?.traveauxName}`, 150, 94, { align: 'center' })
    pdf.text(`${data?.travauxAdress}`, 150, 101, { align: 'center' })
    pdf.text(`${data?.travauxVille} ${data?.travauxCodePostal}`, 150, 107, { align: 'center' })

    pdf.setFontSize(13)
    pdf.text(`à l'adresse de travaux  :`, 150, 115, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`${data.clientName}`, 150, 120, { align: 'center' })
    pdf.text(`${data.clientAdress}`, 150, 125, { align: 'center' })
    pdf.text(`${data.clientVille} ${data.clientCodePostal}`, 150, 130, { align: 'center' })
    pdf.setFontSize(13)
    pdf.text(`Marque : MDI TECHNOLOGIE`, 150, 138, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`Référence : ISOVAN`, 150, 143, {
      align: 'center'
    })
    pdf.text(`Isolant laine de verre: : ISOVER TECH ROLLL3.0 - classé au feu A1`, 150, 148, {
      align: 'center'
    })

    pdf.text(
      `Résistance thermique : 1,50 m².K/W sur un réseau d'eau chaude ou de retour de condensats à température moyenne de 70°C      `,
      150,
      158,
      { align: 'center' }
    )

    pdf.text(
      `: 1,33 m².K/W sur un réseau d'eau surchauffée à température moyenne de 90°C
    `,
      150,
      163,
      {
        align: 'center'
      }
    )

    pdf.text(`: 1,22 m².K/W sur un réseau vapeur à une température moyenne de 110°C    `, 150, 168, {
      align: 'center'
    })
    pdf.text(`: 1,18 m².K/W sur un réseau de fluide organique à une température moyenne de 120°C`, 150, 173, {
      align: 'center'
    })

    pdf.text(`Température maximale : 300°`, 150, 178, {
      align: 'center'
    })

    // Define the checkbox position and size
    pdf.text(`Type de fonctionnement : `, 120, 193.5, {
      align: 'center'
    })
    const checkboxX = 150
    const checkboxY = 185
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

    pdf.text(`2x8`, 160, 189, {
      align: 'center'
    })
    const checkboxX2 = 150
    const checkboxY2 = 190
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

    pdf.text(`3x8 avec arrêt le week-end`, 182, 194, {
      align: 'center'
    })
    const checkboxX3 = 150
    const checkboxY3 = 195
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

    pdf.text(`3x8 sans arrêt le week-end`, 183, 199, {
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
    pdf.addPage()
    pdf.setFontSize(10)

    pdf.text('Les éléments déclarés ci-dessus sont à titre indicatif', 30, 20)
    pdf.setFontSize(13)
    pdf.text('Signature + Date + Cachet ', 42, 34)
    pdf.text('Signature + Date + Cachet ', 210, 34)
    pdf.text('Nom/Prénom/Fonction du représentant : ', 30, 40)
    pdf.text('Nom/Prénom/Fonction du bénéficiare : ', 200, 40)

    // Save the PDF using save() method

    pdf.save('INDUSTRIE.pdf')
  }

  return (
    <Button
      fullWidth
      style={{ marginBottom: '0.5rem' }}
      variant='contained'
      sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}
      onClick={generatePdf}
    >
      Télécharger PDF
    </Button>
  )
}

export default PDFGenerator
