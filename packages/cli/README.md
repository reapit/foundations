# reapit
Command line interface tool for reapit 

![Deployment gif](reapit-deploy.gif)

## Commands

command | description | args &amp; options
--- | --- | --- 
`deployment create` | Create a new deployment configuration | 
`deployment list` | List your existing deployment configurations | 
`deployment run {deploymentId}` | Run a deployment configuration | 
`config` | Create, update or show your config | 

## Create commands

Commands are written in an OOP method and are bootstraped with the `AbstractCommand` class which provides some helpful functions for creating commands

```ts
@Command({
  name: "example",
  description: "An example command on how to build a reapit cli command",
})
export class ExampleCommand extends AbstractCommand {
  run(
    @Param({
      name: 'param',
      default: 'default value',
    })
    param: string,
  ) {
    console.log(param) // inputted arg or 'default value'
  }
}
```

All commands must use the 