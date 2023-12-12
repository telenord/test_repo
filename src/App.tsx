import { useState } from 'react';
import './App.css';
import NavHeader from './components/Nav';
import RowModal from './components/RowModal';
import Table from './components/Table';
import { AppOverview } from './types';

function App() {
  const [chosenRow, setChosenRow] = useState<null | AppOverview>(null);

  const onClose = () => {
    setChosenRow(null);
  };
  return (
    <>
      <div>
        <NavHeader />
        <Table setChosenRow={setChosenRow} />
      </div>

      <RowModal row={chosenRow} onClose={onClose}></RowModal>
    </>
  );
}

export default App;
