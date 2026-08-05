import mongoose from "mongoose";
import User from "./lib/models/User.js";
import Posts from "./lib/models/Posts.js";
import Comment from "./lib/models/comment.js";
import Likes from "./lib/models/likes.js";
import Payment from "./lib/models/payment.js";
import Notification from "./lib/models/notification.js";
import { nanoid } from 'nanoid';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const indianUsersData = [
  { name: "Aarav Sharma", username: "aarav_sharma", email: "aarav@example.com", gender: "male", ProfilePic: "https://randomuser.me/api/portraits/men/11.jpg", uID: nanoid(10) },
  { name: "Priya Patel", username: "priya_patel", email: "priya@example.com", gender: "female", ProfilePic: "https://randomuser.me/api/portraits/women/12.jpg", uID: nanoid(10) },
  { name: "Rohan Gupta", username: "rohan_gupta", email: "rohan@example.com", gender: "male", ProfilePic: "https://randomuser.me/api/portraits/men/13.jpg", uID: nanoid(10) },
  { name: "Neha Singh", username: "neha_singh", email: "neha@example.com", gender: "female", ProfilePic: "https://randomuser.me/api/portraits/women/14.jpg", uID: nanoid(10) },
  { name: "Vikram Mehta", username: "vikram_mehta", email: "vikram@example.com", gender: "male", ProfilePic: "https://randomuser.me/api/portraits/men/15.jpg", uID: nanoid(10) },
  { name: "Aditi Rao", username: "aditi_rao", email: "aditi@example.com", gender: "female", ProfilePic: "https://randomuser.me/api/portraits/women/16.jpg", uID: nanoid(10) },
  { name: "Karan Johar", username: "karan_johar", email: "karan@example.com", gender: "male", ProfilePic: "https://randomuser.me/api/portraits/men/17.jpg", uID: nanoid(10) },
  { name: "Sneha Reddy", username: "sneha_reddy", email: "sneha@example.com", gender: "female", ProfilePic: "https://randomuser.me/api/portraits/women/18.jpg", uID: nanoid(10) },
  { name: "Amit Desai", username: "amit_desai", email: "amit@example.com", gender: "male", ProfilePic: "https://randomuser.me/api/portraits/men/19.jpg", uID: nanoid(10) },
  { name: "Pooja Joshi", username: "pooja_joshi", email: "pooja@example.com", gender: "female", ProfilePic: "https://randomuser.me/api/portraits/women/20.jpg", uID: nanoid(10) }
];

const postContents = [
  "Just published a new coding tutorial on YouTube! Check it out.",
  "Working on a new exciting open source project.",
  "Loving the new Next.js 14 features, so fast and clean!",
  "Can someone recommend a good UI library for React?",
  "Coffee is the fuel for my coding sessions. ☕",
  "Just reached 1000 followers! Thanks for the support.",
  "Here's a sneak peek of the new UI I've been designing.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "Had a great time at the tech meetup today.",
  "Building products in public is scary but rewarding."
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    console.log("Creating Indian users...");
    const createdUsers = [];
    for (const data of indianUsersData) {
      let user = await User.findOne({ username: data.username });
      if (!user) {
        user = await User.create(data);
      }
      createdUsers.push(user);
    }
    console.log(`Ensured ${createdUsers.length} fake Indian users exist.`);

    console.log("Generating posts, comments, likes, and payments...");
    // Let's create some interactions
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const otherUser = createdUsers[(i + 1) % createdUsers.length];
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];

      // 1. Create a Post
      const post = await Posts.create({
        author: user._id,
        content: postContents[i % postContents.length],
        likesCount: 0,
        commentCount: 0,
      });

      // 2. Add a Like to the Post from another user
      await Likes.create({ user: otherUser._id, post: post._id });
      post.likesCount += 1;
      
      // 3. Add a Comment to the Post
      const comment = await Comment.create({
        post: post._id,
        author: randomUser._id,
        content: "Awesome post! Keep it up. 👍",
      });
      post.commentCount += 1;
      await post.save();

      // Update author's post count
      user.postCount += 1;
      await user.save();

      // 4. Follow another user
      if (!user.following.includes(otherUser._id)) {
        user.following.push(otherUser._id);
        otherUser.followers.push(user._id);
        await user.save();
        await otherUser.save();
      }

      // 5. Create a Payment (Chai)
      await Payment.create({
        name: otherUser.name,
        from_user: otherUser.username,
        from_user_email: otherUser.email,
        to_user: user.username,
        to_user_email: user.email,
        amount: "5000", // e.g. 50 INR in paise, or just amount string
        message: "Here is a chai for your great work!",
        Oid: "order_" + nanoid(10),
        done: true,
      });
      user.balance += 50;
      await user.save();

      // 6. Create Notifications
      await Notification.create({
        to: user._id,
        from: otherUser._id,
        type: "payment",
        amount: 50,
      });
      
      await Notification.create({
        to: user._id,
        from: otherUser._id,
        type: "like",
        post: post._id,
      });

      await Notification.create({
        to: user._id,
        from: randomUser._id,
        type: "comment",
        post: post._id,
      });
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seed();
