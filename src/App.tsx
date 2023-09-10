import { useState } from 'react'
import './App.css'
import axios from "axios";
import FetchQues from './components/fetchQues';
import TestHistory from './components/TestHistory';

function App() {

  return (
    <>
      <FetchQues />
      <TestHistory />
    </>
  )
}

export default App
