"use client"
import request from "@/server"
import { User } from "@/types/userType"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button } from "@mui/material"

const SingleOrderAdmin = () => {
    const [data, setData] = useState<User>()
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
  
    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const {data} = await request.get(`user/${id}`)
                setData(data)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [ id])

  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Conifirm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={`${loading ? 'h-screen relative' : ''}`}>
        {loading ?  <Box className='absolute top-10 left-1/2 transform -translate-x-1/2'>
          <CircularProgress />
          </Box> : 
            <TableRow
              key={data?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {`${data?.firstName} ${data?.lastName}`}
              </TableCell>
              <TableCell align="right">{data?.username}</TableCell>
              <TableCell align="right">{data?.phoneNumber}</TableCell>
              <TableCell align="right">{data?.createdAt?.split('T')[0]}/{data?.createdAt?.split('T')[1].split('.')[0]}</TableCell>
              <TableCell align="right">
                <Button variant="contained" className="bg-blue-500">conifirm</Button>
              </TableCell>
            </TableRow> }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default SingleOrderAdmin