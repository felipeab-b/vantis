# Vantis — Development Log

Personal notes and decisions made throughout the development of this project.

---

## Infrastructure & Setup

1. Created the project folder with `.gitignore` and `README.md`
2. Created the GitHub repository and linked it to the local folder
3. Created the initial folder structure and `.env` file
4. Created `docker-compose.yml` defining services (backend, frontend, mongo) and volumes
5. Created the corresponding `Dockerfile` for each service
6. Created `requirements.txt` in the backend with initial Python dependencies:
   - `fastapi` — web framework
   - `uvicorn` — server that runs FastAPI
   - `motor` — async MongoDB driver for Python
   - `python-dotenv` — reads environment variables from `.env`
   - `httpx` — HTTP client library for calling external APIs
7. Created the backend working directory with `main.py`
8. Defined the initial routes in `main.py` — root and health check
9. Ran `docker compose up --build` to build from scratch
   - Had an issue: `package.json` didn't exist yet, so had to initialize the Vite project directly inside the frontend folder before Docker could build the frontend container

---

## Backend

### Configuration
- Created `config.py` mapping environment variables to class attributes using Pydantic's `BaseSettings`
- Added `pydantic-settings` to `requirements.txt` and rebuilt the container

### Database
- Created the MongoDB connection function using `AsyncIOMotorClient` from `motor`, pulling credentials from environment variables
- Created a disconnect function to close the connection on shutdown
- Linked the database lifecycle to the application in `main.py` using `@app.on_event("startup")` and `@app.on_event("shutdown")`

### Services & Routes
- Built the first service — **IPInfo** — using `httpx.AsyncClient` with `async with` to guarantee the connection is closed after receiving the response. Used `raise_for_status()` to automatically raise exceptions on HTTP errors (4xx, 5xx)
- Created the search route using FastAPI's `APIRouter` and registered it in `main.py` with `app.include_router()` and a `/api` prefix
- Built the **Shodan** service following the same pattern, added the API key to `.env`
- Built the **VirusTotal** service — authentication is done via request header instead of query parameter
- Built the **Have I Been Pwned (HIBP)** service with two differences:
  - A `404` response is not an error — it means no breaches were found, so it returns an empty list
  - Requires a paid API key, so the service is only called if the key is present in `.env`

### Parallel Requests
- All four API calls were running sequentially — total response time was the sum of all individual times
- Refactored to use `asyncio.gather()` to run all calls in parallel
- Used `return_exceptions=True` so that if one API fails, it doesn't cancel the others
- Used `isinstance(result, Exception)` to check if a result was an error and return an empty value instead

### AI Analysis
- Added `anthropic` to `requirements.txt`
- Created a service that sends the aggregated API data to Claude with a prompt asking for a plain-language security analysis
- Integrated the service into the search route — initially tried `asyncio.to_thread()` because the Anthropic client is synchronous, but since the function was defined as `async`, a direct `await` worked fine

---

## Frontend

- Defined CSS variables for colors, typography and spacing in `index.css` — dark refined theme using Syne and JetBrains Mono fonts
- Updated `App.jsx` as the central controller — manages global state, handles the search flow, and conditionally renders the Home or Report page
- Built the **Home** page with a centered search bar, example queries, and data source indicators
- Built the **Report** page with components:
  - `RiskBadge` — visual risk level indicator (LOW / MEDIUM / HIGH)
  - `InfoCard` — generic section wrapper
  - `PortsList` — displays open ports with risk colors
  - `AiAnalysis` — renders the Claude analysis
- Added CORS middleware to the FastAPI backend to allow requests from the frontend origin (`localhost:5173`)

---

## Caching

- Created `save_report()` to persist report data in MongoDB
- Created `get_cached_report()` to retrieve cached results before calling any external API
- Cache TTL is 24 hours — expired entries are deleted automatically on access
- **Issue:** Some VirusTotal fields contain integers larger than MongoDB's 8-byte limit
  - **Fix:** Created a `sanitize()` function that recursively traverses the data and converts oversized numbers to strings before saving
- **Issue:** `datetime.utcnow()` returns a naive datetime (no timezone), but MongoDB returns timezone-aware datetimes — subtraction between the two raises a `TypeError`
  - **Fix:** Added a check on `cached_at.tzinfo` — if it's `None`, the timezone is set to UTC explicitly before the comparison

---

## Extras

- Installed `react-markdown` in the frontend to render the Claude response as formatted Markdown instead of raw text with `#` symbols
- Added frontend error handling — displays a message when the backend is unreachable or returns a server error