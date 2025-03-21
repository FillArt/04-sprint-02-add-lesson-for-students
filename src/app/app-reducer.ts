export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case "APP/CHANGE_APP_STATUS":
      return {...state, status: action.status}

    case "APP/SET_ERROR_MESSAGE":
      return {...state, error: action.error}

    default:
      return state
  }
}

type ActionsType = ReturnType<typeof isLoadingDeckAC> | ReturnType<typeof setErrorMessage>


export const isLoadingDeckAC = (status: RequestStatusType) => ({
  type: 'APP/CHANGE_APP_STATUS' as const,
  status,
})


export const setErrorMessage = (error: string) => ({
  type: 'APP/SET_ERROR_MESSAGE' as const,
  error,
})