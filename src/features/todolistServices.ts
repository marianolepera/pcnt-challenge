import axios from "axios";
import { Item,EditItem } from "../interfaces/interfaces";
const apiURL = "https://api-3sxs63jhua-uc.a.run.app/v1";

const getUserId = async () =>{
    
    try {
        const {data} = await axios.get(apiURL + "/userId")
        const userId=data
        return userId
    } catch (error:any) {
        return error.message
    }
}

const addNewItem = async (userId:string,itemData:Item) =>{
    try {
        const response = await axios.post(apiURL + `/todo/${userId}`,itemData)
        return response.data
    } catch (error:any) {
        return error.message
    }
}

const editItem = async (userId:string,itemData:EditItem) =>{
    try {
        const {data} = await axios.put(apiURL + `/todo/${userId}`,itemData)
        const editItemData = data
        return editItemData
    } catch (error:any) {
        return error.message
    }
}

const deleteItem = async (userId:string,todoId:string) =>{
    try {
        const {data} = await axios.delete(apiURL + `/todo/${userId}`,{
            data: { todoId },
        })
        const deletedItemData = data
        return deletedItemData
    } catch (error:any) {
        return error.message
    }
}

const resetList = async (userId:string) =>{
    try {
        const {data} = await axios.delete(apiURL + `/todo/${userId}/reset`)
        const resetedList = data
        return resetedList
    } catch (error:any) {
        return error.message
    }
}

const getAllItems = async (userId:string) =>{
    try {
        const response = await axios.get(apiURL + `/todo/${userId}`)
        return response.data
    } catch (error:any) {
        return error.message
    }
}

const getItemsCompletedOrNot = async (userId:string,completed:boolean) =>{
    try {
        const response = await axios.get(apiURL + `/todo/${userId}/${completed}`)
        return response.data
    } catch (error:any) {
        return error.message
    }
}
const toDoListServices = {
    getUserId,
    addNewItem,
    editItem,
    deleteItem,
    resetList,
    getAllItems,
    getItemsCompletedOrNot
  
}

export default toDoListServices;