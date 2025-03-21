import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'
import { useAppSelector } from './store.ts'

export const App = () => {
  const isLoading = useAppSelector(state => state.decks.isLoading)

  return (
    <div>
      {!isLoading && (<LinearLoader/>)}

      <Decks />
      <GlobalError />
    </div>
  )
}
