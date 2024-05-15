import { createSlice } from '@reduxjs/toolkit';
import { customersApi } from '@/api/Customers';


const slice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
    },
    reducers: {
        fetchCustomers(state, action) {
            state.customers = action.payload;
        },


    }
});


//customer actions
export const fetchCustomers = () => async (dispatch) => {
    const data = await customersApi.getCustomers()
    dispatch(slice.actions.fetchCustomers(data));
};



export const { reducer } = slice;
