import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Canvas from './Components/Canvas'
import Toolbar from './Components/Toolbar'
function App() {


  return (
    <Provider store={store}>
   <div className='main'>
<Canvas/>
<Toolbar/>

   </div>
    </Provider>
  )
}

export default App
