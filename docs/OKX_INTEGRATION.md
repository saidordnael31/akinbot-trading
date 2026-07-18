# OKX Integration

## Current phase

The connector now supports **controlled OKX Demo Trading**. Production mode remains blocked in code.

Implemented capabilities:

- HMAC-SHA256 REST authentication;
- OKX demo header support;
- public server time, instruments and ticker;
- authenticated account configuration and balance reads;
- guarded USDT-quoted spot limit orders;
- deterministic client order IDs derived from `requestId`;
- individual order cancellation;
- order status lookup;
- pending-order cancellation;
- OKX Cancel All After protection;
- internal endpoint token;
- instrument allowlist;
- Capital Cell and Risk Cell authorization;
- per-order notional and price-deviation limits;
- production-write blocking.

## Credential handling

The API key, secret key and passphrase must be stored directly in the deployment secret manager. They must never be committed to GitHub, exposed through frontend variables or returned by API responses.

Authenticated OKX requests require all three values:

- API key;
- secret key;
- passphrase.

## Required environment

See `.env.example` for the complete list. The initial execution perimeter is:

```env
OKX_MODE=demo
OKX_ENABLE_ORDER_WRITES=false
OKX_TRADING_KILL_SWITCH=true
OKX_ALLOWED_CAPITAL_CELL_ID=akin-proprietary-demo
OKX_ALLOWED_RISK_CELL_ID=okx-demo-spot
OKX_MAX_ORDER_NOTIONAL_USDT=25
```

Order writes require all of the following simultaneously:

1. demo mode;
2. complete credentials;
3. `OKX_ENABLE_ORDER_WRITES=true`;
4. `OKX_TRADING_KILL_SWITCH=false`;
5. a configured internal order token;
6. the correct internal token in the request header;
7. an authorized Capital Cell;
8. an authorized Risk Cell;
9. an allowlisted instrument;
10. successful pre-trade checks.

## Endpoints

```text
GET  /api/exchanges/okx/health
POST /api/exchanges/okx/orders
GET  /api/exchanges/okx/orders/status
POST /api/exchanges/okx/orders/cancel
POST /api/exchanges/okx/kill-switch
```

Operational examples and activation sequence are documented in `docs/OKX_DEMO_RUNBOOK.md`.

## Deliberately unsupported

- production trading;
- withdrawals and transfers;
- market orders;
- margin orders;
- swaps, futures and options execution;
- autonomous strategy execution;
- unrestricted public order endpoints.

## Remaining work before autonomous demo execution

- persistent order and execution ledger;
- WebSocket order and fill stream;
- reconciliation worker;
- maximum open-order count;
- daily turnover limit;
- daily loss limit;
- stale-data clock based on exchange timestamps;
- audit-event persistence;
- multi-leg execution coordinator;
- integration with the full off-chain Risk Engine.
