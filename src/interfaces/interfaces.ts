export interface Item {
    title: string;
    message: string;
    completed?:boolean;
    todoId?:string;
    id?:string;
}

export interface EditItem {
    completed:boolean;
    todoId: string;
}