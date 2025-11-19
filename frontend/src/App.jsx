import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import SurveyList from './pages/SurveyList'
import SurveyForm from './components/SurveyForm'
import './App.css'

function App() {
  return (
    <div>
      <nav className="navbar">
        <h1 className="nav-title">Campus Survey test #1</h1>
        <div className="nav-links">
          <Link to="/">Surveys</Link>
          <Link to="/add">Add Survey</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<SurveyList />} />
          <Route path="/add" element={<SurveyForm />} />
          <Route path="/edit/:id" element={<SurveyForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
