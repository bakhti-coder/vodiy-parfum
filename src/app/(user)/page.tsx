import ProductCard from "@/components/card/ProductCard";
import CategoryList from "@/components/lists/CategoryList";
import Title from "@/components/shares/Title";
import request from "@/server";
import { Products } from "@/types/products";
import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getProducts() {
  const { data } = await request.get<Products[]>("last-products");

  return data;
}

const HomePage = async () => {
  const data: Products[] = await getProducts();

  return (
    <main>
      <section>
        <div className="parallax"></div>
      </section>
      <section className="bg-[#F3F1EC] py-20">
        <Container maxWidth="xl">
          <div className="my-5">
            <Title>Bizning xizmatlar</Title>
          </div>
          <div className="grid mx-5 xl:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {React.Children.toArray(
              [
                {
                  imageUrl: "/images/support/raketa.svg",
                  title: "Tez Start Oling",
                  subTitle: "Ishlab chiqarish uchun eng ma'qul narx va sifat",
                },
                {
                  imageUrl: "/images/support/cards_svg_2.svg",
                  title: "Ko'plab mahsulotlar",
                  subTitle: "1000ga yaqin judayam ko'p mahsulotlar",
                },
                {
                  imageUrl: "/images/support/cards_svg_3.svg",
                  title: "Ko'pchilik Tanlovi",
                  subTitle: "Haridorlarimizga ma'qul sifat va tanlov ",
                },
                {
                  imageUrl: "/images/support/cards_svg_4.svg",
                  title: "Qulay To'lov",
                  subTitle:
                    "Siz o'zingizga qulay bo'lgan to'lov turini tanlashingiz mumkim",
                },
                {
                  imageUrl: "/images/support/cards_svg_5.svg",
                  title: "Oson Xarid",
                  subTitle:
                    "Mahsulotlarimizni bizning saytdan oson xarid qiling",
                },
                {
                  imageUrl: "/images/support/cards_svg_6.svg",
                  title: "Tizimli Boshqaruv",
                  subTitle:
                    "Buyurtmalarni tizimli boshqarish va kamchiliklarga yo'l qo'ymaslik",
                },
              ].map((item, key) => (
                <div
                  data-aos="zoom-in"
                  data-aos-delay={key * 100}
                  className="p-5 bg-white border border-light cursor-pointer rounded-lg h-full"
                >
                  <Image src={item.imageUrl} width={60} height={60} alt="img" />
                  <h5 className="mb-2 mt-5 text-lg font-bold  text-gray-900">
                    {item.title}
                  </h5>
                  <p className="mb-1 text-sm font-normal text-gray-500">
                    {item.subTitle}
                  </p>
                </div>
              ))
            )}
          </div>
        </Container>
      </section>
      <section>
        <Container maxWidth="xl">
          <div className="flex justify-between items-center">
            <Title>Oxirgi mahsulotlar</Title>
            <Link
              href="/products"
              className="md:block hidden text-sm text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-5 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Barcha mahsulotlar
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data
              .filter((el) => el?.quantity !== 0)
              .slice(0, 10)
              .map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
          </div>
        </Container>
      </section>
      <section className="category_section">
        <Container maxWidth="xl">
          <Title>Categoriyalar</Title>
          <CategoryList />
        </Container>
      </section>
      <section className="bg-[#F3F1EC] py-24">
        <Container maxWidth="xl">
          <div className="flex justify-around items-center flex-wrap md:flex-nowrap ">
            {React.Children.toArray(
              [
                {
                  imageUrl: "/images/svg/Services.svg",
                  title: "TEZ YETKAZIB BERISH",
                  description: "O'zbekiston bo'ylab tez yetkazib berish",
                },
                {
                  imageUrl: "/images/svg/24.7.svg",
                  title: "Mijozlarni qo'llab-quvvatlash",
                  description: "24/7 mijozlarni qo'llab-quvvatlash",
                },
                {
                  imageUrl: "/images/svg/togritanlov.svg",
                  title: "QULAY TO'LOV",
                  description: "O'zingizga qulay bo'lgan to'lovdan foydalaning",
                },
              ].map((item, key) => (
                <div
                  data-aos="fade-down"
                  data-aos-delay={key * 100}
                  className="text-center mt-10 md:mt-0"
                >
                  <Image
                    src={item.imageUrl}
                    height={80}
                    width={80}
                    alt="alo"
                    className="mx-auto"
                  />
                  <h1 className="mt-6 text-black font-[600] text-[20px]">
                    {item.title}
                  </h1>
                  <p className="text-[14px]">{item.description}</p>
                </div>
              ))
            )}
            {/* <div data-aos="fade-down" className="text-center mt-10 md:mt-0">
                <Image
                  src="/image/svg/24.7.svg"
                  height={80}
                  width={80}
                  alt="alo"
                  className="mx-auto"
                />
                <h1 className="mt-6 text-black font-[600] text-[20px]">{`Mijozlarni qo'llab-quvvatlash`}</h1>
                <p className="text-[14px]">{`24/7 mijozlarni qo'llab-quvvatlash`}</p>
              </div>
              <div data-aos="fade-down" className="text-center mt-16 md:mt-0">
                <Image
                  src="/source/image/svg/togritanlov.svg"
                  height={80}
                  width={80}
                  alt="alo"
                  className="mx-auto"
                />
                <h1 className="mt-6 text-black font-[600] text-[20px]">{`QULAY TO'LOV`}</h1>
                <p className="text-[14px]">{`O'zingizga qulay bo'lgan to'lovdan foydalaning`}</p>
              </div> */}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default HomePage;
