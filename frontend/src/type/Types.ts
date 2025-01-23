export interface Item {
    id: string;
    name: string;
    checked: boolean;
    section: string;
}

export interface ListItem {
    item: Item;
    quantity: number;
}

export interface ShoppingList {
    id: string;
    name: string;
    list: ListItem[];
}
