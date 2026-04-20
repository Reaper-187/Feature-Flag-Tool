import prisma from "../../lib/prisma";
import { FlagData, FlagReqData, FlagUpdateData } from "../../types/types";
import { AppError } from "../../utils/appError.utils";

export async function getFlags() {
  const flags = await prisma.flags.findMany({
    include: {
      flag_environments: {
        include: {
          environments: true, // der letzte include muss immer true sein sonst bekomme ich keine Daten
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
    const environments = await tx.environments.findMany();

    const switchMap = {
      dev: data.devSwitch,
      stage: data.stageSwitch,
      prod: data.prodSwitch,
    };

    const flagEnvironmentData = environments
      .filter((env) => env.name in switchMap)
      .map((env) => ({
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

export async function updateFlag(flag_id: string, data: FlagUpdateData) {
  return await prisma.$transaction(async (tx) => {
    const updatedFlag = await tx.flags.update({
      where: { flag_id: flag_id },
      data: {
        flag_name: data.flag_name,
        flag_rollout: data.flag_rollout,
        description: data?.description,
      },
    });

    const environments = await tx.environments.findMany();

    const switchMap = {
      dev: data.devSwitch,
      stage: data.stageSwitch,
      prod: data.prodSwitch,
    };

    for (const env of environments) {
      if (env.name in switchMap) {
        await tx.flag_environments.upsert({
          where: {
            flag_id_environment_id: {
              flag_id: flag_id,
              environment_id: env.id,
            },
          },
          update: {
            is_enabled: switchMap[env.name as keyof typeof switchMap],
          },
          create: {
            flag_id: flag_id,
            environment_id: env.id,
            is_enabled: switchMap[env.name as keyof typeof switchMap],
          },
        });
      }
    }

    return updatedFlag;
  });
}

export async function deleteFlag(flag_id: string) {
  if (!flag_id || typeof flag_id !== "string" || flag_id.trim().length === 0) {
    throw new AppError("INVALID FLAG-ID", 400);
  }

  try {
    const deletedFlag = await prisma.flags.delete({
      where: { flag_id },
    });

    return deletedFlag;
  } catch (error: any) {
    throw new AppError("Forbidden for this Role", 401);
  }
}
