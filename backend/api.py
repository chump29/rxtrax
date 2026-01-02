#!.venv/bin/python

"""API Service"""

from fastapi import FastAPI
from uvicorn import run

from db import add as c, create, delete as d, get as r, Med, update as u


api = FastAPI()

create()


@api.post("/api/add")
def add(med: Med):
    """Add medication"""
    c(med)


@api.get("/api/get")
def get():
    """Get medication"""
    return r()


@api.put("/api/update")
async def update(med: Med):
    """Update medication"""
    await u(med)


@api.delete("/api/delete/{pk}")
async def delete(pk: int):
    """Delete medication"""
    await d(pk)


if __name__ == "__main__":
    run(app="api:api", host="0.0.0.0", port=5556, reload=True)
