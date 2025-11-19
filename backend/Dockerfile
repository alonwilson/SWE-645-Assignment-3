# Author: Alon Wilson

# Use a python image
FROM python:3.12.2

# Set working directory in container
WORKDIR /app

# Copy dependencies list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all source code
COPY . .

# Expose the backend port
EXPOSE 8000

# Start the app with FastAPI + Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
