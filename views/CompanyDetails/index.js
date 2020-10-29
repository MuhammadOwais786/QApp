import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});



function CompanyDetails() {
    const history = useHistory()
    const [companiesData, setCompaniesData] = useState([])
    const classes = useStyles();
    // const [page, setPage] = React.useState(0);
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetcCompany()
    }, [])

    const fetcCompany = async () => {
        const db = firebase.firestore()
        const data = await db.collection("companiesData").get()
        const companiesShow = []
        data.forEach(doc => {
            console.log('ID OF Document ****************** ', doc.id)
            companiesShow.push({ ...doc.data(), companyId: doc.id })
        })

        setCompaniesData(companiesShow)
        console.log(companiesShow)
    }


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const columns = [
    { id: 'srno', label: 'SR NO', minWidth: 40 },
    // id: 'name',
    { id:'companyName',  label: 'Name', minWidth: 170 },
    // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    { id: 'since', label: 'Since', minWidth: 100 },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'forDetails',
        label: 'For More Details',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Tokens',
        label: 'Allow Todays Token',
        minWidth: 170,
        align: 'right',
        value:<Button>Allow</Button>
        // format: (value) => value.toLocaleString('en-US'),
        // format: (value) => value.toFixed(2),
    },
];



    return (
    <>
            <h1 style={{marginTop:"100vh",marginBottom:"1000vh"}}>All Companies Details</h1>
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {companiesData.map((companiesData, index) => (
                            <StyledTableRow key={companiesData.name}>
                            <StyledTableCell align="left">{index +1}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {companiesData.companyName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{companiesData.since}</StyledTableCell>
                            <StyledTableCell align="right">{companiesData.address}</StyledTableCell>
                            <StyledTableCell align="right">{companiesData.V}</StyledTableCell>
                            <StyledTableCell align="right">{companiesData.protein}</StyledTableCell>
                            </StyledTableRow>
                        ))} */}
                        {companiesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((companiesData) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={companiesData.code}>
                                    {columns.map((column) => {
                                        const value = companiesData[column.id];
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value
                                                // && <Button>Allow</Button>
                                                }                 
                                              </StyledTableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="StyledTableCell"
                count={companiesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
                                        <Button
                                            // key={}
                                            onClick={() => history.push(`/ShowCompanyDetails/${companiesData.companyId}`)}

                                            // onClick={() => history.push('/showCompanyDetails')}
                                        >View Details</Button>
                                        <Button onClick={() => history.push('./Token')}>Allow Today's Token</Button>

        </>
    
        // <div className="App">
        //     <h1 style={{ marginTop: "-20px" }}>Add Company Details</h1>
        //     <br />
        //     <Table striped bordered hover style={{ backgroundColor: 'white', width: "100%" }}>
        //         <thead className="thead-light">
        //             <tr>
        //                 <th>SR NO</th>
        //                 <th>Company Name</th>
        //                 <th>Since</th>
        //                 <th>Timings</th>
        //                 <th>Address</th>
        //                 <th>Actions</th>
        //             </tr>
        //         </thead>
        //         <tbody>

        //             <>
        //                 {companiesData.map((compData,index) => (
        //                     <tr>
        //                         <td>{index +1}</td>
        //                         <td key={compData.companyName}>{compData.companyName}</td>
        //                         <td key={compData.since}>{compData.since}</td>
        //                         <td key={compData.timings}>{compData.timings}</td>
        //                         {/* <td key={companiesData.certificates}>{compData.certificates}</td> */}
        //                         <td key={compData.address}>{compData.address}</td>
        //                         <td>
                                        // <Button
                                        //     key={index}
                                        //     onClick={() => history.push(`/ShowCompanyDetails/${compData.companyId}`)}

                                        //     // onClick={() => history.push('/showCompanyDetails')}
                                        // >View Details</Button>
                                        // <Button onClick={() => history.push('./Token')}>Allow Today's Token</Button>
        //                         </td>

        //                     </tr>
        //                 ))}
        //             </>
        //         </tbody>
        //     </Table>

        // <Button onClick={() => history.push('/addCompany')}
        //     variant="outline-primary" size="lg" block
        //     style={{ marginRight: '-120%' }}
        // >ADD New Company Details</Button>
        // <br />
        // <Button onClick={() => history.goBack()}
        //     variant="outline-primary" size="lg"
        //     style={{ marginRight: '-120%', width: '100px' }}
        // >Back</Button>

        // </div>
    );
}

export default CompanyDetails;