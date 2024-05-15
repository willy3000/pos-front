import { createSlice } from '@reduxjs/toolkit';
import { salesApi } from '@/api/Sales';


const slice = createSlice({
    name: 'sales',
    initialState: {
        sales: [],
    },
    reducers: {
        fetchSales(state, action) {
            state.sales = action.payload;
        },


    }
});


//user actions
export const fetchSales = () => async (dispatch) => {
    const data = await salesApi.getSales()
    dispatch(slice.actions.fetchSales(data));
};


export const { reducer } = slice;
