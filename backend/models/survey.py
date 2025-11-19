from datetime import date
from typing import Optional
from sqlmodel import SQLModel, Field

class SurveyBase(SQLModel):
    first_name: str = Field(min_length=1, max_length=20) #requied
    last_name: str = Field(min_length=1, max_length=20) #requied
    street_address: str = Field(min_length=1, max_length=200) #requied
    city: str = Field(min_length=1, max_length=50) #requied
    state: str = Field(min_length=1, max_length=20) #requied
    zip: int = Field(ge=0, le=99999) #requied
    phone_number: str = Field(min_length=1, max_length=12) #requied
    email: str = Field(min_length=1, max_length=50) #requied
    submission_date: date  #requied
    likes: Optional[str] = Field(default=None, max_length=120)
    interest: Optional[str] = Field(default=None, max_length=120)
    likelihood: Optional[str] = Field(default=None, max_length=120)

class Survey(SurveyBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)

class SurveyCreate(SurveyBase):
    pass

class SurveyUpdate(SQLModel):
    first_name: Optional[str] = Field(default=None, min_length=1, max_length=20)
    last_name: Optional[str] = Field(default=None, min_length=1, max_length=20)
    street_address: Optional[str] = Field(default=None, min_length=1, max_length=200)
    city: Optional[str] = Field(default=None, min_length=1, max_length=50)
    state: Optional[str] = Field(default=None, min_length=1, max_length=20)
    zip: Optional[int] = Field(default=None, ge=0, le=99999)
    phone_number: Optional[str] = Field(default=None, min_length=1, max_length=12)
    email: Optional[str] = Field(default=None, min_length=1, max_length=50)
    submission_date: Optional[date] = None
    likes: Optional[str] = Field(default=None, max_length=120)
    interest: Optional[str] = Field(default=None, max_length=120)
    likelihood: Optional[str] = Field(default=None, max_length=120)


