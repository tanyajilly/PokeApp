import { Order } from "../types";
export default function sortArray<T>(list: T[], property: keyof T, order: Order): T[] {
    return list.sort((a, b) => {
        const val_a = a[property];
        const val_b = b[property];

        // Compare numeric values
        if (typeof val_a === "number" && typeof val_b === "number") {
            return order === "asc" ? val_a - val_b : val_b - val_a;
        }

        // Handle strings, and also mixed or unexpected types by converting to string and comparing
        const strA = String(val_a);
        const strB = String(val_b);
        return order === "asc"
            ? strA.localeCompare(strB)
            : strB.localeCompare(strA);
    });
}
