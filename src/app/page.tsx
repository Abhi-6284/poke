import StarBorder from "@/components/ui/StarBorder";
import TextPressure from "@/components/ui/textp";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <Image src="/bg.png" alt="Pika Wallpaper" fill className="object-cover" />
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full mx-auto md:w-1/2 gap-10">
        <TextPressure
          text="Welcome to Pokemon World"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />

        <StarBorder
          as="a"
          className="custom-class"
          color="cyan"
          speed="5s"
          href="/pokemon"
        >
          Enter the Pokemon World
        </StarBorder>
      </div>
    </div>
  );
}
