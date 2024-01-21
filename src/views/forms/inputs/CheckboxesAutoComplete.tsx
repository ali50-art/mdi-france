// ** MUI Import
import Checkbox from '@mui/material/Checkbox'

// ** Custom Component Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

const AutocompleteCheckboxes = ({ data, isMaterial = false, setData }: any) => {
  const handleSelect = (e: any, selectedData: any) => {
    if (selectedData.length > 0) {
      let newData: any = []
      if (isMaterial) {
        newData = selectedData.map((el: any) => el.model)
      } else {
        newData = selectedData.map((el: any) => el._id)
      }
      setData(newData)
    } else {
      setData([])
    }
  }

  return (
    <CustomAutocomplete
      style={{ width: '100%' }}
      multiple
      disableCloseOnSelect
      onChange={handleSelect}
      options={data}
      id='autocomplete-checkboxes'
      getOptionLabel={(option: any) => (isMaterial ? option.model : option.fullName)}
      renderInput={params => <CustomTextField {...params} placeholder='selectionez' />}
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            <Checkbox checked={selected} sx={{ mr: 2 }} />
            {isMaterial ? option.model : option.fullName}
          </li>
        )
      }}
    />
  )
}

export default AutocompleteCheckboxes
