If you want all import rules to be only one line, then tslint will complain about max line length.
You can configure this rule to ignore TypeScript imports inside the tslint.config file, like so:

```
{
    "rules": {
    "max-line-length": [true, {"limit": 120, "ignore-pattern": "^import [^,]+ from"}],
    }
}
```

https://github.com/palantir/tslint/pull/3099

The prettier vscode extension will check the tslint.config file to NOT format the import lines.
