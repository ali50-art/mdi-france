// ** MUI Import
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const SelectCustom = ({ data, setData, haseAll }: any) => {
  const handleSelect = async (e: any) => {
    await setData(e.target.value)
  }
  let firstElement = ''
  if (data?.length > 0 && haseAll == false) {
    firstElement = data[0].value
  }

  return (
    <CustomTextField
      select
      defaultValue={`${firstElement}`}
      id='custom-select'
      style={{ width: '100%' }}
      onChange={handleSelect}
    >
      {data?.map((el: any, i: number) => {
        if (i == 0) {
          return (
            <MenuItem key={i} value={el.value}>
              <em>{el.label}</em>
            </MenuItem>
          )
        } else {
          return (
            <MenuItem key={i} value={el.value}>
              {el.label}
            </MenuItem>
          )
        }
      })}
    </CustomTextField>
  )
}

export default SelectCustom
