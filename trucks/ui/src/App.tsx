import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Header } from "./features/header/Header"
import { TruckMap } from "./features/truckmap/truckmap"
import logo from "./logo.svg"

const App = () => {
  return (
    
    <div className="App h100">
      <div>
        <Header />
      </div>
      <div className="mapcontainer h100">
        <TruckMap />  
      </div>
    </div>
  )
}

export default App
