from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session
from core.db import get_session
from models.survey import Survey, SurveyCreate, SurveyUpdate
from repositories.survey_repository import SurveyRepository

router = APIRouter(prefix="/surveys", tags=["surveys"])

@router.post("", response_model=Survey, status_code=status.HTTP_201_CREATED)
def create_survey(payload: SurveyCreate, session: Session = Depends(get_session)):
    repo = SurveyRepository(session)
    return repo.create(payload)

@router.get("/{survey_id}", response_model=Survey)
def get_survey(survey_id: int, session: Session = Depends(get_session)):
    repo = SurveyRepository(session)
    survey = repo.get(survey_id)

    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    return survey

@router.get("", response_model=List[Survey])
def list_surveys(session: Session = Depends(get_session), offset: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=100)):
    repo = SurveyRepository(session)
    items = repo.list(offset=offset, limit=limit)
    return items

@router.put("/{survey_id}", response_model=Survey)
def update_survey(survey_id: int, payload: SurveyUpdate, session: Session = Depends(get_session)):
    repo = SurveyRepository(session)
    survey = repo.update(survey_id, payload)

    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    return survey

@router.delete("/{survey_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_survey(survey_id: int, session: Session = Depends(get_session)):
    repo = SurveyRepository(session)
    ok = repo.delete(survey_id)

    if not ok:
        raise HTTPException(status_code=404, detail="Survey not found")
    return None