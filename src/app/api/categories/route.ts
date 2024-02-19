import { prisma } from "@/lib/prisma";
import { categoryInputValidator } from "@/validators/category-validator";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return Response.json(categories);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  const newCategory = await request.json();
  const validator = categoryInputValidator.safeParse(newCategory);
  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const category = await prisma.category.create({
      data: validator.data,
    });
    return Response.json(category);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
