import React from "react";

export const metadata = {
  title: "About | Get Me A Chai",
  description: "About us, who we are!",
};

const about = () => {
  return (
    <div className="flex flex-col justify-center py-15 items-center">
      <div className="wrapper flex flex-col gap-16 w-5/6 sm:w-3/4 lg:w-2/5">
        <div className="title flex flex-col gap-8.5 items-center justify-center">
          <h1 className="font-dancing text-center text-5xl sm:text-6xl font-bold">
            Hi I'm Nitin,
          </h1>
          <h2 className="text-center text-lg lg:text-xl lg:font-lato font-medium lg:font-bold lg:leading-relaxed lg:tracking-wide">
            I am a Full Stack Developer, and my goal was to build a scalable and secure creator platform similar to “Get Me a Coffee.”
          </h2>
        </div>

        <div className="story flex flex-col gap-7.5">
          <h2 className="text-[1.1rem] font-lato tracking-wider">
            <span
              style={{ lineHeight: "0.8" }}
              className="text-6xl mt-1 font-serif leading-none font-medium float-left mr-2 block "
            >
              W
            </span>{" "}
            hen I started building #GetMeAChai, my goal was simple: to build a scalable, secure, and performance-focused web application. I’m Nitin Dogra, a Full Stack Developer skilled in the MERN stack, Next.js, and modern cloud deployment. Having already built comprehensive SaaS products like LogoCraft and SalesNova with JWT auth, Razorpay integrations, and robust MongoDB architectures, I wanted to apply my practical product thinking to a creator platform.
            <br /> <br />
            Before #GetMeAChai, I spent time mastering the intricacies of building real-world applications—from crafting responsive React and Tailwind UI dashboards to optimizing backend API response times. Each of my previous projects pushed me to write cleaner code and design better databases. #GetMeAChai is an extension of that passion. It was an opportunity to combine everything I had learned into one place and build something from scratch that creators can genuinely use to engage with their communities.
            <br /> <br />
            For me, #GetMeAChai represents another milestone in my development journey. It reflects my dedication to full-stack engineering, from the user-facing design system to the REST APIs and database models powering the platform behind the scenes. And this is only the beginning—I’m continuously working on new ideas, improving my skills, and building impactful web applications that solve real problems.
          </h2>

          <h1 className="font-dancing text-5xl sm:text-6xl font-normal opacity-75">
            Nitin Dogra
          </h1>

          <div className="features pt-14 flex flex-col gap-2.5">
            <h1 className=" text-zinc-600">Packed with</h1>
            <div className="feature-pics">
              <object className="h-8" data="/icons/razorpay.svg"></object>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
