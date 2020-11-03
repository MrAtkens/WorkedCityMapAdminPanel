import React, {useContext} from 'react';
import { observer } from 'mobx-react'
import MaterialTable from 'material-table';

import { ModeratorStoreContext, CRUDModeratorStoreContext } from 'store'

const ModeratorsTable = observer(() => {

    const moderatorsStore = useContext(ModeratorStoreContext)
    const crudModeratorStore = useContext(CRUDModeratorStoreContext)

    const editModerator = (rowData) => {
      crudModeratorStore.setModeratorEdit(rowData)
      crudModeratorStore.setIsEditModeratorOpen(true)
    }

    const deleteModerator = (oldData) => {
      moderatorsStore.deleteModerator(oldData)
    }
    
    return(
      <MaterialTable
          title="Moderators Table"
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Login', field: "login"},
            { title: 'Last Name', field: "lastName"},
            { title: "First Name", field: "firstName"},
            { title: "Date of add", field: "creationDate", type: 'date'},
            { title: 'Accepted works', field: 'acceptedWorksCount', type: 'numeric' },
            { title: 'Moderated pins', field: 'moderatedPinsCount', type: 'numeric' },
          ]}
          data={moderatorsStore.moderators}
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
            onClick: (event, rowData) => editModerator(rowData)
          },
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => moderatorsStore.getModerators(),
          },
          {
            icon: 'add',
            tooltip: 'Add moderator',
            isFreeAction: true,
            onClick: () => crudModeratorStore.setIsAddModeratorOpen(true)
          }
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(resolve => {
              resolve();
              console.log(oldData)
              deleteModerator(oldData)
            })
        }}
        />
      );
  })

export default ModeratorsTable