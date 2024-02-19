import { prisma } from "@/lib/prisma";
import { registerInputValidator } from "@/validators/register-validator";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("No register found!", { status: 404 });

  try {
    const register = await prisma.register.findUnique({
      where: {
        id: id,
      },
    });
    return Response.json(register);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("Register not exists!", { status: 400 });

  const updatedRegister = await request.json();
  const validator = registerInputValidator.safeParse(updatedRegister);

  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const register = await prisma.register.update({
      where: {
        id: id,
      },
      data: validator.data,
    });
    return Response.json(register);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("Register not exists!", { status: 400 });

  try {
    const register = await prisma.register.delete({
      where: {
        id: id,
      },
    });
    return Response.json(register);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
