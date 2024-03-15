import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    Paper,
    TablePagination,
} from "@mui/material";
import { fetchPokemonList, fetchPokemonDetails } from "../../services/pokeApi";
import { PokemonDetails, Order } from "../../types";
import sortArray from "../../utils/sort";
import PokemonRow from "./TableRow";
import PokemonHeader from "./TableHeader";
import TableSkeleton from "./TableSkeleton";

const ROWS_PER_PAGE = 10;

const PokemonTable: React.FC = () => {
    const [pokeList, setPokeList] = useState<PokemonDetails[]>([]);
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof PokemonDetails>();
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        const offset = page * ROWS_PER_PAGE;
        fetchPokemonList(offset, ROWS_PER_PAGE, signal)
            .then((data) => {
                setTotalRows(data.count);
                const detailPromises = data.results.map((el) => {
                    return fetchPokemonDetails(el.name, signal).then(
                        (pokemon) => {
                            // Return an object with only the required attributes
                            return {
                                id: pokemon.id,
                                name: pokemon.name,
                                image: pokemon.sprites.front_default,
                                abilities: pokemon.abilities.map(
                                    (ability) => ability.ability.name
                                ),
                                types: pokemon.types.map(
                                    (type) => type.type.name
                                ),
                                weight: pokemon.weight,
                                height: pokemon.height,
                            };
                        }
                    );
                });

                return Promise.all(detailPromises);
            })
            .then((details) => {
                // all promises are resolved, set the state with the details
                setPokeList(details);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Fetch error:", error);
                }
            });

        setTimeout(() => {
            setLoading(false);
        }, 1500); // Simulating delay

        // abort the request if a new request is initiated due to page change
        return () => controller.abort();
    }, [page]);

    const handleSort = (property: keyof PokemonDetails) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
        setPokeList(sortArray(pokeList, property, isAsc ? "desc" : "asc"));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            {loading ? (
                <TableSkeleton rows={10} columns={5} />
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <PokemonHeader
                            order={order}
                            orderBy={orderBy}
                            handleSort={handleSort}
                        />
                        <TableBody>
                            {pokeList.map((row) => (
                                <PokemonRow key={row.id} pokemon={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <TablePagination
                component="div"
                count={totalRows}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                rowsPerPageOptions={[ROWS_PER_PAGE]}
                onPageChange={handleChangePage}
            />
        </>
    );
};

export default PokemonTable;
