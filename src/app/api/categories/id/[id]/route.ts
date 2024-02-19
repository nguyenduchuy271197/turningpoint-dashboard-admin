import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (!id) return Response.json("No category found!", { status: 404 });

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return Response.json(category);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
