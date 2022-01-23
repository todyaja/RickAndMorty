import { combineReducers } from "@reduxjs/toolkit";
import favoriteReducer from './favoriteCharacter'

export const rootReducers = combineReducers({
    favorite : favoriteReducer
})