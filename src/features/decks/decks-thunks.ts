import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { isLoadingDeckAC } from '../../app/app-reducer.ts'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(isLoadingDeckAC('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    console.log(res.data.items)
    dispatch(isLoadingDeckAC('succeeded'))
  } catch (e) {
    dispatch(isLoadingDeckAC('failed'))
    const errorMessage = e.code === 'ERR_BAD_REQUEST' ? e.response.data.errorMessages[0].message : e.message
    console.error(errorMessage)
  }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {

  try {
    const res = await decksAPI.addDeck(name)
    dispatch(addDeckAC(res.data))
  } catch (e) {
    const errorMessage = e.code === 'ERR_BAD_REQUEST' ? e.response.data.errorMessages[0].message : e.message
    console.error(errorMessage)
  }
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
  } catch (e) {
    const errorMessage = e.code === 'ERR_BAD_REQUEST' ? e.response.data.errorMessages[0].message : e.message
    console.error(errorMessage)
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    const errorMessage = e.code === 'ERR_BAD_REQUEST' ? e.response.data.errorMessages[0].message : e.message
    console.error(errorMessage)
  }

}
