# Akin Quant Engine + AgroDeri — Arquitetura 0.1

## Status

**Classificação:** proposta arquitetural em implementação.

Este documento não declara que clearing, custódia, market making, derivativos ou execução institucional estejam operacionais.

## Objetivo

Construir um sistema operacional quantitativo que:

1. produza sinais, preços justos, hedges e alocação;
2. opere inicialmente em pesquisa, backtesting e paper trading;
3. mantenha capital, credenciais e risco segregados;
4. integre contratos AgroDeri por interfaces versionadas;
5. suporte AGD, stablecoins, ouro tokenizado e instrumentos produtivos;
6. preserve controles clássicos mesmo quando módulos quantum-inspired forem utilizados.

## Camadas

```text
Applications
Dashboard | APIs | Risk OS | Trading Sandbox | Mobile Witness

Private and Federated Layer
Identity | KYC/KYB | Documents | Data Lake | Index Engine | Reconciliation

Akin Quant Engine
Market Data | Fair Value | Strategies | Portfolio | Execution | Risk

InterlockLedger
Events | States | Permissions | Audit | Document hashes

BNB Smart Chain
AGD | Public registries | Staking | Fees | Rewards | Trading modules

Bitcoin
Merkle roots | Checkpoints | Time proofs | Reserve references
```

## Fluxo quantitativo

```text
Market data
→ normalization
→ fair value
→ strategy signal
→ cost and capacity model
→ off-chain risk checks
→ execution or hedge intent
→ on-chain risk checks
→ clearing
→ settlement
→ reconciliation
→ NAV and reporting
```

## Ambientes segregados

### Akin Proprietary

Capital, credenciais, posições, PnL e limites próprios da Akin.

### Nickel Institutional Pod

Estratégias market-neutral, track record e reporting segregados. O capital do pod não pode financiar AGD, tokens produtivos, RLP, seguro, market launches ou perdas de outros ambientes.

### GEM Facility

Módulo corporativo para regras de drawdown, TWAP, threshold price, warrant e reporting. Capital não recebido não integra recursos financeiros disponíveis.

### AGD Liquidity

Market making, inventário, fair value, arbitragem entre venues e proteção de liquidez do AGD. Não compartilha automaticamente patrimônio com Nickel ou clientes.

### AgroDeri Derivatives

Instrument Registry, oracles, pricing, margin, clearing, settlement e Risk Cells específicas para cada mercado.

### Akin–QuIIN Quantum Lab

Pesquisa de otimização de colateral, roteamento, portfólio, stress combinatório e segurança pós-quântica. Não controla saldos, liquidação, autorização ou kill switches.

## Responsabilidades on-chain e off-chain

### Off-chain

- dados pessoais e produtivos;
- KYC/KYB;
- documentos integrais;
- cálculo de índices;
- modelos quantitativos;
- backtesting;
- stress testing;
- otimização;
- reconciliação;
- reporting.

### InterlockLedger

- estados operacionais;
- histórico;
- permissões;
- assinaturas;
- hashes de documentos;
- trilha de auditoria.

### BNB Smart Chain

- AGD canônico;
- contratos públicos;
- staking e recompensas;
- taxas;
- instrumentos e posições quando aplicável;
- referências públicas de reservas e auditoria.

### Bitcoin

- ancoragem periódica;
- checkpoints;
- prova temporal;
- reserva estratégica ou colateral complementar quando aprovado por política específica.

## Fronteiras obrigatórias

- frontend nunca contém chaves privadas ou credenciais de exchange;
- execução real permanece desabilitada por padrão;
- endereços vêm do deployment registry;
- ABIs são versionadas;
- cada ordem carrega `capitalCellId` e `riskCellId`;
- cada posição carrega origem patrimonial, instrumento, venue e política de risco;
- clearing calcula obrigações líquidas;
- settlement movimenta ativos;
- nenhuma reserva pode ser contada simultaneamente em duas células;
- métricas simuladas devem ser rotuladas como simuladas.

## Roadmap técnico

### Fase 0 — Recuperação

- preservar a interface antiga;
- remover resultados fictícios apresentados como reais;
- documentar simulações;
- registrar contratos e tokenomics;
- criar CI e testes básicos.

### Fase 1 — Quant Core

- market data normalizado;
- portfolio ledger;
- NAV e PnL;
- backtesting reproduzível;
- risk limits;
- paper execution;
- observabilidade.

### Fase 2 — Nickel Readiness

- basis arbitrage;
- funding differential;
- cross-venue relative value;
- stablecoin relative value;
- reporting institucional;
- segregação operacional completa.

### Fase 3 — AGD Liquidity

- fair value;
- inventory-neutral market making;
- TWAP e threshold policies;
- CEX/DEX routing;
- risk limits e circuit breakers.

### Fase 4 — AgroDeri Sandbox

- Instrument Registry;
- oracle confidence;
- margin simulation;
- Risk Cells;
- clearing simulator;
- settlement simulator;
- RLP e insurance waterfall.

### Fase 5 — Quantum Research

- benchmarks clássicos;
- métodos quantum-inspired;
- comparação fora da amostra;
- segurança pós-quântica;
- documentação científica reproduzível.
