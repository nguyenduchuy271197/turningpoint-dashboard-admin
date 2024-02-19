import { prisma } from "@/lib/prisma";
import { registerInputValidator } from "@/validators/register-validator";

export async function GET() {
  try {
    const registers = await prisma.register.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(registers);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  const newRegister = await request.json();
  const validator = registerInputValidator.safeParse(newRegister);
  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const register = await prisma.register.create({
      data: validator.data,
    });
    return Response.json(register);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
