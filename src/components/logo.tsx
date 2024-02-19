import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.webp"
        alt="Turning Point"
        className="h-12 w-auto"
        height={170}
        width={640}
        priority
      />
    </Link>
  );
}
