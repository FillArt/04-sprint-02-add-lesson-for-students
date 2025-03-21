import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, isLoadingDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {

  try {
    const res = await decksAPI.fetchDecks()
    dispatch(isLoadingDeckAC(false))
    dispatch(setDecksAC(res.data.items))
    console.log(res.data.items)
  } catch (e) {
    console.error(e)
  } finally {
    dispatch(isLoadingDeckAC(true))
  }
  
  const res = await decksAPI.fetchDecks()
  console.log(res.data.items)
  // decksAPI.fetchDecks().then((res) => {
  //   dispatch(setDecksAC(res.data.items))
  // })
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  return decksAPI.updateDeck(params).then((res) => {
    dispatch(updateDeckAC(res.data))
  })
}
