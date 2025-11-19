import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createSurvey, updateSurvey, getSurveyById } from '../services/surveyService'
import '../App.css'

const initalState = {
    first_name: '',
    last_name: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    phone_number: '',
    email: '',
    submission_date: '',
    likes: '',
    interest: '',
    likelihood: ''
}

function SurveyForm() {
    const [survey, setSurvey] = useState(initalState)
    const [likes, setLikes] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    useEffect(() => {
        if (isEditMode) {
            getSurveyById(id).then((data) => {
                setSurvey(data)
                if (data.likes) {
                    setLikes(data.likes.split(',').map((s) => s.trim()))
                }
            })
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSurvey({ ...survey, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        isEditMode ? await updateSurvey(id, survey) : await createSurvey(survey)
        navigate('/')
    }

    const handleLikes = (e) => {
        const { value, checked } = e.target

        setLikes((prevLikes) => {
            let updated
            if (checked) {
                updated = [...prevLikes, value]
            } else {
                updated = prevLikes.filter((v) => v !== value)
            }

            // update survey.likes based on latest value
            setSurvey((prevSurvey) => ({
                ...prevSurvey,
                likes: updated.join(', ')
            }))

            return updated
        })
    }

    return (
        <div>
            <h2>{isEditMode ? 'Edit' : 'Add'} Survey</h2>
            <form onSubmit={handleSubmit}>
                <input name="first_name" value={survey.first_name} onChange={handleChange} placeholder='First Name' required />
                <input name="last_name" value={survey.last_name} onChange={handleChange} placeholder='Last Name' required />
                <input name="street_address" value={survey.street_address} onChange={handleChange} placeholder='Street Address' required />
                <input name="city" value={survey.city} onChange={handleChange} placeholder='City' required />
                <input name="state" value={survey.state} onChange={handleChange} placeholder='State' required />
                <input name="zip" value={survey.zip} onChange={handleChange} placeholder='Zipcode' required />
                <input name="phone_number" value={survey.phone_number} onChange={handleChange} placeholder='Phone Number' required />
                <input name="email" value={survey.email} onChange={handleChange} placeholder='Email Name' required />
                <input type="date" name="submission_date" value={survey.submission_date} onChange={handleChange} label="Today's Date" required />
                <p>
                    What did you like most about the campus? <br/>
                    <label>
                        Students <input type="checkbox" name="likes" value="Student" checked={likes.includes('Student')} onChange={handleLikes} />
                    </label>
                    <label>
                        Location <input type="checkbox" name="likes" value="Location" checked={likes.includes('Location')} onChange={handleLikes} />
                    </label>
                    <label>
                        Campus <input type="checkbox" name="likes" value="Campus" checked={likes.includes('Campus')} onChange={handleLikes} />
                    </label>
                    <label>
                        Atmosphere <input type="checkbox" name="likes" value="Atmosphere" checked={likes.includes('Atmosphere')} onChange={handleLikes} />
                    </label>
                    <label>
                        Dorm rooms <input type="checkbox" name="likes" value="Dorm rooms" checked={likes.includes('Dorm rooms')} onChange={handleLikes} />
                    </label>
                    <label>
                        Sports <input type="checkbox" name="likes" value="Sports" checked={likes.includes('Sports')} onChange={handleLikes} />
                    </label>
                </p>
                <p>
                    How did you become interested in the university? <br/>
                    <label>
                        Friends
                        <input type="radio" name="interest" value="Friends" checked={survey.interest === 'Friends'} onChange={handleChange} />
                    </label>
                    <label>
                        Television
                        <input type="radio" name="interest" value="Television" checked={survey.interest === 'Television'} onChange={handleChange} />
                    </label>
                    <label>
                        Internet
                        <input type="radio" name="interest" value="Internet" checked={survey.interest === 'Internet'} onChange={handleChange} />
                    </label>
                    <label>
                        Other
                        <input type="radio" name="interest" value="Other" checked={survey.interest === 'Other'} onChange={handleChange} />
                    </label>
                </p>
                <label>
                    Likelihood to recommend:
                    <select name="likelihood" value={survey.likelihood} onChange={handleChange}>
                        <option value="Very Likely">Very Likely</option>
                        <option value="Likely">Likely</option>
                        <option value="Unlikely">Unlikely</option>
                    </select>
                </label>
                <button type="submit">{isEditMode ? 'Update' : 'Add'} Survey</button>
            </form>
        </div>
    )
}

export default SurveyForm