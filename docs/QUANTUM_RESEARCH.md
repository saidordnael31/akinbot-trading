# Akin–QuIIN Quantum Research Track

## Status

**Classificação:** proposta de pesquisa aplicada.

Nenhuma parceria institucional, vantagem quântica, ganho financeiro ou participação do SENAI CIMATEC é presumida sem instrumento formal.

## Princípio

Sistemas clássicos e determinísticos permanecem soberanos para:

- saldo;
- margem oficial;
- clearing;
- settlement;
- reconciliação;
- autorização;
- contabilização;
- kill switches;
- prova de reservas;
- trilha de auditoria.

Módulos quantum e quantum-inspired operam apenas como recomendadores experimentais.

## Problemas de pesquisa

- otimização de colateral;
- alocação de capital entre estratégias;
- roteamento de hedge;
- seleção de venues;
- rebalanceamento de inventário;
- formação de pools;
- escolha de market makers;
- stress combinatório;
- construção de cestas sintéticas;
- redução de correlação entre pods;
- detecção de clusters de risco;
- segurança pós-quântica.

## Formulação geral

```text
minimize
  executionCost
+ slippage
+ fundingCost
+ counterpartyRisk
+ liquidationRisk
+ concentrationRisk
+ residualExposure
+ transferCost

subject to
  delta limits
  margin floors
  venue limits
  asset limits
  liquidity floors
  exit capacity
  collateral availability
  latency constraints
  Risk Cell boundaries
  RLP capacity
```

## Baselines obrigatórios

Todo experimento deve comparar o método proposto com:

- programação linear;
- programação inteira;
- otimização convexa;
- heurísticas simples;
- algoritmos genéticos;
- métodos greedy;
- benchmarks ingênuos reproduzíveis.

## Critérios de avaliação

- qualidade da solução;
- estabilidade;
- tempo de processamento;
- custo computacional;
- sensibilidade a ruído;
- escalabilidade;
- performance fora da amostra;
- robustez sob stress;
- capacidade de explicar a decisão.

Se o método clássico vencer, o método clássico será utilizado.

## Arquitetura de segurança

```text
Quantum Research Service
→ recommendation
→ deterministic validator
→ risk policy engine
→ approved or rejected action
```

O serviço experimental não possui:

- chave privada;
- credencial de exchange;
- permissão de settlement;
- permissão de alterar margem;
- permissão de alterar Risk Cells;
- permissão de desativar circuit breakers.

## Segurança pós-quântica

Trilha de pesquisa:

- inventário de algoritmos criptográficos;
- crypto-agility;
- rotação de chaves;
- envelope encryption;
- assinaturas de eventos;
- proteção de dados em repouso e trânsito;
- avaliação de algoritmos pós-quânticos;
- migração sem interrupção;
- análise de integrações privadas sob controle da Akin e AgroDeri.

## Artefatos esperados

- notebooks reproduzíveis;
- datasets versionados ou referências imutáveis;
- descrição do problema;
- baseline clássico;
- método experimental;
- resultados fora da amostra;
- limitações;
- custo de execução;
- decisão de adoção ou rejeição;
- trilha de revisão científica.

## Primeiros estudos sugeridos

1. collateral optimization por Risk Cell;
2. hedge routing entre venues;
3. allocation entre basis, funding e relative value;
4. RLP capacity under stress;
5. optimal market-maker assignment para mercados produtivos;
6. reverse stress search em ecossistemas com múltiplos tokens;
7. post-quantum signing roadmap para eventos privados.
