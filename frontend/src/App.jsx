import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import LendingPage from './containers/LandingPage.jsx'
import Dump from './containers/Dump.jsx'
import Dumpyard from './containers/Dumpyard.jsx';
import Suggest from './containers/Suggest.jsx';
import SuggestionPage from './containers/SuggestionPage.jsx';
import Clean from './containers/Clean.jsx';
import LoginPage from './containers/LoginPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import SignupPage from './containers/SignupPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';

const App = () => {
  return (
    <>

    <BrowserRouter>
    <Toaster />
    <Routes>
       <Route path='/' element={<LendingPage/>}></Route>
       <Route path='/dump' element={<Dump/>}></Route>
       <Route path='/suggest' element={<Suggest/>} />
       <Route path='/suggestion' element={<SuggestionPage/>} />
       <Route path='/clean-request' element={<Clean/>} />
       <Route path='/login' element={<LoginPage/>} />
       <Route path='/signup' element={<SignupPage/>} />
       <Route path='/profile' element={<ProfilePage/>} />
    </Routes>

    </BrowserRouter>
    
    </>
  )
}

export default App