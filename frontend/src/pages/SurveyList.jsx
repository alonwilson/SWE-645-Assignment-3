import React, { useState, useEffect } from 'react'
import { getSurveys, deleteSurvey } from '../services/surveyService'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import '../App.css'

function SurveyList() {
    const [surveys, setSurveys] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadSurveys()
    }, [])

    const loadSurveys = async () => {
        const data = await getSurveys()
        setSurveys(data)
    }

    const handleDelete = async (id) => {
        await deleteSurvey(id)
        loadSurveys()
    }

    return (
        <div>
            <h2>Survey List</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Favorite Aspects</th>
                        <th>Source of Interest</th>
                        <th>Recommendation Likelihood</th>
                        <th>Submission Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.map((s) => (
                        <tr key={s.id}>
                            <td>{s.first_name} {s.last_name}</td>
                            <td>{s.street_address}, {s.city}, {s.state} {s.zip}</td>
                            <td>{s.phone_number}</td>
                            <td>{s.email}</td>
                            <td>{s.likes}</td>
                            <td>{s.interest}</td>
                            <td>{s.likelihood}</td>
                            <td>{s.submission_date}</td>
                            <td className="action-buttons">
                                <button className="icon-button edit" onClick={() => navigate(`/edit/${s.id}`)}>
                                    <Pencil size={18} />
                                </button>
                                <button className="icon-button delete" onClick={() => handleDelete(s.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default SurveyList