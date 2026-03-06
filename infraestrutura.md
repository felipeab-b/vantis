## Fluxo de uma pesquisa

```
Usuário digita "google.com"
        ↓
Frontend envia GET /api/search?query=google.com
        ↓
Backend verifica se já existe no cache (MongoDB)
        ↓ (se não existir)
Dispara chamadas paralelas para as 4 APIs
        ↓
Agrega todos os dados num objeto único
        ↓
Manda esse objeto pro Claude → recebe contexto em linguagem humana
        ↓
Salva tudo no MongoDB (cache)
        ↓
Retorna o relatório completo pro frontend
        ↓
Frontend renderiza o relatório visual
```

## Endpoints essenciais do backend

```
GET  /api/search?query={ip_ou_dominio}
     → dispara toda a pipeline acima
     → retorna o relatório completo

GET  /api/report/{id}
     → busca um relatório já gerado pelo ID
     → útil para compartilhar ou revisitar

GET  /api/health
     → só pra saber se o backend está vivo
```

## Estrutura do relatório 

```
json{
  "query": "google.com",
  "generated_at": "2026-03-06T18:00:00",
  "summary": {
    "risk_level": "low",
    "ai_context": "Este domínio pertence ao Google LLC..."
  },
  "infrastructure": {
    "ip": "142.250.79.46",
    "location": { "country": "US", "city": "...", "lat": 0, "lon": 0 },
    "asn": "AS15169 Google LLC",
    "open_ports": [80, 443],
    "services": [...]
  },
  "reputation": {
    "malicious_votes": 0,
    "suspicious_votes": 0,
    "last_analysis": "..."
  },
  "breaches": [],
  "raw": {}
}
```