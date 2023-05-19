import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditItem, Item } from "../interfaces/interfaces";
import toDoListServices from "./todolistServices";


interface todoState  {
    user:string | null;
    loading: boolean;
    loadingCreateItem:boolean;
    error: string | null;
    success: boolean;
    message:string;
    items: Item[] | null;
    messageFiltered:string;
  }
const user = localStorage.getItem('user') || null;

const initialState: todoState = {
    user:user ? user : null,
    loading: false,
    loadingCreateItem:false,
    error: null,
    items: [],
    success: false,
    message:"",
    messageFiltered:""
  }

export const getUser = createAsyncThunk(
    "todoList/getUser",
    async (_, thunkApi) => {
      try {
        let user = await toDoListServices.getUserId()
        localStorage.setItem("user",user)
        return user
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
);

export const createItem = createAsyncThunk(
    "todoList/addNewItem",
    async ( itemData:Item,thunkApi:any) => {
       
      try {
        const userId=thunkApi.getState().items.user 
        let item = await toDoListServices.addNewItem(userId,itemData)
        return item
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  )

export const updateItem = createAsyncThunk(
    "todoList/updateItem",
    async ( itemData:EditItem,thunkApi:any) => {
       
      try {
        const userId=thunkApi.getState().items.user 
        let item = await toDoListServices.editItem(userId,itemData)
        return item
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  )

export const deleteItem = createAsyncThunk(
    'todoList/delete',
    async (todoId:string, thunkApi:any) => {
      try {
        const userId = thunkApi.getState().items.user
        await toDoListServices.deleteItem(userId,todoId)

        return todoId
      } catch (error:any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  )

export const resetList = createAsyncThunk(
  'todoList/resetList',
  async (_, thunkApi:any) => {
    try {
      const userId = thunkApi.getState().items.user
      const result= await toDoListServices.resetList(userId)
      return result
    } catch (error:any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const getAllItems = createAsyncThunk(
  "todoList/getAllItems",
  async (_, thunkApi:any) => {
    try {
      const userId = thunkApi.getState().items.user
      const result=await toDoListServices.getAllItems(userId)
      return result
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getItemsCompletedOrNot = createAsyncThunk(
  "todoList/getItemsCompletedOrNot",
  async (completed:boolean, thunkApi:any) => {
    try {
      const userId = thunkApi.getState().items.user
      const result= await toDoListServices.getItemsCompletedOrNot(userId,completed)
      return result
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        reset: (state) => {
        state.error = null;
        state.success = false;
        },
        resetMessage: (state) => {
          state.messageFiltered = "";
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getUser.fulfilled, (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(createItem.pending, (state) => {
          state.loadingCreateItem = true;
        })
        .addCase(createItem.fulfilled, (state, action:PayloadAction<Item>) => {
          state.loadingCreateItem = false;
          state.success = true;
          state.message="Se agrego con exito el item a la lista!"
          state.items?.push(action.payload)
        })
        .addCase(createItem.rejected, (state, action:PayloadAction<any>) => {
          state.loadingCreateItem = false;
          state.error = action.payload
        })
        .addCase(getAllItems.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getAllItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(getAllItems.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(resetList.pending, (state, action) => {
          state.loadingCreateItem = true;
        })
        .addCase(resetList.fulfilled, (state, action: PayloadAction<Item[]>) => {
          state.loadingCreateItem = false;
          state.items=[];
          state.success=true;
          state.message="Se reinicio la lista!"
        })
        .addCase(resetList.rejected, (state, action: PayloadAction<any>) => {
          state.loadingCreateItem = false;
          state.error = action.payload;
        })
        .addCase(deleteItem.pending, (state) => {
          state.loadingCreateItem = true
        })
        .addCase(deleteItem.fulfilled, (state, action: PayloadAction<any>) => {
          state.loadingCreateItem = false
          state.success = true
          state.message="Se elimino el item de la lista con exito!"
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          )
        })
        .addCase(deleteItem.rejected, (state, action: PayloadAction<any>) => {
          state.loadingCreateItem = false
          state.error = action.payload;
        })
        .addCase(updateItem.pending, (state) => {
          state.loadingCreateItem = true
        })
        .addCase(updateItem.fulfilled, (state, action: PayloadAction<any>) => {
          state.loadingCreateItem = false
          state.success = true
          state.message="Se actualizo el item de la lista!"
          state.items = state.items.map(
            (item) => (item.id == action.payload) ? {
              
              ...item, completed: !item.completed
            }
            :
            item
          )
        })
        .addCase(updateItem.rejected, (state, action: PayloadAction<any>) => {
          state.loadingCreateItem = false
          state.error =  action.payload;
        })
        .addCase(getItemsCompletedOrNot.pending, (state, action) => {
          state.loadingCreateItem = true;
        })
        .addCase(getItemsCompletedOrNot.fulfilled, (state, action: PayloadAction<Item[]>) => {
          state.loadingCreateItem = false;
          state.items = action.payload;
          if(action.payload.length == 0){
            state.messageFiltered="no hay"
          }
        })
        .addCase(getItemsCompletedOrNot.rejected, (state, action: PayloadAction<any>) => {
          state.loadingCreateItem = false;
          state.error = action.payload;
        })
    },
})

export const { reset, resetMessage } = itemSlice.actions

export default itemSlice.reducer;