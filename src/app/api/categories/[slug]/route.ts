import { prisma } from "@/lib/prisma";
import { categoryInputValidator } from "@/validators/category-validator";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug) return Response.json("No category found!", { status: 404 });

  try {
    const category = await prisma.category.findUnique({
      where: {
        slug: params.slug,
      },
    });
    return Response.json(category);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const updatedCategory = await request.json();
  const validator = categoryInputValidator.safeParse(updatedCategory);

  if (!params.slug)
    return Response.json("Category not exists!", { status: 400 });

  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const category = await prisma.category.update({
      where: {
        slug: params.slug,
      },
      data: validator.data,
    });
    return Response.json(category);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!params.slug)
    return Response.json("Category not exists!", { status: 400 });

  try {
    const category = await prisma.category.delete({
      where: {
        slug: params.slug,
      },
    });
    return Response.json(category);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
