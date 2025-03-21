import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../store.ts'
import { setErrorMessage } from '../app-reducer.ts'

export const GlobalError = () => {
  const errorMessage = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(setErrorMessage(''))
    }
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={3000} />
}
