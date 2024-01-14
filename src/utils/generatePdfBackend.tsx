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
  const handleDn = () => {
    let Between20And65 = 0
    let Between66And100 = 0
    let morThen100 = 0
    data.pdefDetails.forEach((el: any) => {
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
    const imgWidth = 50 // Adjust the width of the logo
    const imgHeight = 30 // Adjust the height of the logo
    const xPosition = (pdf.internal.pageSize.getWidth() - imgWidth) / 2

    if (data?.orderDetailId?.photo) {
      const imageSrc = `${process.env.NEXT_PUBLIC_SERVER_URI}/orderDetails/${data.orderDetailId.photo}`
      const extanstion = imageSrc.split('.')

      pdf.addImage(imageSrc, extanstion[extanstion.length - 1].toUpperCase(), xPosition, 10, imgWidth, imgHeight)
    }

    pdf.setFontSize(15)

    pdf.text(`ETAT RECAPITULATIF`, 150, 49, { align: 'center' })
    pdf.setFontSize(13)
    pdf.text(`je soussigné: `, 150, 55, { align: 'center' })
    pdf.setFontSize(12)
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
    pdf.text(`${data?.clientName}`, 150, 120, { align: 'center' })
    pdf.text(`${data?.clientAdress}`, 150, 125, { align: 'center' })
    pdf.text(`${data?.clientVille} ${data?.clientCodePostal}`, 150, 130, { align: 'center' })
    pdf.setFontSize(15)
    pdf.text(`Marque : MDI TECHNOLOGIE`, 150, 138, { align: 'center' })
    pdf.setFontSize(12)
    pdf.text(`Résistance thermique : 1,58 m².K/W à une température moyenne de 50 °C `, 150, 145, { align: 'center' })
    pdf.text(`: 1,27 m².K/W à une température moyenne de 100°C`, 172, 150, { align: 'center' })
    pdf.text(`Isolant et référence : Laine de verre ISOVER TECH ROLL 3.0 - classé au feu A1`, 150, 155, {
      align: 'center'
    })
    pdf.text(`Température maximale : 250°C`, 150, 160, {
      align: 'center'
    })
    pdf.text(`Température fluide caloporteur : 70°C`, 150, 165, {
      align: 'center'
    })
    pdf.text(`Référence : ISOVAN`, 150, 170, {
      align: 'center'
    })

    pdf.text(`Nombre de points singuliers posés : `, 150, 180, {
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
    pdf.text(`Total des points singuliers = ${data.pdefDetails.length}`, 150, 200, {
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
      body: data2
    })
    pdf.addPage()
    pdf.setFontSize(10)
    pdf.text('Les éléments déclarés ci-dessus sont à titre indicatif', 30, pdf.autoTable.previous.finalY + 40)
    pdf.setFontSize(13)
    pdf.text('Signature + Date + Cachet ', 42, pdf.autoTable.previous.finalY + 54)
    pdf.text('Signature + Date + Cachet ', 210, pdf.autoTable.previous.finalY + 54)
    pdf.text('Nom/Prénom/Fonction du représentant : ', 30, pdf.autoTable.previous.finalY + 60)
    pdf.text('Nom/Prénom/Fonction du bénéficiare : ', 200, pdf.autoTable.previous.finalY + 60)

    // Save the PDF using save() method
    pdf.save('RES/TER.pdf')
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
