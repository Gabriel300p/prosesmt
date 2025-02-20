import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center items-center bg-primary">
      <Image src={Logo} alt="Logo" />
    </header>
  );
}
