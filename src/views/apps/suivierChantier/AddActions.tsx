// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import PDFFile from '../../../utils/generatePdfBackend'

import PDFFile2 from '../../../utils/generatePdfBackend2'
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

// import * as XLSX from 'xlsx'

import ExcelJS from 'exceljs'

// import base64Img from 'base64-img'

// ** Icon Imports

const AddActions = () => {
  const store: any = useSelector((state: RootState) => state.suiviChantierPdf)
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const handleSetData = () => {
    const dataFiltered: any = []
    store?.data?.pdefDetails?.forEach((element: any) => {
      const newData = []
      newData.push(element.place)
      newData.push(element.filterType)
      newData.push(element.model)
      newData.push(element.mass)
      newData.push(element.nbRep)
      newData.push(element.dn)
      newData.push(element.nature)
      dataFiltered.push(newData)
    })
    setData(dataFiltered)
  }
  const handleSetData2 = () => {
    const dataFiltered: any = []
    store?.data?.pdefDetails?.forEach((element: any) => {
      const newData = []
      newData.push(element.place)
      newData.push(element.filterType)
      newData.push(element.model)
      newData.push(element.nbRep)
      newData.push(element.nature)
      dataFiltered.push(newData)
    })
    setData2(dataFiltered)
  }

  useEffect(() => {
    handleSetData()
    handleSetData2()
  }, [store.data])
  const toDataURL = (url: any) => {
    const promise = new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        const reader = new FileReader()
        reader.readAsDataURL(xhr.response)
        reader.onloadend = function () {
          resolve({ base64Url: reader.result })
        }
      }
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.send()
    })

    return promise
  }

  // Function to get checkbox symbol based on typeOfFunction
  function getCheckboxSymbol(typeOfFunction: any, type: any) {
    return typeOfFunction === type ? '☑' : '□'

    // You can customize the symbols as needed
  }
  const handleCount = (data2: any) => {
    let nb = 0
    let nb2 = 0
    let nb3 = 0

    data2.forEach((el: any) => {
      if (el.nature == 'vapeur') {
        nb += 1
      } else if (el.nature == 'Eau surchauffée') {
        nb2 += 1
      } else {
        nb3 += 1
      }
    })

    return [nb, nb2, nb3]
  }
  const handleDn = (data: any) => {
    let Between20And65 = 0
    let Between66And100 = 0
    let morThen100 = 0
    data.forEach((el: any) => {
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
  const handleDownloadXl = async (d: any) => {
    console.log("d : ",d);
    
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    if (d.orderDetailId) {
      // let base = ''
      // Sample URL, replace it with your actual image URL
      const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URI}/orderDetails/${d.orderDetailId.photo}`
      const result: any = await toDataURL(imageUrl)
      const splitted = imageUrl.split('.')
      const extName: any = splitted[splitted.length - 1]
      const imageId2 = workbook.addImage({
        base64: result.base64Url,
        extension: extName
      })

      worksheet.addImage(imageId2, {
        tl: { col: 5, row: 1 },
        ext: { width: 200, height: 100 }
      })
    }

    // Add the text to the specified row and column
    if(d.type=="residentiel"){
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${8}`).value = 'ETAT RECAPITULATIF RES/TER'
    }else{
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${8}`).value = 'ETAT RECAPITULATIF INDUSTRIE'
    }
    
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${8}`).font = { size: 14 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${9}`).value = 'je soussigné : '
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${9}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${9}`).alignment = { vertical: 'middle', horizontal: 'center' }
    if (d.orderDetailId) {
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${10}`).value = `${d.orderDetailId.name}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${10}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${10}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${11}`).value = `${d.orderDetailId.address}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${11}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${11}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${12}`
      ).value = `${d.orderDetailId.ville} ${d.orderDetailId.codePost}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${12}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${12}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    }
    worksheet.getCell(
      `${String.fromCharCode(64 + 6)}${14}`
    ).value = `Atteste sur l'honneur avoir mis en oeuvre les travaux d'isolation de points singuliers`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${14}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${14}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${16}`).value = 'au bénéfice de : '
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${16}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${16}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${17}`).value = `${d.traveauxName}`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${17}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${17}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${18}`).value = `${d.travauxAdress}`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${18}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${18}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${19}`).value = `${d.travauxVille}`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${19}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${19}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${21}`).value = ` à l'adresse de travaux  :`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${21}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${22}`).value = `${d.clientName}`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${22}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${22}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }

    worksheet.getCell(`${String.fromCharCode(64 + 6)}${23}`).value = `${d.clientAdress}`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${23}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${23}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${24}`).value = `${d?.clientVille} ${d?.clientCodePostal}`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${24}`).font = { size: 13 }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${24}`).alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${26}`).value = `Marque : MDI TECHNOLOGIE`
    worksheet.getCell(`${String.fromCharCode(64 + 6)}${26}`).font = { size: 13 }
    if (d.type == 'indestrie') {
      const [nb, nb2, nb3] = handleCount(d.pdefDetails)
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${28}`
      ).value = `Résistance thermique : 1,50 m².K/W sur un réseau d'eau chaude ou de retour de condensats à température moyenne de 70°C`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${28}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${28}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${29}`
      ).value = `:1,33 m².K/W sur un réseau d'eau surchauffée à température moyenne de 90°C    `
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${29}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${29}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${30}`
      ).value = `: 1,22 m².K/W sur un réseau vapeur à une température moyenne de 110°C             `
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${30}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${30}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${31}`
      ).value = `        : 1,18 m².K/W sur un réseau de fluide organique à une température moyenne de 120°C`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${31}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${31}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${32}`
      ).value = `Isolant et Référence : Laine de verre ISOVER TECH ROLL 3.0 - classé au feu A1`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${32}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${32}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${33}`).value = `Température maximale : 300°`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${33}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${35}`).value = `Type de fonctionnement :`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${35}`).font = { size: 13 }
      const data: any = [
        { typeOfFunction: '1', description: '2x8' },
        { typeOfFunction: '2', description: '3x8 avec arrêt le week-end' },
        { typeOfFunction: '3', description: '3x8 sans arrêt le week-end' }
      ]

      // Add rows with checkboxes
      data.forEach((item: any, index: any) => {
        const i = index + 1

        // Add 2 because we have a header in the first row
        worksheet.getCell(`${String.fromCharCode(64 + 6)}${35 + i}`).value = `${getCheckboxSymbol(
          item.typeOfFunction,
          d.typeOfFunction
        )} ${item.description}`
        worksheet.getCell(`${String.fromCharCode(64 + 6)}${35 + i}`).alignment = {
          vertical: 'middle',
          horizontal: 'left'
        }
      })
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${40}`).value = `vapeur = ${nb}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${40}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${41}`).value = `Eau surchauffée = ${nb2}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${41}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${42}`).value = `Fluide organique = ${nb3}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${42}`).font = { size: 13 }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${43}`
      ).value = `Total de points singuliers = ${d.pdefDetails.length}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${43}`).font = { size: 13 }

      // // Add your table data
      worksheet.addRow([])
      worksheet.addRow([])
      const tableHeaders = [
        "Zone d'implantation",
        'Type de point singulier',
        'Référence matelas',
        'N° De repérage',
        'Fluide'
      ]

      // Add table headers to the worksheet with borders and custom styles
      const headerRow = worksheet.addRow([...Array(3), ...tableHeaders])
      headerRow.eachCell((cell: any) => {
        cell.border = {
          top: { style: 'thick', color: { argb: '0000' } },
          left: { style: 'thick', color: { argb: '0000' } },
          bottom: { style: 'thick', color: { argb: '0000' } },
          right: { style: 'thick', color: { argb: '0000' } }
        }
        cell.font = {
          size: 14,
          bold: true
        }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }

        // Customize the height of the header row
        headerRow.height = 30
      })

      worksheet.columns = [
        { header: '', key: '', width: 25 },
        {
          header: '',
          key: '',
          width: 15
        },
        {
          header: '',
          key: '',
          width: 35
        },
        {
          header: '',
          key: '',
          width: 35
        },
        {
          header: '',
          key: '',
          width: 30
        },
        {
          header: '',
          key: '',
          width: 30
        },
        {
          header: '',
          key: '',
          width: 20
        },
        {
          header: '',
          key: '',
          width: 10
        },
        {
          header: '',
          key: '',
          width: 40
        }
      ]
      const tableData: any = []
      d.pdefDetails.forEach((element: any) => {
        const arr = [element.place, element.filterType, element.model, element.nbRep, element.nature]
        tableData.push(arr)
      })
      tableData.forEach((row: any) => {
        const bodyRow = worksheet.addRow([...Array(3), ...row])
        bodyRow.eachCell((cell: any) => {
          cell.border = {
            top: { style: 'thick', color: { argb: '0000' } },
            left: { style: 'thick', color: { argb: '0000' } },
            bottom: { style: 'thick', color: { argb: '0000' } },
            right: { style: 'thick', color: { argb: '0000' } }
          }
          cell.font = {
            size: 14
          }
          cell.alignment = { vertical: 'middle', horizontal: 'center' }

          // Customize the height of the header row
          headerRow.height = 20
        })
      })
    } else {
      const [Between20And65, Between66And100, morThen100] = handleDn(d.pdefDetails)
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${28}`
      ).value = `Résistance thermique : 1,58 m².K/W à une température moyenne de 50 °C                    `
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${28}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${28}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${29}`
      ).value = `                     : 1,27 m².K/W à une température moyenne de 100°C`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${29}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${29}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${31}`
      ).value = `Isolant et référence : Laine de verre ISOVER TECH ROLL 3.0 - classé au feu A1                 `
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${31}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${31}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${33}`).value = `Température maximale : 250°C`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${33}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${33}`).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${34}`).value = `Température fluide caloporteur : 70°C`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${34}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${34}`).alignment = {
        vertical: 'middle',
        horizontal: 'left'
      }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${35}`).value = `Référence : ISOVAN`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${35}`).font = { size: 13 }
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${37}`).value = `Nombre de points singuliers posés :`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${37}`).font = { size: 13 }

      // Set values for the specified cells
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${38}`).value = `DN20 a DN65 = ${Between20And65}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${39}`).value = `DN66 a DN100 = ${Between66And100}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${40}`).value = `DN > 100 = ${morThen100}`

      // Center the text vertically and set font size for the specified cells
      const arr = [38, 39, 40]
      arr.forEach(row => {
        const cell = worksheet.getCell(`${String.fromCharCode(64 + 6)}${row}`)
        cell.font = { size: 13 }
        cell.alignment = { vertical: 'middle', horizontal: 'left' }
      })
      worksheet.getCell(
        `${String.fromCharCode(64 + 6)}${42}`
      ).value = `Total des points singuliers =${d.pdefDetails.length}`
      worksheet.getCell(`${String.fromCharCode(64 + 6)}${42}`).font = { size: 13 }

      // // Add your table data
      worksheet.addRow([])
      worksheet.addRow([])
      const tableHeaders = [
        "Zone d'implantation",
        'Type de point singulier',
        'Référence matelas',
        'Masse volumique',
        'N° De repérage',
        'dn',
        'Nature de fluidecaloporteur'
      ]

      // Add table headers to the worksheet with borders and custom styles
      const headerRow = worksheet.addRow([...Array(3), ...tableHeaders])
      headerRow.eachCell((cell: any) => {
        cell.border = {
          top: { style: 'thick', color: { argb: '0000' } },
          left: { style: 'thick', color: { argb: '0000' } },
          bottom: { style: 'thick', color: { argb: '0000' } },
          right: { style: 'thick', color: { argb: '0000' } }
        }
        cell.font = {
          size: 14,
          bold: true
        }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }

        // Customize the height of the header row
        headerRow.height = 30
      })

      worksheet.columns = [
        {
          header: '',
          key: '',
          width: 20
        },
        { header: '', key: '', width: 25 },
        {
          header: '',
          key: '',
          width: 15
        },
        {
          header: '',
          key: '',
          width: 35
        },
        {
          header: '',
          key: '',
          width: 35
        },
        {
          header: '',
          key: '',
          width: 30
        },
        {
          header: '',
          key: '',
          width: 30
        },
        {
          header: '',
          key: '',
          width: 20
        },
        {
          header: '',
          key: '',
          width: 10
        },
        {
          header: '',
          key: '',
          width: 40
        }
      ]
      const tableData: any = []
      d.pdefDetails.forEach((element: any) => {
        const arr = [
          element.place,
          element.filterType,
          element.model,
          element.mass,
          element.nbRep,
          element.dn,
          element.nature
        ]
        tableData.push(arr)
      })
      tableData.forEach((row: any) => {
        const bodyRow = worksheet.addRow([...Array(3), ...row])
        bodyRow.eachCell((cell: any) => {
          cell.border = {
            top: { style: 'thick', color: { argb: '0000' } },
            left: { style: 'thick', color: { argb: '0000' } },
            bottom: { style: 'thick', color: { argb: '0000' } },
            right: { style: 'thick', color: { argb: '0000' } }
          }
          cell.font = {
            size: 14
          }
          cell.alignment = { vertical: 'middle', horizontal: 'center' }

          // Customize the height of the header row
          headerRow.height = 20
        })
      })
    }

    // Save the workbook to a file
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${d.clientName}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    // const xldata: any = []
    // if (d.type == 'indestrie') {
    //   d.pdefDetails.forEach((element: any) => {
    //     xldata.push({
    //       "Zon d'implantation": element.place,
    //       'Type de point singulier': element.filterType,
    //       'Réference metelas': element.model,
    //       'N° repérage': element.nbRep,
    //       Fluide: element.nature
    //     })
    //   })
    // } else {
    //   d.pdefDetails.forEach((element: any) => {
    //     xldata.push({
    //       "Zon d'implantation": element.place,
    //       'Type de point singulier': element.filterType,
    //       'Réference metelas': element.model,
    //       'N° repérage': element.nbRep,
    //       dn: element.dn,
    //       'Nature du fluide caloporteur': element.nature
    //     })
    //   })
    // }
    // const wb = XLSX.utils.book_new(),
    //   ws = XLSX.utils.json_to_sheet(xldata)
    // XLSX.utils.book_append_sheet(wb, ws, 'mdiExcel')
    // XLSX.writeFile(wb, `${d.clientName}.xlsx`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {store.data.type === 'indestrie' ? (
            <PDFFile2 data={store.data} data2={data2} />
          ) : (
            <PDFFile data={store.data} data2={data} />
          )}
          {store.data.type === 'indestrie' ? (
            <Button
              style={{ marginBottom: '0.5rem' }}
              fullWidth
              variant='contained'
              onClick={() => handleDownloadXl(store?.data)}
              sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}
            >
              Télécharger Excel
            </Button>
          ) : (
            <Button
              fullWidth
              style={{ marginBottom: '0.5rem' }}
              variant='contained'
              onClick={() => handleDownloadXl(store?.data)}
              sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}
            >
              Télécharger Excel
            </Button>
          )}
          <Link href='/suivi-chantier'>
            <Button fullWidth variant='outlined' sx={{ '& svg': { mr: 2 }, marginRight: '1.5rem' }}>
              <Icon fontSize='1.125rem' icon='tabler:arrow-big-left-lines-filled' />
              Retourner
            </Button>
          </Link>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddActions
