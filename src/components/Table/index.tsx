import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { GridBaseColDef } from '@mui/x-data-grid/internals';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import { getApps } from '../../service';
import { AppOverview, GetAppsResponse } from '../../types';

interface TableProps {
  setChosenRow: Dispatch<SetStateAction<null | AppOverview>>;
}

export default function Table({ setChosenRow }: TableProps) {
  const [rows, setRows] = useState<AppOverview[]>([]);
  const columns: GridBaseColDef[] = [
    { headerName: 'Name', field: 'appName' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Connector', field: 'appSources' },
  ];
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    pageNumber: 1,
  });

  const { isLoading, data, error, makeRequest } = useRequest();

  useEffect(() => {
    makeRequest(getApps(paginationModel));
  }, []);

  useEffect(() => {
    if (data) {
      const res = data as unknown as GetAppsResponse;
      setRows(res?.appRows.map((item) => ({ ...item, id: item.appId })));
    }
  }, [data]);
  const onRowClick = ({ row }: GridRowParams<AppOverview>) => {
    setChosenRow(row);
  };

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: { paginationModel: paginationModel },
        }}
        pageSizeOptions={[25, 50]}
        onRowClick={onRowClick}
      ></DataGrid>
    </div>
  );
}
