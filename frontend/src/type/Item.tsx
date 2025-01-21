export type Section = "fruit" | "vegetable" | "dairy" | "meat" | "bakery" | "beverages" | "frozen" | "snacks" | "pantry" | "household" | "personal care" | "other";

export type Item = {
    name: string;
    section: Section;
}
