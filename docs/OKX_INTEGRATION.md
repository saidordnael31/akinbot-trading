# OKX Integration — Phase 1

## Status

The OKX connector is implemented as **demo/read-only infrastructure**.

Current capabilities:

- public server-time check;
- public instrument discovery;
- authenticated account-configuration check;
- authenticated balance retrieval in the server-side client;
- signed REST requests using HMAC-SHA256;
- demo header support;
- request timeout and sanitized errors;
- no order placement, cancellation, transfer or withdrawal methods.

## Immediate credential action

Any API credential pasted into chat, tickets, documents or source code must be treated as exposed.

Required action:

1. revoke the exposed API key in OKX;
2. create a new **Demo Trading API key**;
3. begin with `Read` permission;
4. bind the key to an approved server IP when a stable outbound IP exists;
5. store the key, secret and passphrase directly in the deployment secret manager;
6. never place secrets in GitHub, Vercel build logs, screenshots or frontend variables.

The OKX passphrase is required for authenticated requests. It must not be shared in chat.

## Environment variables

Copy `.env.example` to a local `.env.local` and populate it outside version control:

```bash
OKX_MODE=demo
OKX_BASE_URL=https://www.okx.com
OKX_API_KEY=...
OKX_API_SECRET=...
OKX_API_PASSPHRASE=...
OKX_ENABLE_PRIVATE_READS=true
OKX_ENABLE_ORDER_WRITES=false
```

The REST host must match the region associated with the OKX account. The connector only permits explicitly approved OKX hosts.

## Health endpoint

```text
GET /api/exchanges/okx/health
```

The endpoint validates:

1. local configuration;
2. access to the OKX public API;
3. signed authentication when all three secrets are configured.

It never returns:

- API key;
- API secret;
- passphrase;
- signature;
- request headers;
- account balance;
- positions;
- order history.

Example response without private credentials:

```json
{
  "ok": true,
  "exchange": "okx",
  "mode": "demo",
  "baseUrl": "https://www.okx.com",
  "publicApi": "ok",
  "authenticatedApi": "not-configured",
  "checkedAt": "2026-07-18T00:00:00.000Z"
}
```

## Signing model

Authenticated requests use:

```text
prehash = timestamp + method + requestPath + body
signature = Base64(HMAC-SHA256(prehash, apiSecret))
```

Required private headers:

- `OK-ACCESS-KEY`;
- `OK-ACCESS-SIGN`;
- `OK-ACCESS-TIMESTAMP`;
- `OK-ACCESS-PASSPHRASE`.

Demo requests also use:

```text
x-simulated-trading: 1
```

## Safety boundary

`OKX_ENABLE_ORDER_WRITES=true` does not enable trading. The current client deliberately exposes no write method.

Before any demo order method is added, the repository must contain:

- typed OrderIntent;
- Capital Cell and Risk Cell authorization;
- per-instrument notional limit;
- daily loss limit;
- maximum open-order limit;
- price-deviation control;
- duplicate-order protection;
- client-order-id idempotency;
- stale-market-data rejection;
- kill switch;
- immutable audit event;
- explicit demo-only enforcement.

Production trading remains blocked until a separate approval process is completed.

## Planned next stages

### Phase 2 — market data

- public WebSocket;
- normalized trades and order books;
- funding rates;
- mark and index prices;
- instrument metadata;
- latency and staleness monitoring.

### Phase 3 — private demo state

- balances;
- positions;
- open orders;
- fills;
- fee rates;
- margin and account mode.

### Phase 4 — controlled demo execution

Only after Risk Engine integration:

- limit orders;
- post-only orders;
- cancellation;
- two-leg execution coordinator;
- reconciliation;
- emergency cancel-all.

No production capital is included in these phases.
