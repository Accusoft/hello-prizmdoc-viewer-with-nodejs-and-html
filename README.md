# Hello PrizmDoc Viewer with node.js and HTML

A minimal node.js express app which has integrated PrizmDoc Viewer.

## Setup

### Requirements

- [Node.js](https://nodejs.org) 8 or higher

### Configure Connection to PAS

Configure how to connect to PAS (PrizmDoc Application Services) by editing the `config.json5` file (this is just a JSON file with comments).

If you're just getting started, the easiest thing to do is to use [PrizmDoc Cloud](https://cloud.accusoft.com). We host PAS for you and all you need is your [PrizmDoc Cloud](https://cloud.accusoft.com) API key. If you don't have an API key, you can get one for free at https://cloud.accusoft.com.

For PrizmDoc Cloud:

```json
{
  "pasBaseUrl": "https://api.accusoft.com/prizmdoc",
  "apiKey": "YOUR_API_KEY"
}
```

For self-hosted PAS:

```json
{
  "pasBaseUrl": "YOUR_PAS_BASE_URL",
  "pasSecretKey": "YOUR_PAS_SECRET_KEY",
}
```

Alternately, you can set or override any of these values via environment variables:

- `API_KEY`
- `PAS_BASE_URL`
- `PAS_SECRET_KEY`

### Install dependencies

```
npm install
```

## Running the Sample

To start the app:

```
npm start
```

This will launch a small web application on `http://localhost:8888`.

You should see output like this:

```
> node index.js

[HPM] Proxy created: /pas-proxy  ->  https://api.accusoft.com/prizmdoc
[HPM] Proxy rewrite rule created: "^/pas-proxy" ~> ""
[HPM] Subscribed to http-proxy events:  [ 'error', 'close' ]
Application running at http://localhost:8888
```

When you visit `http://localhost:8888`, you should see a viewer with an example document, like this:

![](screenshot.png)
