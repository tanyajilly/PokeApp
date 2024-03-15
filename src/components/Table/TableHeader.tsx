import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { PokemonDetails, Order } from "../../types";

interface PokemonTableHeaderProps {
    orderBy: keyof PokemonDetails | undefined;
    order: Order;
    handleSort: {
        (property: keyof PokemonDetails): void;
    };
}

const PokemonTableHeader: React.FC<PokemonTableHeaderProps> = ({
    orderBy,
    order,
    handleSort,
}) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>
                    <TableSortLabel
                        active={orderBy === "id"}
                        direction={orderBy === "id" ? order : "asc"}
                        onClick={() => handleSort("id")}
                    >
                        ID
                    </TableSortLabel>
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>
                    <TableSortLabel
                        active={orderBy === "name"}
                        direction={orderBy === "name" ? order : "asc"}
                        onClick={() => handleSort("name")}
                    >
                        Name
                    </TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        active={orderBy === "weight"}
                        direction={orderBy === "weight" ? order : "asc"}
                        onClick={() => handleSort("weight")}
                    >
                        Weight
                    </TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        active={orderBy === "height"}
                        direction={orderBy === "height" ? order : "asc"}
                        onClick={() => handleSort("height")}
                    >
                        Height
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default PokemonTableHeader;
