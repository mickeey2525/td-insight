# What is this?

This is *unofficial* Treasure Data insight CLI tool. With this tool, you don't have to call api directory.

## How to install

### Prerequisite

You must install [deno](https://deno.land/manual/getting_started/installation) in advance

### Instal

```bash
deno install --force --name td-insight --allow-read --allow-env --allow-net https://raw.githubusercontent.com/mickeey2525/td-insight/main/command.ts
```


### How to use

you can see how to use this comamnd

```bash
td-insight --help
```

To use this smoothly, I recommend to set TD_API_KEY and TD_API_SERVER environment in advance.
Or you can specify apikey and endpoint like this
```bash
td-insight dm list -e https://api.treasuredata.com -k 12345/abcdefg
```
