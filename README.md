# ShopKart Product Discovery

This project contains the Lab 03 product catalogue experience.

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set a MongoDB connection string.
2. Copy `frontend/.env.example` to `frontend/.env` if the API is not served from `http://localhost:5000`.
3. Install dependencies with `npm run install:all`.
4. Run both applications with `npm run dev`.

The API exposes `POST /products`, `GET /products`, and `GET /products/:id`. Product listing supports `search`, `category`, and bonus `sort=price_asc|price_desc` query parameters.
