# Risk Cells, Colateral, Clearing e Waterfall — Versão 0.1

## Status

**Classificação:** política proposta para simulação e validação.

Os parâmetros numéricos abaixo não constituem oferta, garantia de solvência ou regra comercial definitiva.

## Princípio central

A AgroDeri não presume que perdas são impossíveis. Cada produto deve definir previamente:

- onde a perda nasce;
- qual patrimônio responde;
- qual colateral é reconhecido;
- qual liquidez está disponível;
- qual waterfall será acionada;
- quando novas posições serão bloqueadas;
- quando o mercado será encerrado.

## Identidade dupla de risco

Toda posição deve possuir:

```text
capitalCellId + riskCellId
```

### Capital Cells

- Akin Proprietary;
- Nickel Pod;
- GEM Facility;
- AGD Treasury;
- RLP;
- Insurance;
- Customer Collateral;
- Market Launch Vaults.

### Product Risk Cells

Exemplos:

- AGD/USDT Spot;
- AGD Market Making;
- BRSA Settlement;
- BRWA Gold;
- Açaí Tocantins Future 2028;
- Banana Swap;
- Maçã Options;
- BTC Funding Arbitrage.

## Recursos financeiros disponíveis

Para cada célula `j`:

```text
AFR_j = adjustedCollateral_j
      + receivedMargin_j
      + firstLossCapital_j
      + allocatedSkinInTheGame_j
      + allocatedInsurance_j
```

Não entram em AFR:

- capital prometido e ainda não recebido;
- margin calls pendentes;
- facility não sacada;
- valor nominal sem haircut;
- patrimônio de outra célula;
- comunidade ou demanda potencial;
- liquidez futura esperada de novos tokens.

## Necessidade financeira

```text
RFR_j = max(
  expectedShortfall_j,
  stressLoss_j,
  liquidityNeed_j
) + operationalBuffer_j

solvencyRatio_j = AFR_j / RFR_j
```

As faixas de ação devem ser configuradas no Risk Parameter Registry e nunca codificadas silenciosamente na interface.

## Colateral elegível

Classes consideradas para estudo:

### Dólar digital

- USDT;
- USDC.

### Real digital privado

- BRLA;
- BRLN;
- BRZ;
- BRSA, ativo AgroDeri pendente de documentação e registro.

### Ouro tokenizado

- PAXG;
- XAUT;
- BRWA, ativo AgroDeri pendente de documentação e registro.

### Outros

- BRL e USD em rails autorizados;
- títulos soberanos líquidos;
- BTC;
- ouro alocado;
- ativos produtivos somente em veículos segregados e após aprovação específica.

## Valor reconhecido

```text
adjustedValue_i = marketValue_i
  × marketFactor_i
  × liquidityFactor_i
  × issuerFactor_i
  × custodyFactor_i
  × legalFactor_i
  × concentrationFactor_i
  × wrongWayRiskFactor_i
```

Cada fator deve permanecer no intervalo `[0,1]`.

O haircut final deve respeitar:

```text
finalHaircut_i = max(
  modelHaircut_i,
  stressHaircut_i,
  policyFloor_i
)
```

## Margem

```text
initialMargin = max(
  expectedShortfall
  + liquidityRisk
  + basisRisk
  + oracleRisk
  + gapRisk
  + counterpartyRisk
  + modelBuffer,
  stressLoss,
  marginFloor
)
```

A margem dinâmica deve possuir:

- piso permanente;
- buffer anticíclico;
- limite de redução por janela;
- aumento emergencial separado;
- período de estabilização após stress;
- proibição de redução imediata após hard fail.

## Oracle hard fails

Um score médio não pode compensar falhas críticas. Devem bloquear novas posições, conforme política:

- preço além do limite de staleness;
- número de fontes abaixo do mínimo;
- divergência acima do limite;
- concentração excessiva em uma fonte;
- alteração retroativa não autorizada;
- indisponibilidade simultânea das fontes principais.

## Clearing versus settlement

### Clearing Engine

- consolida posições;
- calcula exposição bruta e líquida;
- executa netting conforme regras aplicáveis;
- calcula variação de margem;
- controla margin calls;
- determina obrigações líquidas;
- administra defaults;
- aciona a waterfall;
- envia instruções de liquidação.

### Settlement

- movimenta colateral;
- paga saldos positivos;
- cobra saldos negativos;
- libera garantias;
- distribui taxas;
- finaliza posições;
- registra conclusão ou falha.

O endereço do `ClearingEngine` ainda está pendente no deployment registry.

## Waterfall recomendada

1. caixa e saldo disponível da contraparte inadimplente;
2. margem de variação vencida e valores compensáveis;
3. margem inicial e adicional;
4. colateral executável após custos;
5. contribuição individual ao fundo de default;
6. capital subordinado ou de primeira perda do produto;
7. capital próprio alocado àquela célula;
8. seguro específico do produto;
9. fundo mutualizado, quando contratualmente existente;
10. chamadas extraordinárias limitadas e contratadas;
11. auto-deleveraging ou encerramento parcial;
12. socialização residual somente quando válida e previamente contratada.

## Proibições

- usar ativos de clientes em operações próprias;
- transferir garantia entre células sem base contratual;
- usar insurance fund como caixa operacional;
- contar o mesmo ativo em duas células;
- considerar AGD como absorvedor universal de perdas;
- sustentar preço de tokens com patrimônio da Nickel;
- usar liquidez de lançamento futuro como garantia atual;
- permitir que quantum ou IA ignorem limites determinísticos.

## Parâmetros ilustrativos para simulação

- BTC: haircut inicial ilustrativo de 50%;
- stablecoins: faixa ilustrativa de 10% a 25%;
- ouro: haircut ilustrativo de 20%;
- ativos produtivos: não elegíveis no piloto de derivativos;
- no mínimo dois custodiantes para ambientes institucionais;
- nenhum custodiante acima do limite definido pela política;
- no mínimo três fontes independentes para oracles produtivos;
- stress automático diário;
- stress reverso mensal;
- validação independente anual como objetivo de governança.

Todos esses valores devem permanecer classificados como `illustrative` até aprovação formal.
