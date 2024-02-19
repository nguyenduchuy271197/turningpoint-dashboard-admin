import { prisma } from "@/lib/prisma";
import { speakerInputValidator } from "@/validators/speaker-validator";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("No speaker found!", { status: 404 });

  try {
    const speaker = await prisma.speaker.findUnique({
      where: {
        id: id,
      },
    });
    return Response.json(speaker);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("Speaker not exists!", { status: 400 });

  const updatedSpeaker = await request.json();
  const validator = speakerInputValidator.safeParse(updatedSpeaker);

  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const speaker = await prisma.speaker.update({
      where: {
        id: id,
      },
      data: validator.data,
    });
    return Response.json(speaker);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("Speaker not exists!", { status: 400 });

  try {
    const speaker = await prisma.speaker.delete({
      where: {
        id: id,
      },
    });
    return Response.json(speaker);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
