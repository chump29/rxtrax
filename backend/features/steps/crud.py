#!.venv/bin/python

# pylint: skip-file
# type: ignore

from behave import given, then, when

from api import get
from db import add as c, delete as d, get as r, Med

USER = "TestMe"


@given("that a user wants their medications")
def step_impl(context):
    rows = r(USER)
    for row in rows:
        d(row["id"])
    c(Med(name=USER, medication="Med1", strength="Strength1"))
    c(Med(name=USER, medication="Med2", strength="Strength2"))
    context.meds = get(USER)


@when("/get API endpoint is called with a user")
def step_impl(context):
    assert context.failed is not True, "/get call failed"


@then("medication data is returned")
def step_impl(context):
    assert len(context.meds) == 2, "Invalid query results"


@then("the user matches")
def step_impl(context):
    assert context.meds[0]["name"] == USER, "User invalid"
    for med in context.meds:
        d(med["id"])
