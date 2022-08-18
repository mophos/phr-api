# ExpressJS and TypeScript

## Installation

```
npm i typescript -g
npm i ts-node -g
```

```
git clone https://github.com/siteslave/ts-node-express myApi
cd myApi
npm i
```

## Running

```
cp .env.example.txt .env
npm start
```

open browser and go to http://localhost:3000

## PM2

```
pm2 start --interpreter ts-node src/bin/www.ts MyServerName
```

```
{
  "app_id":"2708e84c-d776-45a6-8e75-dc76fec79e0e",
  "name": "John Doe",
  "iat": 1516239022,
  "source": "TEST"
}
```