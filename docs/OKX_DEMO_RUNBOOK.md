# OKX Demo Trading Runbook

## Status

The OKX connector is restricted to **Demo Trading**. Production mode throws a configuration error before any private request is made.

The connector supports:

- public server time;
- public instruments and ticker data;
- authenticated account configuration and balance reads;
- guarded spot limit orders in demo mode;
- individual order cancellation;
- order status lookup;
- pending-order cancellation and Cancel All After kill switch.

It does not support:

- production orders;
- withdrawals;
- transfers;
- market orders;
- margin, swaps, futures or options execution;
- autonomous strategy execution.

## Required deployment secrets

Configure these directly in the deployment secret manager. Never commit real values.

```env
OKX_MODE=demo
OKX_BASE_URL=https://eea.okx.com
OKX_API_KEY=<demo-api-key>
OKX_API_SECRET=<demo-secret-key>
OKX_API_PASSPHRASE=<demo-passphrase>
OKX_ENABLE_PRIVATE_READS=true
OKX_ENABLE_ORDER_WRITES=false
OKX_TRADING_KILL_SWITCH=true
OKX_INTERNAL_ORDER_TOKEN=<long-random-secret>
OKX_ALLOWED_INSTRUMENTS=BTC-USDT,ETH-USDT
OKX_MAX_ORDER_NOTIONAL_USDT=25
OKX_MAX_LIMIT_DEVIATION_BPS=500
OKX_CANCEL_ALL_AFTER_SECONDS=30
```

## Safe activation sequence

1. Deploy with `OKX_ENABLE_ORDER_WRITES=false` and `OKX_TRADING_KILL_SWITCH=true`.
2. Call `GET /api/exchanges/okx/health` and confirm public and authenticated reads.
3. Confirm the API key was created inside OKX Demo Trading.
4. Confirm the allowlist and order-notional limit.
5. Set `OKX_ENABLE_ORDER_WRITES=true`.
6. Keep `OKX_TRADING_KILL_SWITCH=true` until the exact demo order is ready.
7. Set `OKX_TRADING_KILL_SWITCH=false` only for the controlled test window.
8. Return the kill switch to `true` immediately after the test.

## Health check

```http
GET /api/exchanges/okx/health
```

The response never includes credentials, signatures or balances.

## Submit one demo limit order

```http
POST /api/exchanges/okx/orders
Content-Type: application/json
x-akin-order-token: <OKX_INTERNAL_ORDER_TOKEN>

{
  "requestId": "manual-test-0001",
  "instId": "BTC-USDT",
  "side": "buy",
  "price": "50000",
  "size": "0.0001"
}
```

The endpoint:

1. validates the internal token;
2. checks demo mode and credentials;
3. checks the kill switch and write flag;
4. verifies the instrument allowlist;
5. loads current instrument metadata and ticker;
6. validates tick size, lot size and minimum size;
7. checks notional and price deviation limits;
8. derives a deterministic `clOrdId` from `requestId`;
9. arms OKX Cancel All After;
10. submits a limit order.

Repeating the same `requestId` produces the same client order ID.

## Read order status

```http
GET /api/exchanges/okx/orders/status?instId=BTC-USDT&clOrdId=<client-order-id>
x-akin-order-token: <OKX_INTERNAL_ORDER_TOKEN>
```

## Cancel one order

```http
POST /api/exchanges/okx/orders/cancel
Content-Type: application/json
x-akin-order-token: <OKX_INTERNAL_ORDER_TOKEN>

{
  "instId": "BTC-USDT",
  "clOrdId": "<client-order-id>"
}
```

## Activate the kill switch

```http
POST /api/exchanges/okx/kill-switch
x-akin-order-token: <OKX_INTERNAL_ORDER_TOKEN>
```

The endpoint:

- lists pending spot orders;
- attempts to cancel each pending order;
- arms Cancel All After with a 10-second timeout;
- reports cancellations and sanitized failures.

## Current limitations

The pre-trade controls are stateless. A database-backed order ledger, daily loss limit, daily turnover limit, reconciliation worker and WebSocket order stream are still required before autonomous demo trading.
