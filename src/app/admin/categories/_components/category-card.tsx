import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ title, slug }: Category) {
  return (
    <Link
      href={`/admin/categories/${slug}/update`}
      className="group relative block bg-primary aspect-square rounded-md overflow-hidden"
    >
      <Image
        alt="Developer"
        src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fHww"
        fill
        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity group-hover:opacity-30"
      />
      <div className="relative p-4 sm:p-6 lg:p-8 h-full w-full grid place-items-center">
        <p className="text-xl font-bold text-primary-foreground sm:text-2xl text-center">
          {title}
        </p>
      </div>
    </Link>
  );
}
