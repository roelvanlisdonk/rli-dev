If you want to disable the css sonar rule, you can take a look at the following configuration:

```
task: SonarSource.sonarcloud.14d9cde6-c1da-4d55-aa01-2965cd301255.SonarCloudPrepare@1
displayName: Prepare analysis on SonarCloud
inputs:
    SonarCloud: SonarCloud
    organization: $(Global.SonarOrganisationKey)
    projectKey: my-project-key
    projectName: my-project-key
    scannerMode: Other
    extraProperties: |
    sonar.exclusions=node_modules/**/*, **/*.spec.ts, dist/**/*, coverage/**/*, **/karma.conf.js
    sonar.typescript.lcov.reportPaths=coverage/lcov.info
    sonar.coverage.exclusions=src/lib/assets/**, **/*.stories.ts, **/*.html, **/*.scss, **/*.css
    sonar.tests=src
    sonar.test.inclusions=src/**/*.spec.ts
    sonar.issue.ignore.multicriteria=css1,css2

    # Disabling the scss lint rule (S4660) 'Pseudo-element selectors should be valid'.
    # We disable the complete rule, because we can't specify that we only want to ignore the '::ng-deep' selector.
    # At the moment we are still using '::ng-deep' as a replacement for /deep/
    sonar.issue.ignore.multicriteria.css1.ruleKey=css:S4660
    sonar.issue.ignore.multicriteria.css1.resourceKey=**/*.scss

    # Disable css rule (RSPEC-4670) - Selectors should be known.
    # In angular we define our own elements, so custom element names should be allowed.
    sonar.issue.ignore.multicriteria.css2.ruleKey=css:S4670
    sonar.issue.ignore.multicriteria.css2.resourceKey=**/*.scss

```
