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
  const handleCount = () => {
    let nb = 0
    let nb2 = 0
    let nb3 = 0
    data.forEach((el: any) => {
      if (el[3] == 'vapeur') {
        nb += 1
      } else if (el[3] == 'Eau surchauffée') {
        nb2 += 1
      } else {
        nb3 += 1
      }
    })

    return [nb, nb2, nb3]
  }

  const generatePdf = () => {
    // Add logo image
    const [nb, nb2, nb3] = handleCount()
    pdf.setFontSize(15)

    pdf.text(`ETAT RECAPITULATIF INDUSTRIE`, 150, 49, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`je soussigné : `, 150, 55, { align: 'center' })
    pdf.text(`MD INDUSTRIE`, 150, 60, { align: 'center' })
    pdf.text(`23 Avenue Fréres Montgolfier`, 150, 65, { align: 'center' })
    pdf.text(`69680 CHASSIEU`, 150, 70, { align: 'center' })
    pdf.text(
      `Atteste sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers
    `,
      150,
      80,
      { align: 'center' }
    )

    pdf.text(`à l'adresse de travaux : :`, 150, 89, { align: 'center' })
    pdf.text(`${data2[0].address}`, 150, 96, { align: 'center' })
    pdf.text(`${data2[0].ville} ${data2[0].codePostal}`, 150, 101, { align: 'center' })
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
    pdf.text(`vapeur = ${nb}`, 150, 185, {
      align: 'center'
    })
    pdf.text(`Eau surchauffée = ${nb2}`, 150, 190, {
      align: 'center'
    })
    pdf.text(`Fluide organique = ${nb3}`, 150, 195, {
      align: 'center'
    })

    pdf.text(`Total de points singuliers = ${data.length}`, 150, 200, {
      align: 'center'
    })
    pdf.addPage()

    // Dynamic content on subsequent pages
    pdf.setFontSize(12)
    const tableHeader = [
      `Zone d'implantation`,
      `Type de point singulier`,
      `Référence matelas`,
      'Fluide',
      'N° De repérage'
    ]
    pdf.autoTable({
      startY: 30,
      head: [tableHeader],
      body: data
    })

    // Save the PDF using save() method
    pdf.save('INDUSTRIE.pdf')
  }

  return (
    <Button fullWidth variant='tonal' color='secondary' onClick={generatePdf}>
      Vérifier
    </Button>
  )
}

export default PDFGenerator
