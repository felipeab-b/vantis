import anthropic
from app.config import settings

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

async def analyze_report(data: dict) -> str:
    prompt = f"""
    Você é um especialista em segurança da informação. Analise os dados abaixo sobre um IP/domínio 
    e forneça um resumo claro e acessível para um usuário não técnico.

    Explique:
    - O que é esse IP/domínio e quem é o responsável
    - Quais serviços estão expostos e o que isso significa
    - Se existe algum risco ou ponto de atenção
    - Um nível geral de risco: BAIXO, MÉDIO ou ALTO

    Seja direto e use linguagem simples. Máximo 4 parágrafos.

    Dados:
    {data}
    """
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text