// "use client";

// import { ProductsImage } from "@/types/products";
// import Image from "next/image";
// import { FC, useState } from "react";

// interface Props {
//   image: ProductsImage;
//   fill?: boolean;
// }

// import "./style.scss";

// const CustomImage: FC<Props> = ({ image, fill }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <>
//       {fill ? (
//         <Image
//           src={`${image?.url}`}
//           alt={`sadf`}
//           fill
//           className={`custom-image ${isLoading ? "loading" : ""}`}
//           onLoadingComplete={() => setIsLoading(false)}
//         />
//       ) : (
//         <Image
//           src={`${image?.url}`}
//           alt={`sd`}
//           width={80}
//           height={1000}
//           className={`custom-image ${isLoading ? "loading" : ""}`}
//         />
//       )}
//     </>
//   );
// };

// export default CustomImage;
