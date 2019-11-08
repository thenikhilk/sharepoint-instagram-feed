# Developer Guide

## Setup

To setup download/clone the repo and run the following commands at root

``` powershell
npm install
npm install -g yo gulp
npm install -g @microsoft/generator-sharepoint
```

Additional info for environment setup is available at [link](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment "link").

## Build

``` powershell
gulp clean
gulp bundle
```

## Debug

``` powershell
gulp serve
```

This will launch the workbench where you can debug you web part.

## Bundle and Package

``` powershell
gulp bundle --ship
gulp package-solution --ship
```

### OR

``` powershell
npm run package
```

Files to deploy will be available at path `temp\deploy` and the package(*.sppkg) will be available at `sharepoint\solution` path.

Make sure to update the `cdnBasePath` at `config\write-manifests.json` before deployment to the location where you have deployed your assets.

Additional info for deployment is available at [link](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/deploy-web-part-to-cdn "link").

SPFx Documentation: [link](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview "link")
