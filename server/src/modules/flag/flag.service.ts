import prisma from "../../lib/prisma";
interface CreateFlagInput {
  flagName: string;
  flagKeyName: string;
  description?: string;
  flagRollout: number;
  createdBy: string;
  devSwitch: boolean;
  stageSwitch: boolean;
  prodSwitch: boolean;
}

export async function createFlag(data: CreateFlagInput) {
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
