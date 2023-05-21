export interface Item {
    title: string;
    message: string;
    completed?:boolean;
    todoId?:string | undefined;
    id?:string | undefined;
}

export interface EditItem {
    completed:boolean;
    todoId: string | undefined;
}