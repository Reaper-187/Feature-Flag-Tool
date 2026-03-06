import prisma from "../../lib/prisma";
import { FlagData, FlagReqData } from "../../types/types";

export async function getFlags() {
  const flags = await prisma.flags.findMany({
    include: {
      flag_environments: {
        include: {
          environments: true,
        },
      },
    },
  });

  return flags.map((flag) => {
    const dev = flag.flag_environments.find(
      (env) => env.environments.name === "dev",
    );

    const stage = flag.flag_environments.find(
      (env) => env.environments.name === "stage",
    );

    const prod = flag.flag_environments.find(
      (env) => env.environments.name === "prod",
    );

    return {
      flagId: flag.flag_id,
      flagName: flag.flag_name,
      flagKeyName: flag.flag_key_name,
      flagRollout: flag.flag_rollout,
      description: flag.description ?? "",
      createdBy: flag.created_by,
      createdDate: flag.created_date.getTime(),

      // switches aus der relation ableiten
      devSwitch: dev?.is_enabled ?? false,
      stageSwitch: stage?.is_enabled ?? false,
      prodSwitch: prod?.is_enabled ?? false,
    };
  });
}

export async function createFlag(data: FlagReqData) {
  // $transaction sorgt dafür das mehrere DB handlungen als eine Einheit ausgeführt werden
  // Wenn ein Schritt fehlschlägt, wird ALLES zurückgesetzt
  return await prisma.$transaction(async (tx) => {
    const newFlag = await tx.flags.create({
      data: {
        flag_name: data.flagName,
        flag_key_name: data.flagKeyName,
        description: data.description,
        flag_rollout: data.flagRollout,
        created_by: data.createdBy,
      },
    });

    const environments = await tx.environments.findMany({
      where: {
        name: {
          in: ["dev", "stage", "prod"],
        },
      },
    });

    if (environments.length !== 3) {
      throw new Error("Required environments (dev, stage, prod) not found");
    }

    const switchMap = {
      dev: data.devSwitch,
      stage: data.stageSwitch,
      prod: data.prodSwitch,
    };

    const flagEnvironmentData = environments.map((env) => ({
      flag_id: newFlag.flag_id,
      environment_id: env.id,
      is_enabled: switchMap[env.name as keyof typeof switchMap],
    }));

    await tx.flag_environments.createMany({
      data: flagEnvironmentData,
    });
    return newFlag;
  });
}
