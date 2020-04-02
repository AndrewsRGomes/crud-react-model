import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

//icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
;

// Generate Order Data
function createData(id, cliente, processo, valor,taxa, status, detalhes) {
  return { id, cliente, processo, valor, taxa, status, detalhes };
}

const rows = [
  createData(0, 'fulanaldo da silva', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(1, 'maria da silveira', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(2, 'arthur gado', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(3, 'gato briguento', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(4, 'paula dutra lateja', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(5, 'marcia canudo', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(6, 'famigerado sujeito', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00'),
  createData(7, 'cardume de mosca', 'abertura de empresa', '1500,00', '300', 'pendente', 'taxa de liberação: R$150, taxa transitória: R$150,00')
];

function preventDefault(event) {
  event.preventDefault();
}

export default function TabelaOrcamento() {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Processos</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Taxas</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Opções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cliente}</TableCell>
              <TableCell>{row.processo}</TableCell>
              <TableCell>{row.valor}</TableCell>
              <TableCell>{row.taxa}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <IconButton aria-label="delete">
                        <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete">
                        <EditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete">
                        <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
  );
}