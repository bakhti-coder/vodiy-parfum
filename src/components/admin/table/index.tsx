"use client";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import CircularProgress from '@mui/material/CircularProgress';
import TableRow from '@mui/material/TableRow';
import Title from '@/components/shares/Title';
import useOrders from '@/store/orders';
import { Box, Button } from '@mui/material';

const OrdersTableAdmin = ({status, length}: any) => {
    const {loading, data, getOrders, conifrmOrders, btnLoading, btnId} = useOrders()

    React.useEffect(() => {
      getOrders()
    }, [getOrders])
  return (
    <React.Fragment>
         <Title>{status} ORDERS({length})</Title>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell
                  align='right'
                  style={{ minWidth: 170 }}
                >
                  Status
                </TableCell>
                <TableCell
                  align='right'
                  style={{ minWidth: 170 }}
                >
                  Products(3)
                </TableCell>
                <TableCell
                  align='right'
                  style={{ minWidth: 170 }}
                >
                  CreatedAt
                </TableCell>
                <TableCell
                  align='right'
                  style={{ minWidth: 170 }}
                >
                  Actions
                </TableCell>
                <TableCell
                  align='right'
                  style={{ minWidth: 170 }}
                >
                  See more
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={`${loading ? 'h-screen relative' : ''}`}>
            {loading ? <Box className='absolute top-10 left-1/2 transform -translate-x-1/2'>
            <CircularProgress />
          </Box> :  data.filter(el => el.status === status)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        <TableCell align='right'>
                          <p className={`${status === 'ACCEPTED' && 'text-[#3AB449]' || status === 'SUCCESS' && 'text-[#1BA345]' || status === 'CANCELED' && 'text-[#dc759b]' } `}>
                          {row.status}
                          </p>
                        </TableCell>
                        <TableCell align='right'>
                          {row.cart.length} Product
                        </TableCell>
                        <TableCell align='right'>
                          {row.createdAt.split('T')[0]} | {row.createdAt.split('T')[1].split('.')[0]}
                        </TableCell>
                        <TableCell align='right'>
                            {status === 'ACCEPTED' ?  <div className='flex items-center justify-end'>
                          {
                            btnId === row._id && btnLoading ? <Button
                            onClick={() => conifrmOrders(row._id)}
                            size="small"
                            variant="contained"
                            className="bg-blue-400 text-white cursor-not-allowed"
                          >
                            wait...
                            </Button> : <Button
                              onClick={() => conifrmOrders(row._id)}
                              size="small"
                              variant="contained"
                              className="bg-blue-400 text-white "
                            >
                              conifrm
                            </Button>
                          }
                           {
                            btnId === row._id && btnLoading ? <Button
                            onClick={() => conifrmOrders(row._id)}
                            size="small"
                            variant="contained"
                            color="error"
                            className="bg-red-500 text-white cursor-not-allowed ml-2"
                          >
                              wait...
                            </Button> : <Button
                              onClick={() => conifrmOrders(row._id)}
                              size="small"
                              variant="contained"
                              color="error"
                              className="bg-red-500 text-white ml-2"
                            >
                              cancel
                            </Button>
                          }
                          </div> : <Button variant="contained" disabled>
                                Disabled
                            </Button>                        }
                         
                        </TableCell>
                        <TableCell align='right'>
                          <Button
                          href={`/admin/orders/${row.userId}`}
                            size="small"
                            className=""
                          >
                            see
                          </Button>
                        </TableCell>
                  </TableRow>
                );
              })}  
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </React.Fragment>
  )
}

export default OrdersTableAdmin