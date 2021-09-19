import React, {useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid'
import { server_calls } from '../../api/server';
import { useGetData } from '../../custom-hooks';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
  } from '@material-ui/core';
import { MarvelForm } from '../../components'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        type: 'number',
        width: 110,
        editable: true,
      },
    {
      field: 'comics_appeared_in',
      headerName: 'Height',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'super_power',
      headerName: 'Super_power',
      sortable: false,
      width: 160,
    },
  ];

  interface gridData{
      data:{
          id?:string;
      }
  }

export const DataTable = () => {
    let {marvelData, getData} = useGetData();
    let[open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}})

    let handleOpen = () => {
        setOpen(true)
    }
    let handleClose = () => {
        setOpen(false)
    }
    let deleteData = () => {
        server_calls.delete(gridData.data.id!)
    }
    console.log(gridData.data.id)

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Character In Inventory</h2>
            <DataGrid rows={marvelData} columns={columns} pageSize={5} checkboxSelection />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant='contained' color='secondary' onClick={deleteData}></Button>
        {/* Dialog Pop up starts here */}
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Update Your Character </DialogTitle>
          <DialogContent>
            <DialogContentText>{gridData.data.id}</DialogContentText>
            <MarvelForm id= {gridData.data.id!} />
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color='primary'>Cancel</Button>
          </DialogActions>
        </Dialog>
        </div>
    )
} 


