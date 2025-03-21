import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { isLoadingDeckAC, setErrorMessage } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

type ServerErrorType = {
  errorMessages: Array<{field: string, message: string}>
}

const errorHandler = (e: any, dispatch: Dispatch) => {
  let errorMessage: string = ''
  if(isAxiosError<ServerErrorType>(e)) {
    errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
  } else  {
    errorMessage = (e as Error).message
  }

  dispatch(setErrorMessage(errorMessage))

}


export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(isLoadingDeckAC('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(isLoadingDeckAC('succeeded'))
  } catch (e) {
    dispatch(isLoadingDeckAC('failed'))
    errorHandler(e, dispatch)
  }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {

  try {
    const res = await decksAPI.addDeck(name)
    dispatch(addDeckAC(res.data))
  } catch (e) {
    errorHandler(e, dispatch)
  }
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.deleteDeck(id)
    dispatch(deleteDeckAC(res.data.id))
  } catch (e) {
    errorHandler(e, dispatch)
  }
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    errorHandler(e, dispatch)
  }

}
