import React, { useState } from "react";
import { Header2Text } from "../../components/text/Header2Text";
import { useNavigate } from "react-router-dom";
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
import { Income } from "../../interfaces/Income";
import { PrimaryButton } from "../button/PrimaryButton";

interface IncomeTableProps {
  incomeAllData: Income[] | undefined;
  headerRequired?: boolean;
  headerLabel?: string;
  colSpan?: number | undefined;
  updateBtnRequired?: boolean;
  onClick?: (id: number | undefined) => void;
}

export const IncomeTable = ({
  incomeAllData = [],
  headerRequired = false,
  headerLabel = "",
  colSpan = undefined,
  updateBtnRequired = false,
  onClick,
}: IncomeTableProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleViewAllClick = () => {
    navigate("/list-all-incomes");
  };

  const callEditIncome = (id: number | undefined) => {
    navigate(`/edit-income/${id}`);
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

  const paginatedData = incomeAllData.slice(
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
            {paginatedData?.map((income: Income, index: number) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{income.title}</TableCell>
                <TableCell>{income.date}</TableCell>
                <TableCell>{income.amount}</TableCell>
                <TableCell>{income.description}</TableCell>
                {updateBtnRequired && (
                  <>
                    <TableCell>
                      <PrimaryButton
                        buttonText="Edit"
                        onClick={async () => {
                          callEditIncome(income.id);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <PrimaryButton
                        buttonText="Delete"
                        onClick={() => onClick && onClick(income.id)}
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
          count={incomeAllData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
