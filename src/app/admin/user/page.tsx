'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Box, Button, Fade, Grid, Modal, Pagination, TextField } from '@mui/material';
import Title from '@/components/shares/Title';
import CircularProgress from '@mui/material/CircularProgress';
import SearchInput from '@/components/admin/search-input';
import useUser from '@/store/user';
import { LIMIT } from '@/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IFormInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  password: string;
}

const UsersAdmin = () => {

  const {
    dataUser,
    total,
    loading,
    page,
    pageSize,
    search,
    isModalOpen,
    isModalLoading,
    selected,
    handleEdit,
    handleOk,
    showModal,
    closeModal,
    handlePage,
    handleSearch,
    getUserData,
    handleDelete,
    btnId,
    btnLoading,
  } = useUser();

  React.useEffect(() => {
    getUserData();
  }, [getUserData]);

  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>({});

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleOk(data, reset);
  };


  return (
    <section>
       <Box className="flex justify-between items-center gap-10">
        <Title>Users({loading ? "..." : total})</Title>
        <SearchInput handleSearch={handleSearch} search={search} />
      </Box>
      <Box className="text-right">
        <Button
          onClick={() => showModal(reset)}
          size="small"
          variant="contained"
          className="bg-blue-400 text-white py-2 px-7"
        >
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Full name</StyledTableCell>
            <StyledTableCell align="right">Last name</StyledTableCell>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">Phone number</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className={`${loading ? 'h-screen relative' : ''}`}>
          {loading ?  <Box className='absolute top-10 left-1/2 transform -translate-x-1/2'>
          <CircularProgress />
          </Box> : dataUser.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {`${row?.firstName} ${row?.lastName}`}
              </StyledTableCell>
              <StyledTableCell align="right">@{row.username}</StyledTableCell>
              <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{`${row.createdAt.split('T')[0]}`}</StyledTableCell>
              <StyledTableCell align="right">
                    <EditIcon color='primary' className='mx-4 cursor-pointer' onClick={() => handleEdit(row._id, setValue)} />
                    {btnId === row._id && btnLoading ? <CircularProgress size={20} /> : <DeleteIcon color='error' className='mx-4 cursor-pointer' onClick={() => handleDelete(row._id)} />}
                    
              </StyledTableCell>
            </StyledTableRow>
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>

      {total > LIMIT ? (
        <Pagination
          className="mt-10"
          color="primary"
          count={pageSize}
          page={page}
          onChange={(e, value) => handlePage(value)}
        />
      ) : null}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModalOpen}>
          <Box sx={style}>
            User data
            <div
              className="absolute top-0 right-3 cursor-pointer"
              onClick={closeModal}
            >
              X
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("firstName")}
                    size="small"
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("lastName")}
                    size="small"
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("username")}
                    size="small"
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("phoneNumber")}
                    size="small"
                    id="outlined-basic"
                    label="Phone number"
                    variant="outlined"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  <TextField
                    {...register("password")}
                    size="small"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    sx={{ minWidth: "100%" }}
                  />
                </Grid>
                <Grid xs={12} className="mt-5">
                  {isModalLoading ? (
                    <Button
                      size="small"
                      variant="contained"
                      className="bg-blue-400 text-white w-full cursor-not-allowed"
                    >
                      Loading..
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      className="bg-blue-400 text-white w-full"
                    >
                      {selected === null ? "Add" : "save"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </section>
  )
}

export default UsersAdmin