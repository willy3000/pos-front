import { createSlice } from '@reduxjs/toolkit';
import { paymentsApi } from '@/api/Payments';


const slice = createSlice({
    name: 'payments',
    initialState: {
        payments: [],
    },
    reducers: {
        fetchPayments(state, action) {
            state.payments = action.payload;
        },


    }
});


//user actions
export const fetchPayments = () => async (dispatch) => {
    const data = await paymentsApi.getPayments()
    dispatch(slice.actions.fetchPayments(data));
};


export const { reducer } = slice;
