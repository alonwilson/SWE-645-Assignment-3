from typing import List, Optional, Tuple
from sqlmodel import Session, select
from models.survey import Survey, SurveyCreate, SurveyUpdate

class SurveyRepository:
    def __init__(self, session: Session):
        self.session = session

    # Create
    def create(self, data: SurveyCreate) -> Survey:
        survey = Survey(**data.model_dump())
        self.session.add(survey)
        self.session.commit()
        self.session.refresh(survey)
        return survey
    
    # Read
    def get(self, survey_id: int) -> Optional[Survey]:
        return self.session.get(Survey, survey_id)
    
    # Read
    def list(self, offset: int = 0, limit: int = 50) -> Tuple[List[Survey], int]:
        stmt = select(Survey).offset(offset).limit(limit)
        items = self.session.exec(stmt).all()
        return items
    
    # Update
    def update(self, survey_id: int, data: SurveyUpdate) -> Optional[Survey]:
        survey = self.session.get(Survey, survey_id)
        if not survey:
            return None
        
        update_data = data.model_dump(exclude_unset=True)

        for k, v in update_data.items():
            setattr(survey, k, v)

        self.session.add(survey)
        self.session.commit()
        self.session.refresh(survey)
        return survey
    
    # Delete
    def delete(self, survey_id: int) -> bool:
        survey = self.session.get(Survey, survey_id)

        if not survey:
            return False
        
        self.session.delete(survey)
        self.session.commit()
        
        return True
        