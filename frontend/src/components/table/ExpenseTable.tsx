import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header2Text } from "../../components/text/Header2Text";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Expense } from "../../interfaces/Expense";
import { PrimaryButton } from "../button/PrimaryButton";

interface ExpenseTableProps {
  expenseAllData: Expense[] | undefined;
  headerRequired?: boolean;
  headerLabel?: string;
  colSpan?: number | undefined;
  updateBtnRequired?: boolean;
  onClick?: (id: number | undefined) => void;
}
export const ExpenseTable = ({
  expenseAllData = [],
  headerRequired = false,
  headerLabel = "",
  colSpan = undefined,
  updateBtnRequired = false,
  onClick,
}: ExpenseTableProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleViewAllClick = () => {
    navigate("/list-all-expenses");
  };

  const callEditExpense = (id: number | undefined) => {
    navigate(`/edit-expense/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = expenseAllData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {headerRequired && (
              <TableRow>
                <TableCell colSpan={colSpan}>
                  <Header2Text label={headerLabel} className="m-2 text-left" />
                </TableCell>
                <TableCell align="right">
                  <p className="m-2" onClick={handleViewAllClick}>
                    <u className="font-semibold hover:text-primary cursor-pointer">
                      View All
                    </u>
                  </p>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>
                <span className="font-bold">Sr. no</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Title</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Date</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Amount</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Category</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Description</span>
              </TableCell>
              {updateBtnRequired && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((expense: Expense, index: number) => (
              <TableRow key={expense.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                {updateBtnRequired && (
                  <>
                    <TableCell>
                      <PrimaryButton
                        buttonText="Edit"
                        onClick={async () => {
                          callEditExpense(expense.id);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <PrimaryButton
                        buttonText="Delete"
                        onClick={() => onClick && onClick(expense.id)}
                        className="bg-red-400 hover:bg-red-600"
                      />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={expenseAllData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
