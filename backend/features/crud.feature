@crud
Feature: Get user medications
  Scenario: Get user medications
    Given that a user wants their medications
      When /get API endpoint is called with a user
      Then medication data is returned
        And the user matches
