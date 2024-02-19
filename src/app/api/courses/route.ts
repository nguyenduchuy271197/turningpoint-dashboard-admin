import { prisma } from "@/lib/prisma";
import { courseInputValidator } from "@/validators/course-validator";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        category: true,
        speaker: true,
      },
      orderBy: {
        categoryId: "asc",
      },
    });
    return Response.json(courses);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  const newSpeaker = await request.json();
  const validator = courseInputValidator.safeParse(newSpeaker);
  if (!validator.success) {
    const { path, message } = validator.error.errors[0];
    const field = path[0];
    const error = `Field '${field}': ${message}`;
    return Response.json(error, { status: 400 });
  }

  try {
    const course = await prisma.course.create({
      data: validator.data,
    });
    return Response.json(course);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
