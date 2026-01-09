@version
Feature: Get API version
  Scenario: Get API vesrion
    Given a request for the API version
      When /version API endpoint is called
      Then version is returned
