import { Command } from "./deps.ts";
import { TDClient } from "./deps.ts";
import type { dataBuildType, dataModelType } from "./deps.ts";

const apikey = Deno.env.get("TD_API_KEY") as string;
const endpoint = Deno.env.get("TD_API_SERVER") as string;

const td = new TDClient(endpoint, apikey);

async function listDatamodels(modelType: dataModelType) {
  const res = await td.getDataModels(modelType);
  return res.json();
}

async function getDatamodel(oid: string) {
  const res = await td.getDataModelWithId(oid);
  return res.json();
}

async function createDataModel(filepath: string) {
  const res = await td.creteDataModel(filepath);
  return res.json();
}

async function deleteDatamodel(oid: string) {
  const res = await td.deleteDataModel(oid);
  return res.json();
}

async function updateDatamodel(oid: string, desc: string) {
  const res = await td.updateDataModel(oid, desc);
  return res.json();
}

async function startBuild(oid: string, buildType: dataBuildType) {
  const res = await td.startDatamodelBuilding(oid, buildType);
  return res.json();
}

async function getBuild(oid: string) {
  const res = await td.getDatamodelBuilding(oid);
  return res.json();
}

async function stopAllBuild(oid: string) {
  const res = await td.stopAllBuilding(oid);
  return res.text();
}

async function stopBuild(dmOid: string, buildOid: string) {
  const res = await td.stopBuild(dmOid, buildOid);
  return res.json();
}

await new Command()
  .name("td-insight")
  .version("0.1.0")
  .description("Commandline tool for Treasure Data Insight")
  .command(
    "dm",
    new Command()
      .description("datamodel related comamnds")
      .command(
        "list",
        new Command()
          .description("list all datamodels")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }
            //console.info(td);
            listDatamodels("elasticube").then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.info(e);
            });
          }),
      )
      .command(
        "get",
        new Command()
          .description("get a datamodel"),
      )
      .option("-k, --key <key:string>", "your apikey")
      .option("-e, --endpoint <endpoint:string>", "your api endpoint")
      .option("-o, --oid <oid:string>", "your datamodel oid")
      .action((options: any) => {
        if (options.key !== undefined) {
          td.apikey = options.key;
        }
        if (options.endpoint !== undefined) {
          td.endpoint = options.endpoint;
        }
        //Logger.info(td);
        getDatamodel(options.oid).then((res) => {
          console.log(JSON.stringify(res));
        }).catch((e) => {
          console.warn(e);
        });
      })
      .command(
        "delete",
        new Command()
          .description("delete a datamodel")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .option("-o, --oid <oid:string>", "datamodel oid")
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }
            //Logger.info(td);
            deleteDatamodel(options.oid).then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.warn(e);
            });
          }),
      )
      .command(
        "create",
        new Command()
          .description("create a datamodel")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .option("-f, --file <oid:string>", "your yaml file")
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }

            createDataModel(options.file).then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.warn(e);
            });
          }),
      )
      .command(
        "update",
        new Command()
          .description("update a datamodel description")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .option("-d, --desc <description:string>", "your  file")
          .option("-o, --oid <oid:string>", "Datamodel oid")
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }
            updateDatamodel(options.oid, options.desc).then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.warn(e);
            });
          }),
      ),
  )
  .command(
    "build",
    new Command()
      .description("build related commands")
      .command(
        "start",
        new Command()
          .description("start build command")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .option(
            "-b, --buildtype <buildtype:string>",
            "buildtype option. It should be full, schema_changes or by_table",
          )
          .option(
            "-o, --oid <oid:string>",
            "Oid of datamodel that you want to start build",
          )
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }
            startBuild(options.oid, options.build_type).then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.warn(e);
            });
          }),
      )
      .command(
        "get",
        new Command()
          .description("get datamodel's building")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .option(
            "-o, --oid <oid:string>",
            "Oid of datamodel that you want to check build status",
          )
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }
            getBuild(options.oid).then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.warn(e);
            });
          }),
      )
      .command(
        "stopall",
        new Command()
          .description("stop datamodel building")
          .option("-k, --key <key:string>", "your apikey")
          .option("-e, --endpoint <endpoint:string>", "your api endpoint")
          .option(
            "-o, --oid <oid:string>",
            "Oid of datamodel that you want to stop all building",
          )
          .action((options: any) => {
            if (options.key !== undefined) {
              td.apikey = options.key;
            }
            if (options.endpoint !== undefined) {
              td.endpoint = options.endpoint;
            }
            stopAllBuild(options.oid).then((res) => {
              console.log(JSON.stringify(res));
            }).catch((e) => {
              console.warn(e);
            });
          }),
      )
        .command(
            "stop",
            new Command()
                .description("stop a specific build")
                .option("-k, --key <key:string>", "your apikey")
                .option("-e, --endpoint <endpoint:string>", "your api endpoint")
                .option(
                    "-do, --dmoid <dmoid:string>",
                    "Oid of datamodel that you want to stop a build",
                )
                .option(
                    "-bo, --boid <boid:string>",
                    "Oid of build that you want to stop"
                )
                .action((options: any) => {
                    if (options.key !== undefined) {
                        td.apikey = options.key;
                    }
                    if (options.endpoint !== undefined) {
                        td.endpoint = options.endpoint;
                    }
                    stopBuild(options.dmoid, options.boid).then((res) => {
                        console.log(JSON.stringify(res));
                    }).catch((e) => {
                        console.warn(e);
                    });
                })
        )
  )
  .parse(Deno.args);
