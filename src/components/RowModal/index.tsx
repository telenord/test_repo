import { Box, Card, CardContent, Modal, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridBaseColDef } from '@mui/x-data-grid/internals';
import { FC, useEffect, useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import { getAppOverviewUsers } from '../../service';
import {
  AppOverview,
  GetAppOverviewUsersResponse,
  RowModalUser,
} from '../../types';

interface RowModalProps {
  row: AppOverview | null;
  onClose(): void;
}
const RowModal: FC<RowModalProps> = ({ row, onClose }) => {
  const columns: GridBaseColDef[] = [
    { headerName: 'Users', field: 'name' },
    { headerName: '', field: '' },
    { headerName: '', field: '' },
  ];

  const [rows, setRows] = useState<RowModalUser[]>([]);
  const { isLoading, data, makeRequest } = useRequest();

  const open = Boolean(row);
  useEffect(() => {
    if (row) {
      makeRequest(getAppOverviewUsers(row.appId));
    }
  }, [row]);

  useEffect(() => {
    if (data) {
      const res = data as unknown as GetAppOverviewUsersResponse;
      console.log('data', data);
      setRows(res.appUsers.map((name, index) => ({ name, id: name + index })));
    }
  }, [data]);

  const getCardData = () => {
    if (!row) return null;
    const { appId, appName, appSources, category } = row;

    return (
      <>
        <CardContent>
          <Typography
            sx={{ fontSize: 14, mb: 1.5 }}
            color="text.secondary"
            gutterBottom
          >
            App name: {appName}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Category: {category}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            Users: {rows.length}
          </Typography>
        </CardContent>
      </>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="App overview"
      sx={{
        width: '70%',
      }}
    >
      <Box
        sx={{
          width: '70%',
        }}
      >
        <Card variant="outlined">{getCardData()}</Card>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid columns={columns} rows={rows}></DataGrid>
        </div>
      </Box>
    </Modal>
  );
};
export default RowModal;
