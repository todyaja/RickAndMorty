import { createSlice } from "@reduxjs/toolkit";

const initState = {
    favorite : []
}

export const favoriteSlice = createSlice({
    name : 'favorite',
    initialState : initState,
    reducers : {
        addFavorite : (state, action) => {
            state.favorite.unshift(action.payload)
        },
        deleteFavorite : (state, action) => {
            var array = state.favorite
            var index = array.findIndex(x => x.id === action.payload.id)
            if(index != -1){
                state.favorite.splice(index, 1)
            }
        }
    }
})

export const {deleteFavorite, addFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer