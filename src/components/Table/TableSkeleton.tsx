import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
} from "@mui/material";
import { Skeleton } from "@mui/lab";

const TableSkeleton = ({ rows = 10, columns = 5 }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="skeleton table">
                <TableHead>
                    <TableRow>
                        {Array.from(new Array(columns)).map((_, index) => (
                            <TableCell key={index}>
                                <Skeleton animation="wave" height={30} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(new Array(rows)).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from(new Array(columns)).map(
                                (_, columnIndex) => (
                                    <TableCell key={columnIndex}>
                                        <Skeleton
                                            animation="wave"
                                            height={30}
                                        />
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableSkeleton;
