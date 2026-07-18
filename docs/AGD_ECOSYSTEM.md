# AGD Ecosystem and Productive Market Launch Framework

## Status

**Classificação:** tese econômica e arquitetura proposta.

Este documento descreve como o AGD poderá financiar e coordenar novos mercados. Ele não representa oferta pública, promessa de valorização, garantia de liquidez ou autorização regulatória para qualquer token ou derivativo.

## Função do AGD

O AGD é a camada econômica central da AgroDeri. Seu papel proposto é financiar infraestrutura, coordenar incentivos e participar economicamente do lançamento de mercados produtivos.

```text
AGD
→ infraestrutura central
→ dados e índices
→ lançamento de tokens produtivos
→ formação de liquidez
→ instrumentos spot e derivativos
→ taxas e receitas de infraestrutura
→ novos market launches
```

## Supply canônico

- máximo: 10.000.000.000 AGD;
- rede canônica inicial: BNB Smart Chain;
- gas: BNB;
- emissão integral no TGE;
- mint posterior proibido;
- burn irreversível;
- representações em outras redes não podem elevar o supply econômico agregado.

Referências anteriores a 21 bilhões estão descontinuadas.

## Market Launch Framework

Cada fruta, legume, cadeia ou commodity invisível deverá passar por etapas formais:

1. seleção e justificativa econômica;
2. definição do ativo, região, qualidade e unidade;
3. metodologia do índice;
4. rede de fontes e testemunhas;
5. regras de oracle e confiança;
6. análise jurídica do token e de cada instrumento;
7. cadastro no Instrument Registry;
8. formação de treasury e Risk Cell próprias;
9. contratação de market makers;
10. sandbox e backtesting;
11. teste de capacidade e saída;
12. aprovação de abertura;
13. monitoramento contínuo;
14. suspensão ou encerramento quando necessário.

## Estrutura de uma Market Cell

```text
Market Cell — Açaí Tocantins
├── Treasury Vault
├── Data and Oracle Budget
├── Liquidity Vault
├── Market Maker Mandates
├── Product Risk Cell
├── Insurance Allocation
├── Instrument Registry entries
├── Spot or index token
├── Futures / forwards
├── Options
└── Swaps
```

Cada célula deve manter patrimônio, colateral, liquidez e waterfall próprios.

## Participação do AGD

O AGD Treasury poderá participar dos tokenomics de mercados subsequentes como sponsor ou founder econômico, sujeito a documentação específica.

Possíveis fluxos econômicos:

- alocação inicial limitada;
- participação no tokenomics;
- remuneração por infraestrutura;
- taxas de listagem e operação;
- licenciamento de dados e APIs;
- programas transparentes de liquidez;
- aquisição de AGD via Fee Engine;
- contribuição ao fundo de desenvolvimento do ecossistema.

## Limites de financiamento cruzado

É proibida a mutualização irrestrita.

```text
AGD Treasury
→ grant ou investimento limitado
→ Market Launch Vault específico
→ Market Cell específica
```

Toda transferência precisa registrar:

- origem;
- destino;
- finalidade;
- limite;
- preço de referência;
- aprovação;
- prazo;
- direitos econômicos;
- conflito de interesses;
- tratamento em insolvência;
- impacto de concentração;
- proibição de dupla contagem.

A liquidez captada por um token futuro não pode ser tratada antecipadamente como garantia de outro ativo.

## Comunidade

As comunidades da AgroDeri representam capacidade potencial de:

- adoção;
- educação;
- distribuição;
- contribuição de dados;
- formação de produtores e usuários;
- participação em mercados e governança limitada.

Comunidade não é contabilizada como:

- capital comprometido;
- demanda garantida;
- colateral;
- market maker contratado;
- liquidez mínima;
- proteção de preço.

## Instrumentos possíveis

A arquitetura deverá representar genericamente:

- spot;
- índices;
- forwards;
- swaps;
- futuros;
- perpetuals;
- opções;
- cestas sintéticas;
- contratos regionais;
- estruturas de hedge.

Exemplos conceituais:

- futuro de açaí do Tocantins 2028;
- swap de banana;
- opção de maçã;
- índice regional de leite;
- fertilizante versus gás natural;
- frango versus milho e soja.

Nenhum exemplo implica que o produto esteja autorizado, registrado, líquido ou disponível.

## AGD, BRSA e BRWA

### BRSA

Ativo nativo AgroDeri referenciado ao real, pendente de especificação completa de:

- emissor;
- reservas;
- mint e burn;
- resgate;
- custódia;
- proof of reserves;
- congelamento;
- insolvência;
- contratos e endereço.

### BRWA

Ativo nativo AgroDeri referenciado a ouro, pendente de especificação completa de:

- ouro alocado ou não alocado;
- barras e serialização;
- custodiante;
- seguro;
- auditoria;
- resgate físico ou financeiro;
- proof of reserves;
- contratos e endereço.

BRSA e BRWA não recebem automaticamente o mesmo haircut de ativos externos comparáveis.

## AGD como colateral

O AGD não deve integrar o capital principal de absorção de perdas no piloto institucional.

Possíveis usos:

- taxas;
- staking;
- recompensas;
- descontos;
- coordenação econômica;
- market launch sponsorship.

A eventual aceitação como colateral exigirá haircut elevado, limite de concentração, múltiplas venues, profundidade mínima, TWAP robusto, circuit breakers e aprovação formal.

## Métricas de abertura de mercado

Cada mercado deverá demonstrar, no mínimo:

- cobertura de fontes de dados;
- estabilidade do índice;
- capacidade do oracle;
- profundidade contratada;
- custo de hedge;
- slippage esperado;
- saída em cenário de stress;
- capital de primeira perda;
- insurance allocation;
- concentração por participante;
- risco jurídico e operacional;
- capacidade do clearing e settlement.
