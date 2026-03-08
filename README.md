# Vantis

> A unified intelligence platform that transforms raw internet exposure data into clear, visual, and contextual security reports.

![Status](https://img.shields.io/badge/status-MVP%20complete-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## About

Tools like Shodan and Censys already index a massive amount of public data about 
internet-connected devices and services. The problem is that this data is highly 
technical, raw, and inaccessible to most people.

Vantis sits on top of these sources and transforms that raw exposure data into 
structured, visual, and human-readable reports — making attack surface analysis 
accessible not just to security professionals, but to anyone who wants to 
understand their digital exposure.

## Features

- [x] Search any IP or domain and generate a full exposure report
- [x] Infrastructure analysis via Shodan
- [x] Reputation and threat history via VirusTotal
- [x] Geolocation and ASN data via IPInfo
- [x] Data breach lookup via Have I Been Pwned
- [x] AI-powered contextual explanation of technical findings
- [x] Report caching to avoid redundant API calls
- [ ] Interactive map and visual dashboard

## Screenshots

![Home](docs/home.png)
![Report](docs/report.png)

## Architecture

Vantis follows a simple three-layer architecture:
```
Browser → React Frontend (port 5173)
              ↓
         FastAPI Backend (port 8000)
              ↓
    ┌─────────────────────────┐
    │  Parallel API calls     │
    │  Shodan + VirusTotal    │
    │  IPInfo + HIBP          │
    └─────────────────────────┘
              ↓
    Claude AI (contextualizes data)
              ↓
    MongoDB (caches results 24h)
```

All services run in isolated Docker containers orchestrated by Docker Compose.

## Current Status

**Working**
- Search any IP or domain and get a full report
- Infrastructure data via Shodan (open ports, services, ASN)
- Threat reputation via VirusTotal
- Geolocation and network info via IPInfo
- Data breach lookup via Have I Been Pwned
- AI-powered analysis in plain language via Claude
- Report caching in MongoDB (24h TTL)
- Clean dark UI with risk classification

**Not yet implemented**
- Interactive geolocation map
- Search history
- Shareable report URLs
- PDF export
- User authentication

## Roadmap

### Next 
- [ ] Interactive map with Leaflet.js showing IP geolocation
- [ ] Better loading state with animated indicator
- [ ] Domain resolution — convert domains to IP before Shodan query
- [ ] Shareable report URLs

### Later 
- [ ] Search history page
- [ ] PDF report export
- [ ] Side-by-side target comparison

### Future 
- [ ] User authentication
- [ ] Continuous monitoring with alerts
- [ ] Deploy to production

## Tech Stack

**Frontend**
- React

**Backend**
- Python
- FastAPI

**Database**
- MongoDB

**AI**
- Anthropic Claude API

**Data Sources**
- [Shodan](https://shodan.io)
- [VirusTotal](https://virustotal.com)
- [IPInfo](https://ipinfo.io)
- [Have I Been Pwned](https://haveibeenpwned.com)

**Infrastructure**
- Docker

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Setup

1. Clone the repository
```bash
   git clone https://github.com/seu-usuario/vantis.git
   cd vantis
```

2. Create a `.env` file in the root folder and add your API keys
```env
   SHODAN_API_KEY=
   VIRUSTOTAL_API_KEY=
   IPINFO_API_KEY=
   HIBP_API_KEY=
   ANTHROPIC_API_KEY=
```

3. Run the project
```bash
   docker compose up
```

> Detailed setup instructions will be updated as the project evolves.