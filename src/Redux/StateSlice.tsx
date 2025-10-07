import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    keyword:string|undefined;
    modalState:boolean;
    infoid:string;
    authModalState:boolean;
}

const initialState:StateType = {
    keyword:"",
    modalState:false,
    infoid:"",
    authModalState:false,
}

export const stateSlice = createSlice({
    name:"States",
    initialState,
    reducers:{
    //   setKeyword:(state:Partial<StateType>,action:PayloadAction<string|undefined>)=>{
    //       state.keyword = action.payload
    //   },
      setModalState:(state:Partial<StateType>,action:PayloadAction<boolean>)=>{
          state.modalState = action.payload
      },
      setInfoid:(state:Partial<StateType>,action:PayloadAction<string|undefined>)=>{
          state.infoid = action.payload
      }, 
      setauthModalState:(state:Partial<StateType>,action:PayloadAction<boolean>)=>{
          state.authModalState = action.payload
      },
    }
})

export const {  setModalState, setInfoid, setauthModalState } = stateSlice.actions

export default stateSlice.reducer