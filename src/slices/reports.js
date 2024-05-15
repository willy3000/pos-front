import { createSlice } from '@reduxjs/toolkit';
import { reportsApi } from '@/api/Reports';


const slice = createSlice({
    name: 'reports',
    initialState: {
        reports: {},
        test: 'testing text'
    },
    reducers: {
        fetchReport(state, action) {
            state.reports = action.payload;
            console.log('slice',action.payload)
        },


    }
});


//user actions
export const fetchReport = () => async (dispatch) => {
    const data = await reportsApi.getReport()
    dispatch(slice.actions.fetchReport(data));
};


export const { reducer } = slice;
