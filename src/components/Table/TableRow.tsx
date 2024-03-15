import { useState } from "react";
import {
    Table,
    TableCell,
    TableRow,
    Box,
    IconButton,
    Collapse
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { PokemonDetails } from "../../types";

interface PokemonRowProps {
    pokemon: PokemonDetails;
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
                key={pokemon.name}
                sx={{
                    cursor: 'pointer',
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
                onClick={() => setOpen(!open)}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {pokemon.id}
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 100,
                            verticalAlign: 'top'
                        }}
                        alt={pokemon.name}
                        src={pokemon.image}
                    />
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{pokemon.name}</TableCell>
                <TableCell>{pokemon.weight}</TableCell>
                <TableCell>{pokemon.height}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    sx={{ padding: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" aria-label="characteristics">
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Types
                                    </TableCell>
                                    <TableCell>
                                        {pokemon.types.join(", ")}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Abilities
                                    </TableCell>
                                    <TableCell>
                                        {pokemon.abilities.join(", ")}
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default PokemonRow;
