import { prisma } from "@/lib/prisma";
import { speakerInputValidator } from "@/validators/speaker-validator";

export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
      orderBy: {
        categoryId: "asc",
      },
    });
    return Response.json(speakers);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  const newSpeaker = await request.json();
  const validator = speakerInputValidator.safeParse(newSpeaker);
  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const speaker = await prisma.speaker.create({
      data: validator.data,
    });
    return Response.json(speaker);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
