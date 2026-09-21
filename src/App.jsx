import {Routes, Route,} from "react-router-dom";
import Home from "./home";
import ScanPulse from "./component/ScanPulse/ScanPulse"
import FlyShare from "./component/FlyShare/FlyShare"
import CartGlide from "./component/CartGlide/CartGlide"
import HeartBurst from "./component/HeartBurst/HeartBurst"
import PayMorph from "./component/PayMorph/PayMorph"
import NovaDownload from "./component/NovaDownload/NovaDownload"
import WaveDownload from "./component/WaveDownload/WaveDownload"



 function App() {
  return (
    <Routes>
      <Route index element={<Home />}/>

      <Route path="/scanpulse" element={<ScanPulse />}/>
      <Route path="/flyshare" element={<FlyShare />}/>
      <Route path="/cartglide" element={<CartGlide />}/>
      <Route path="/heartburst" element={<HeartBurst />}/>
      <Route path="/paymorph" element={<PayMorph />}/>
      <Route path="/novadownload" element={<NovaDownload />}/>
      <Route path="/wavedownload" element={<WaveDownload />}/>

      
    </Routes>
  )
}

export default App;
