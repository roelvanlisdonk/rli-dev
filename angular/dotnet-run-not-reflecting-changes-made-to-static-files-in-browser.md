When you are using Angular and .NET Core with the spa templates:

```
"using Microsoft.AspNetCore.SpaServices.AngularCli;"
```

and have a Startup.cs:

```
public void ConfigureServices(IServiceCollection services) {
    services.AddSpaStaticFiles(configuration => {
        // In production, the Angular files will be served from this directory.
        configuration.RootPath = "ClientApp/dist";
    });
}
```

and run your application locally with dotnet run, please make sure you remove the "dist" folder, before you run dotnet run.

You can also rimraf the folder before you serve the Angular application:

```
if (env.IsDevelopment()) {
    spa.UseAngularCliServer(npmScript: "start:spa");
}
```

Then in package.json:
{
...
"ng-high-memory": "node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng",
"start:spa": "rimraf ./dist && npm run ng-high-memory -- serve",
...
}
