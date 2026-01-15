import Image from "next/image";

export default function ZebiLogo() {
  return (
    <Image 
      src="/zebi-logo.svg" 
      alt="제비 로고"
      width={48} 
      height={48} />
  );
}