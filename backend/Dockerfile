FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN cat requirements.txt  # Debug: Check contents of requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip freeze  # Debug: Verify installed packages

# Copy app code
COPY ./app ./app

# Expose port
EXPOSE 8080

# Run app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]