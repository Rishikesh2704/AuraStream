import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  keyword: string | undefined;
  modalState: boolean;
  infoid: string;
  authModalState: boolean;
  exploreModalState:boolean;
}

const initialState: StateType = {
  keyword: "",
  modalState: false,
  infoid: "",
  authModalState: false,
  exploreModalState:false,
};

export const stateSlice = createSlice({
  name: "States",
  initialState,
  reducers: {
    //   setKeyword:(state:Partial<StateType>,action:PayloadAction<string|undefined>)=>{
    //       state.keyword = action.payload
    //   },
    setModalState: (
      state: Partial<StateType>,
      action: PayloadAction<boolean>,
    ) => {
      state.modalState = action.payload;
    },
    setInfoid: (
      state: Partial<StateType>,
      action: PayloadAction<string | undefined>,
    ) => {
      state.infoid = action.payload;
    },
    setauthModalState: (
      state: Partial<StateType>,
      action: PayloadAction<boolean>,
    ) => {
      state.authModalState = action.payload;
    },
    setExploreModalState: (
      state: Partial<StateType>,
      action: PayloadAction<boolean>,
    ) => {
      state.exploreModalState = action.payload;
    },
  },
});

export const { setModalState, setInfoid, setauthModalState, setExploreModalState } =
  stateSlice.actions;

export default stateSlice.reducer;
