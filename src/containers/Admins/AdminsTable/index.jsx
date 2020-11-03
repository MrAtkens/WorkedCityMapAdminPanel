import React, {useContext} from 'react';
import { observer } from 'mobx-react'
import MaterialTable from 'material-table';

import { AdminStoreContext, CRUDAdminStoreContext } from 'store'

const AdminsTable = observer(() => {

    const adminsStore = useContext(AdminStoreContext)
    const crudAdminStore = useContext(CRUDAdminStoreContext)

    const editAdmin = (rowData) => {
      crudAdminStore.setAdminEdit(rowData)
      crudAdminStore.setIsEditAdminOpen(true)
    }

    const deleteAdmin = (oldData) => {
      adminsStore.deleteAdmin(oldData)
    }
    console.log(adminsStore.admins)
    return(
      <MaterialTable
          title="Admins Table"
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Login', field: "login"},
            { title: 'Last Name', field: "lastName"},
            { title: "First Name", field: "firstName"},
            { title: "Date of add", field: "creationDate", type: 'date'},
            { title: 'Added Moderators', field: 'addedModerators', type: 'numeric' },
            { title: 'Added Teams', field: 'addedTeams', type: 'numeric' },
          ]}
          data={adminsStore.admins}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            grouping: true,
            pageSize: 10
          }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => editAdmin(rowData)
          },
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => adminsStore.getAdmins(),
          },
          {
            icon: 'add',
            tooltip: 'Add Admin',
            isFreeAction: true,
            onClick: () => crudAdminStore.setIsAddAdminOpen(true)
          }
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(resolve => {
              resolve();
              console.log(oldData)
              deleteAdmin(oldData)
            })
        }}
        />
      );
  })

export default AdminsTable