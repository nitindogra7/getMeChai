"use client"
import React from 'react'
import Image from 'next/image'

const reviews = ({animation}) => {
 const reviews = [
  {name: "Priya Patel", username: "@PriyaCodes", profilePic: "https://randomuser.me/api/portraits/women/12.jpg", postLink: "#",  title: "Absolutely in love with the new design! The glassmorphism and the warm chai gradient are stunning. This is easily the best platform for creators in India. ☕💛 #GetMeAChai"},
  {name: "Rohan Gupta", username: "@rohan_dev", profilePic: "https://randomuser.me/api/portraits/men/13.jpg", postLink: "#", title: "I've been using this to fund my open source work and the community has been so supportive. The UI is incredibly smooth and the new feed is so addicting! 🚀🔥"},
  {name: "Neha Singh", username: "@NehaDesigns", profilePic: "https://randomuser.me/api/portraits/women/14.jpg", postLink: "#", title: "Just received my first 10 Chais! This platform really helps artists like me stay motivated. The UX is fantastic and setting up my profile took less than a minute. Highly recommend to all creators! ✨🎨"},
  {name: "Vikram Mehta", username: "@vikram_tech", profilePic: "https://randomuser.me/api/portraits/men/15.jpg", postLink: "#", title: "A fantastic alternative to existing creator funding sites, beautifully tailored for the Indian audience. Really proud to see such high-quality products being built! 👏🏼"},
  {name: "Aisha Khan", username: "@AishaDesigns", profilePic: "https://randomuser.me/api/portraits/women/22.jpg", postLink: "#", title: "The community engagement here is unmatched. It feels great to be supported by people who genuinely care about the content you create. Highly recommend!"},
  {name: "Rahul Verma", username: "@RahulV", profilePic: "https://randomuser.me/api/portraits/men/25.jpg", postLink: "#", title: "Been looking for something exactly like this! As a musician, the ability to get small 'chais' from my fans keeps me going. The platform is super sleek."}
]

  return (
    <div className="twitter-reviews flex flex-col gap-8">
          <h1
            ref={animation.ref}
            style={animation.style}
            className={`flex ${animation.className} gap-2 text-2xl font-bold items-center`}
          >
            <img className="w-6 pt-1" src="/icons/twitter.svg"></img>Twitter
          </h1>

          <div
            ref={animation.ref}
            style={animation.style}
            className={`grid ${animation.className} md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4`}
          >
            {reviews.map((data, i)=> {
           return (<a key={i}
              href={data.postLink}
              target="_blank"
            >
              <div className="review-card">
                <div className="review-profile">
                  <Image
                  width={"46"}
                  height={"46"}
                    className="review-profile-img"
                    src={data.profilePic}
                    alt='profile-img'
                  />
                  <div className="profile-id flex justify-center flex-col">
                    <p className="profile-id-name">{data.name}</p>
                    <p className="profile-id-username">{data.username}</p>
                  </div>
                </div>
                <p className="review-card-post">
                  {data.title}
                </p>
              </div>
            </a>)
            })}

           

            

           
          </div>
        </div>
  )
}

export default reviews
