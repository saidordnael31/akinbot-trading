# Institutional Integration — Nickel, GEM and AgroDeri

## Status

**Classificação:** requisitos propostos e interfaces pendentes de instrumentos definitivos.

## Princípio

O Akin Quant Engine é uma infraestrutura comum. Patrimônio, credenciais, posições e obrigações de cada participante permanecem segregados.

## Nickel Pod

### Objetivo

Demonstrar capacidade quantitativa institucional com estratégias sistemáticas e retorno ajustado ao risco, sem expor o capital do pod ao ecossistema de lançamentos AgroDeri.

### Estratégias prioritárias

1. spot–perpetual basis;
2. funding-rate differential;
3. cross-venue statistical arbitrage;
4. stablecoin relative value;
5. inventory-neutral market making;
6. correlated relative value;
7. volatility arbitrage em fase posterior.

### Requisitos de reporting

- NAV diário;
- PnL bruto e líquido;
- taxas, funding e slippage;
- exposição bruta e líquida;
- beta para BTC e ETH;
- concentração por venue e instrumento;
- drawdown;
- Sharpe e Sortino;
- liquidez e capacidade;
- margem por exchange;
- fills e cancelamentos;
- reconciliação;
- incidentes e kill switches;
- correlação entre estratégias.

### Proibições patrimoniais

O capital Nickel não pode:

- financiar AGD ou ICOs subsequentes;
- sustentar preço de tokens;
- fornecer capital ao RLP;
- cobrir insurance funds AgroDeri;
- garantir derivativos produtivos;
- absorver perdas de clientes ou market launches;
- compartilhar credenciais ou margem com outras células.

Código, dados públicos, bibliotecas e pesquisa podem ser compartilhados. Capital, posições, PnL e prioridade de execução não.

## GEM Facility and Warrant

### Registro econômico declarado

- facility máxima mencionada: até US$ 20 milhões;
- warrant mencionado: 3% do supply fully diluted;
- supply canônico: 10 bilhões de AGD;
- quantidade correspondente: 300 milhões de AGD.

### Regra de reconhecimento

Facility não sacada não integra capital disponível.

```text
availableFacilityCapital = receivedAndReconciledDrawdowns
```

### Módulos

```text
CapitalFacilityPolicy
├── DrawdownEligibility
├── TWAPPolicy
├── ThresholdPricePolicy
├── WarrantRegistry
├── DilutionCalculator
├── SupplyInvariantMonitor
└── FacilityReporting
```

### TWAP Policy

O cálculo deverá definir por versão:

- venues elegíveis;
- janela temporal;
- frequência das observações;
- ativos de cotação elegíveis;
- liquidez mínima;
- volume mínimo;
- tratamento de outliers;
- divergência entre CEX e DEX;
- exclusão de negociações suspeitas;
- fallback;
- timezone;
- arredondamento;
- fonte oficial em disputa.

O valor contratual definitivo não será inferido pelo software.

### Threshold Registry

Cada threshold deve possuir identificador próprio:

- `TH-GEM-DRAWDOWN`;
- `TH-WARRANT-EXERCISE`;
- `TH-MARKET-ACTIVATION`;
- `TH-MARGIN`;
- `TH-LIQUIDATION`;
- `TH-ORACLE-DEVIATION`;
- `TH-DEPEG`.

Campos mínimos:

- unidade;
- valor;
- fonte contratual;
- data de vigência;
- owner;
- versão;
- estado;
- regra de fallback.

## AGD Market Operations

O módulo AGD poderá:

- calcular fair value consolidado;
- monitorar liquidez por venue;
- controlar inventário;
- medir spread e profundidade;
- executar arbitragem controlada;
- realizar hedge do inventário;
- monitorar TWAP e thresholds;
- suspender cotação em stress;
- registrar métricas para market makers e exchanges.

Não poderá:

- prometer valorização;
- usar capital Nickel;
- contabilizar comunidade como demanda;
- usar lançamentos futuros como liquidez atual;
- ignorar limites para defender preço.

## Separação de instâncias

```text
instance: akin-proprietary
credentials: AKIN_ONLY
capitalCell: AKIN_PROP

instance: nickel-pod
credentials: NICKEL_ONLY
capitalCell: NICKEL

instance: agd-liquidity
credentials: AGD_TREASURY_ONLY
capitalCell: AGD_TREASURY

instance: agroderi-sandbox
credentials: TESTNET_OR_PAPER_ONLY
capitalCell: SANDBOX
```

Nenhuma configuração de produção deve permitir fallback para credenciais de outra instância.

## Fases de integração

### Fase 1

Paper trading e relatórios reproduzíveis.

### Fase 2

Testnet e exchanges sandbox com capital fictício.

### Fase 3

Piloto proprietário limitado, após aprovação interna.

### Fase 4

Pod institucional segregado, condicionado a contratos e diligência.

### Fase 5

Integração de hedge e liquidez com AgroDeri, condicionada a auditoria de contratos, regras jurídicas e clearing validado.
