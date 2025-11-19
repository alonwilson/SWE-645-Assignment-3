// Author: Alon Wilson

const BASE_URL = `${import.meta.env.VITE_API_URL}/surveys`;

export const getSurveys = async () => {
    const res = await fetch(BASE_URL);
    return res.json();
}

export const getSurveyById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
}

export const createSurvey = async (survey) => {
    await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(survey)
    })
}

export const updateSurvey = async (id, survey) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(survey)
    })
}

export const deleteSurvey = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
}