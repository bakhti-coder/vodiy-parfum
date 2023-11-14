import { Products } from "@/types/products";
import Image from "next/image";

const SingleCard = ({data}: any) => {
  return (
    <div className="flex justify-start flex-wrap md:flex-nowrap ">
          <div data-aos="fade-up" className="max-w-[600px]">
            <Image src={data.image?.url} width={1200} height={500} alt="img" />
          </div>
          <div className="md:pt-0 pt-5 ml-0 md:ml-20 w-full">
            <h1 className="text-[24px] font-bold">{data.title}</h1>

            <p className="mt-3 font-medium text-[24px]">
              <span className="font-bold text-[26px]">Narxi:</span> {data.price}
              {` so'm`}
            </p>

            <p className="mt-5 text-sm">{data.description}</p>

            <hr className="h-px my-8 bg-line border-0" />
            <button className="text-white bg-orange hover:shadow-xl max-w-full w-1/2 font-medium rounded-lg text-sm px-4 py-2.5 text-center ">
              Buyurtma berish
            </button>
          </div>
        </div>
  )
}

export default SingleCard