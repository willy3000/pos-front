import { createSlice } from '@reduxjs/toolkit';
import { projectsApi } from '@/api/Projects';


const slice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        joinedProjects: [],
    },
    reducers: {
        fetchProjects(state, action) {
            state.projects = action.payload;
        },

        fetchJoinedProjects(state, action) {
            state.joinedProjects = action.payload;
        },

    }
});


//user actions
export const fetchProjects = () => async (dispatch) => {
    const data = await projectsApi.getProjects()
    dispatch(slice.actions.fetchProjects(data));
};

export const fetchJoinedProjects = (userId) => async (dispatch) => {
    const data = await projectsApi.getJoinedProjects(userId)
    dispatch(slice.actions.fetchJoinedProjects(data));
};

export const { reducer } = slice;
