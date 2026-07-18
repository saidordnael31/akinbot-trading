# Akin Quant Engine — AgroDeri

Plataforma quantitativa e de risco para pesquisa, simulação, execução controlada e integração futura com a infraestrutura AgroDeri.

## Estado atual

Este repositório está em **recuperação arquitetural** a partir do protótipo original Akin Trading.

O código existente contém componentes visuais e fluxos simulados. Ele **não deve ser interpretado como motor quantitativo validado, plataforma de clearing operacional ou sistema autorizado a movimentar capital de terceiros**.

### Modos permitidos nesta fase

- pesquisa;
- backtesting;
- simulação;
- paper trading;
- leitura on-chain;
- OKX Demo Trading controlado;
- documentação de contratos e riscos;
- integração com testnet após validação técnica.

### Modos bloqueados por padrão

- execução com capital real;
- uso de credenciais de produção;
- movimentação de colateral;
- clearing ou settlement real;
- uso de recursos da Nickel, GEM, clientes ou comunidades;
- apresentação de métricas simuladas como performance auditada.

## Visão do sistema

```text
Market Data
    ↓
Akin Quant Engine
    ↓
Risk Engine off-chain
    ↓
Execution / Hedge Router
    ↓
AgroDeri Contracts
    ↓
Clearing
    ↓
Settlement
```

O sistema deverá suportar cinco ambientes patrimonialmente segregados:

1. Akin Proprietary Trading;
2. Nickel Institutional Pod;
3. AGD Liquidity & Market Making;
4. AgroDeri Derivatives Sandbox;
5. Akin–QuIIN Quantum Lab.

## Princípios obrigatórios

- capital e credenciais segregados por ambiente;
- nenhuma garantia pode ser contada em mais de uma Risk Cell;
- AGD não integra automaticamente o capital principal de absorção de perdas;
- parâmetros de margem e risco são versionados;
- clearing calcula obrigações; settlement movimenta ativos;
- módulos quânticos são experimentais e não substituem controles determinísticos;
- contratos públicos são lidos por meio de um deployment registry, nunca por endereços espalhados no código;
- nenhuma promessa de rentabilidade, liquidez ou valorização deve ser inferida deste repositório.

## Integrações de exchange

### OKX — Demo Trading controlado

O primeiro conector possui:

- assinatura REST HMAC-SHA256;
- horário público, instrumentos e ticker;
- leitura autenticada de configuração e saldo;
- health check em `GET /api/exchanges/okx/health`;
- ordem spot limitada em Demo Trading;
- cancelamento e consulta de ordem;
- kill switch com cancelamento de pendências e Cancel All After;
- idempotência por `requestId`;
- allowlist de instrumentos;
- limite de notional e desvio de preço;
- autorização por Capital Cell e Risk Cell;
- token interno obrigatório;
- produção bloqueada no código.

Consulte `docs/OKX_DEMO_RUNBOOK.md` antes de configurar os segredos.

## Documentação

- `docs/ARCHITECTURE.md`
- `docs/RISK_CELLS.md`
- `docs/AGD_ECOSYSTEM.md`
- `docs/INSTITUTIONAL_INTEGRATION.md`
- `docs/QUANTUM_RESEARCH.md`
- `docs/OKX_INTEGRATION.md`
- `docs/OKX_DEMO_RUNBOOK.md`
- `config/deployments/bsc-mainnet.json`
- `config/tokenomics/agd.json`

## Rede canônica inicial do AGD

- Rede: BNB Smart Chain;
- Gas: BNB;
- Supply máximo: 10.000.000.000 AGD;
- Decimais: 18;
- Mint após TGE: proibido;
- contrato canônico declarado: `0xFDA7c8B1565Ad517D0e668A7c4e9129682b8b268`.

Os endereços presentes neste repositório são registros declarados e ainda precisam de validação de bytecode, ABI, proxy, owner, roles, eventos e rede antes de qualquer integração de escrita.
