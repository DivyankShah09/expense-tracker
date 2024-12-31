import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { PrimaryButton } from "../button/PrimaryButton";
import { RecurringExpense } from "../../interfaces/RecurringExpense";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RecurringExpenseTableProps {
  recurringExpenseAllData: RecurringExpense[] | undefined;
  onClick?: (id: number | undefined) => void;
}

const RecurringExpenseTable = ({
  recurringExpenseAllData = [],
  onClick,
}: RecurringExpenseTableProps) => {
  const navigate = useNavigate();
  const callEditRecurringExpense = (id: number | undefined) => {
    navigate(`/edit-recurring-expense/${id}`);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = recurringExpenseAllData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Sr. no</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Title</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Description</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Amount</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Next Date</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Category</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Frequency</span>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map(
              (recurringExpense: RecurringExpense, index: number) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{recurringExpense.title}</TableCell>
                  <TableCell>{recurringExpense.description}</TableCell>
                  <TableCell>{recurringExpense.amount}</TableCell>
                  <TableCell>{recurringExpense.date}</TableCell>
                  <TableCell>{recurringExpense.category}</TableCell>
                  <TableCell>{recurringExpense.frequency}</TableCell>

                  <TableCell>
                    <PrimaryButton
                      buttonText="Edit"
                      onClick={async () => {
                        callEditRecurringExpense(recurringExpense.id);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <PrimaryButton
                      buttonText="Delete"
                      onClick={() => onClick && onClick(recurringExpense.id)}
                      className="bg-red-400 hover:bg-red-600"
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recurringExpenseAllData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default RecurringExpenseTable;
