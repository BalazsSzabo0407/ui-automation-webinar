Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Searching for a job - <PositionName>
    Given the career page is opened
    Then the logo should be visible
    And the search form should be visible

    When <location> is selected in the location filter box
    Then <location> should be selected in the location filter box

    When <skills> is selected in the skills filter box
    Then <skills> should be selected in skills filter box

    When the search button is clicked on
    Then there should be a job offer for <PositionName> position
    And the location of the <PositionName> position should be <location>
    And the apply button of the <PositionName> position should be visible

    When the apply button of the <PositionName> position is clicked on
    Then the description of the job offer should contain <PositionName>
    And there should be an apply button


    Examples:
            | location     | skills                                 | PositionName              |
            | Debrecen     | Software, System, and Test Engineering | Test Automation Engineer  |
            | Paris        | Solution Architecture                  | Solution Architect        |