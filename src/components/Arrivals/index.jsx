import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ArrivalContainer } from './styles';
import { Title, } from '../styles';

const Arrivals = ({fligtsdata}) => {
    const [flightdata, setFlightdata] = useState();

    useEffect(() => {
        if(fligtsdata) {
            setFlightdata(fligtsdata);
        }
    }, [fligtsdata])
    
    useEffect(() => {
        if(localStorage.getItem("flightsdata")) {
            setFlightdata(JSON.parse(localStorage.getItem("flightsdata")));
        }
    }, [])
    
    return (
        <ArrivalContainer>
            <Title>ARRIVALS</Title>
            <TableContainer className='tableContainer' component={Paper}>
                <Table m='10px 0' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>aircraft_id</TableCell>
                            <TableCell align="center">aircraft_type</TableCell>
                            <TableCell align="center">estimated_off</TableCell>
                            <TableCell align="center">estimated_on</TableCell>
                            <TableCell align="center">status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flightdata && flightdata.arrivals.map((row, id) => (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.ident}
                                </TableCell>
                                <TableCell align="center">{row.aircraft_type}</TableCell>
                                <TableCell align="center">{row.estimated_off}</TableCell>
                                <TableCell align="center">{row.estimated_on}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ArrivalContainer>
    );
}

export default Arrivals;
