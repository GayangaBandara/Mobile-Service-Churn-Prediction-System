# Mobile-Service-Churn-Prediction-System

A full-stack AI-driven application for managing customers, locations, services, and billing — with churn prediction using machine learning.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) + Tailwind CSS
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) with PostgreSQL
- **ML Models:** Jupyter Notebooks for churn prediction
- **Database ORM:** SQLAlchemy

## 📂 Project Structure
``` bash
├── Backend/
│ ├── api/v1/endpoints/ # API routes
│ ├── crud/ # DB operations
│ ├── database/ # DB config and session
│ ├── models/ # SQLAlchemy models
│ ├── schemas/ # Pydantic schemas
│ ├── main.py # FastAPI entrypoint
│ └── requirements.txt # Python dependencies
│
├── frontend/ # Next.js frontend
│ ├── app/ # App routes and layout
│ ├── components/ # Reusable components
│ ├── styles/ # Tailwind & CSS config
│ └── public/ # Static assets
│
├── Models/ # ML Notebooks and models
│ ├── churn_score/
│ ├── churn_value/
│ ├── Datasets/
│ ├── churn_score.ipynb
│ └── churn_value.ipynb
```

---

## 🚀 Getting Started

### 🔧 Backend (FastAPI)

#### ⚙️ Backend Environment Setup

To run the backend, create a `.env` file in the `Backend/` directory with your PostgreSQL database connection string.

#### .env

```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/your_database_name
```
#### In your terminal

```bash
cd Backend
python -m venv venv
source venv/bin/activate       # On macOS/Linux
# OR
venv\Scripts\activate          # On Windows

pip install -r requirements.txt
uvicorn main:app --reload
```

### 💻 Frontend (Next.js)

To run the Next.js frontend:

```bash
cd frontend
npm install
npm run dev
```


### 📈 Machine Learning

Inside the `Models/` directory:

- `churn_score.ipynb` → Predicts the **likelihood of a customer leaving**
- `churn_value.ipynb` → Predicts the **probability of a customer leaving**

> 🧠 These notebooks use classification and regression models for churn prediction and value estimation.


### 📡 API Endpoints

**Base URL:** `http://localhost:8000/api/v1`
``` bash
Endpoint	Description
/customer/	CRUD for customer data
/location/	Manage locations
/billing/	Billing operations
/service/	Service details
/prediction/	ML churn predictions
```

### Team Roles
```
Gayanga Bandara      22UG1-0285  Team Lead/Backend Developer
Sasanka Rajapaksha   22UG1-0825  Data Scientist
Vishwa Chandrasekara 22UG1-0394  FullStack Developer
Dhanuka Rathnayaka   22UG1-0828  Frontend Developer
Hasith Dilhara       22UG1-0585  Frontend Developer
Isuru Priyankara     22UG1-0762  Backend Developer
Hasarel Bangamuwage  22UG1-0936  Backend Developer
Yashintha Tharuka    22UG1-0342  QA Engineer            
Ravindu Mihiranga    22UG1-0024  QA Enigneer
Vimansa Athapaththu  22UG1-0067  UI/UX Engineer
            
```


📄 License
MIT © [Saza-dev]
