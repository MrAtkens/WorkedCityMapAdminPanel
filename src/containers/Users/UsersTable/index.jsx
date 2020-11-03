import React, {useContext} from 'react';
import { observer } from 'mobx-react'
import MaterialTable from 'material-table';

import { UsersStoreContext } from 'store'
import "./style.scss"

const UsersTable = observer(() => {

    const usersStore = useContext(UsersStoreContext)

    const deleteModerator = (oldData) => {
      usersStore.deleteModerator(oldData)
    }
    return(
      <MaterialTable
          title="Users Table"
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Phone', field: "phone"},
            { title: 'Email', field: "email"},
            { title: "EmailAccept", field: "emailAccept", type: 'boolean'},
            { title: "Date of registration", field: "creationDate", type: 'date'}
          ]}
          data={usersStore.users}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            grouping: true,
            pageSize: 10
          }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => usersStore.getUsers(),
          }
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(resolve => {
              resolve();
              deleteModerator(oldData)
            })
        }}
        />
      );
  })

export default UsersTable