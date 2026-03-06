# Vantis

> A unified intelligence platform that transforms raw internet exposure data into clear, visual, and contextual security reports.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
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

- [ ] Search any IP or domain and generate a full exposure report
- [ ] Infrastructure analysis via Shodan
- [ ] Reputation and threat history via VirusTotal
- [ ] Geolocation and ASN data via IPInfo
- [ ] Data breach lookup via Have I Been Pwned
- [ ] AI-powered contextual explanation of technical findings
- [ ] Interactive map and visual dashboard
- [ ] Report caching to avoid redundant API calls

## Tech Stack

**Frontend**
- React
- Tailwind CSS

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