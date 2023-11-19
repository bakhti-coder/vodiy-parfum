import React from "react";
import { Container } from "@mui/material";
import TextAnimation from "@/components/animation/text-animation";
import PageTransitionProvider from "@/components/animation/page-transition";

const AboutPage = () => {
  return (
      <PageTransitionProvider>
        <section>
          <Container maxWidth="xl">
            <div className="container max-w-1200 py-20">
              <TextAnimation>
                <h1 className="text-center font-semibold text-3xl text-gray-950">
                  WWW.VODIY-PARFUM.UZ
                </h1>
                <p className="text-center">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
                  nam eum quam eius quaerat aspernatur accusantium. Commodi magnam
                  officia animi sapiente esse distinctio nemo, deserunt blanditiis
                  cumque. Animi ex vitae debitis perferendis accusamus assumenda
                  corrupti. Quod eius deleniti fugit. Perferendis exercitationem
                  dignissimos reprehenderit ut molestias nesciunt facilis, itaque
                  praesentium aspernatur laudantium minus repellendus obcaecati
                  nostrum magni incidunt pariatur id architecto consequuntur
                  blanditiis amet totam, explicabo corporis. Nemo debitis sunt omnis
                  velit! Asperiores vel sunt nulla ea consequuntur culpa numquam
                  fugiat. Exercitationem neque voluptatum eaque harum mollitia
                  aspernatur nemo qui dolorum, repellat numquam sint id illo, in
                  velit unde obcaecati amet.
                </p>
              </TextAnimation>
            </div>
          </Container>
        </section>
      </PageTransitionProvider>
  );
};

export default AboutPage;
