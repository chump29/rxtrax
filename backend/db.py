#!.venv/bin/python

"""DB Service"""

from dataclasses import dataclass
from os import path

from peewee import AutoField, CharField, Model, SqliteDatabase
from pydantic import BaseModel

DB_FILE = "rxtrax.db"

DEBUG = False


class Med(BaseModel):
    """Rx data model"""

    pk: int | None = None
    name: str
    medication: str
    strength: str


class Rx(Model):
    """Rx DB model"""

    id = AutoField()
    name = CharField(null=False)
    medication = CharField(null=False)
    strength = CharField(null=False)

    @dataclass
    class Meta:
        """Metadata"""

        database = SqliteDatabase(
            DB_FILE,
            pragmas={"journal_mode": "wal"},
        )


def create():
    """Create tables"""
    if not path.exists(DB_FILE):
        if DEBUG:
            print("Creating database")
        Rx.create_table()


def add(med: Med):  # c
    """Add medication"""
    if DEBUG:
        print(f"Adding row: {med.name}, {med.medication}, {med.strength}")
    return Rx.create(name=med.name, medication=med.medication, strength=med.strength)


def get(name: str):  # r
    """Get medication"""
    if DEBUG:
        print(f"Getting rows: {Rx.select(Rx.name == name).count(None)}")
    return list(Rx.select().dicts())


def delete(pk: int):  # d
    """Delete medication"""
    if DEBUG:
        print(f"Deleting row: {pk}")
    Rx.delete_by_id(pk)


if __name__ == "__main__":
    raise NotImplementedError("Cannot be executed as a stand-alone script!")
