Lets assume you have 2 build pipelines and you want to trigger build pipeline A, when a pull request merges to develop on pipeline B.

Then you first have to enable CI triggers on the develop branch in the build pipeline B.
Pipelines > Select the pipeline > View
The pipeline should start with something like:

```
trigger:
  branches:
    include:
    - develop
    - master

pr:
  branches:
    include:
    - develop
    - master
```

Then you can define a dependency build on build pipeline A.
Pipelines > Select the pipeline > View > Command Menu (the tree vertical dots) > Triggers > Build completion
