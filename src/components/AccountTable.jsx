import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../actions/actions";
import { patch } from "../library/Api";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPenSquare, faArrowUpAZ, faArrowDownaz, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { IconButton, TextField, Button, TablePagination } from "@mui/material";

function AccountTable() {
  const [modal, setModal] = useState(false);
  const [id, setID] = useState(0);
  const [change, setChange] = useState(" ");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleChange = (e) => {
    setChange(e.target.value);
  };

  const toggleModal = (account) => {
    setCurrentAccount(account);
    setID(account.id);
    setModal(true);
  };

  const handleName = (e) => {
    e.preventDefault();
    setModal(false);
    console.log("ID:", id);
    console.log("New Name:", change);
    patch(`apis/account/overide_name/edit/${id}`, { override_name: change })
      .then(() => {
        dispatch(getAccounts());
      })
      .catch((error) => {
        console.error("Error updating override name:", error);
      });
  };

  const handleCloseModal = () => {
    setCurrentAccount(null);
    setChange(" ");
    setModal(false);
  };

  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  const sortedAccounts = accounts.slice().sort((a, b) => {
    const nameA = a.account_full_name.toLowerCase();
    const nameB = b.account_full_name.toLowerCase();
    if (nameA < nameB) return sortDirection === "asc" ? -1 : 1;
    if (nameA > nameB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const paginatedAccounts = sortedAccounts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const sortIcon = () => {
    if (sortDirection === "asc") {
      return <FontAwesomeIcon icon={faArrowUpAZ} style={{ color: "#639C8E"}}/>;
    }
    else 
    {
      return <FontAwesomeIcon icon={faArrowDownAZ} style={{ color: "#639C8E"}}/>;
    }
  }


  return (
    <div className="Table">
      <Navbar name="Accounts Table" />
      <div className="TableContainer">
        <table className="neumorphic-table">
          <thead>
            <tr>
              <th style={{ width: "47.5%" }}>
                Account Full Name
                <Button onClick={handleSortChange}>
                  {sortIcon()}
                </Button>
              </th>
              <th style={{ width: "47.5%" }}>Override Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAccounts.map((account) => (
              <tr key={account.id}>
                <td>{account.account_full_name}</td>
                <td>{account.overided_name}</td>
                <td>
                  <IconButton
                    color="inherit"
                    onClick={() => toggleModal(account)}
                  >
                    <FontAwesomeIcon
                      icon={faPenSquare}
                      style={{ color: "#479083", height: "1em" }}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={sortedAccounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>

      {modal && currentAccount && (
        <div className="modal">
          <div onClick={handleCloseModal} className="overlay"></div>
          <div className="modal-content">
            <IconButton
              color="inherit"
              onClick={handleCloseModal}
              style={{ float: "right" }}
            >
              <FontAwesomeIcon
                icon={faClose}
                style={{ color: "#479083", height: "1em" }}
              />
            </IconButton>
            <form onSubmit={handleName}>
              <h2>Edit Override Name</h2>
              <TextField
                disabled
                id="outlined-disabled"
                label="Account name"
                defaultValue={currentAccount.account_full_name}
                margin="normal"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="New override name"
                value={change}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#639C8E",
                  "&:hover": {
                    bgcolor: "#98BDB4",
                  },
                }}
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountTable;

