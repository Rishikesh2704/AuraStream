import Image from "next/image";

export default function loading() {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
      <Image src={"/kidzoro.png"} alt="loadingImage" height={150} width={150} />
      <h1>Loading...</h1>
    </div>
  );
}
