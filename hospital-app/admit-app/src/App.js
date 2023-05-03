import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LandingPage from './Components/LandingPage';
import Footer from './Components/Footer';
import Login from './Components/Login';
import RegisterModal from './Components/RegisterModal';
import AdminDashboard from './Components/Admin/AdminDashboard'
import PatientDashboard from './Components/Patient/PatientDashboard'
import TpaDashboard from './Components/TPA/TpaDashboard'
import { Provider } from "mobx-react";
import Header from './Components/Header';
import MyAccountPage from './Components/Admin/MyAccountPage';
import ChangePassword from './Components/Admin/ChangePassword';
import './App.css';
import appStore from './Store/store';
import ExtraInfo from './Components/ExtraInfo';

function App() {
  return (
    <BrowserRouter>
    <Provider appStore={appStore}>
    {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/tpa" element={<TpaDashboard />} />
        <Route path="/myaccount" element={<MyAccountPage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/moreinfo" element={<ExtraInfo />} />

      </Routes>
      <Footer/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
