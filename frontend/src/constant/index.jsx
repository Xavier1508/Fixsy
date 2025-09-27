import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";
import { HiOutlineChatAlt2, HiShieldCheck, HiClock, HiUsers, HiStar } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";

import user1 from "../assets/images/profile-pictures/user1.jpg";
import user2 from "../assets/images/profile-pictures/user2.jpg";
import user3 from "../assets/images/profile-pictures/user3.jpg";
import user4 from "../assets/images/profile-pictures/user4.jpg";
import user5 from "../assets/images/profile-pictures/user5.jpg";
import user6 from "../assets/images/profile-pictures/user6.jpg";

export const navItems = [
  { label: "How it works", href: "#"},
  { label: "Services", href: "#"},
  { label: "Help", href: "#"},
  { label: "Parters", href: "#",
    submenu: [
      { label: "Publisher", href: "#" },
      { label: "Public Agencies", href: "#" },
    ]
   },
  { label: "Businesses", href: "#",
    submenu: [
      { label: "Small Businesses", href: "#" },
      { label: "Brands & Agencies", href: "#" },
    ]
   },
];

export const services = [
    { icon: '🔧', title: 'Home Repairs' },
    { icon: '🐾', title: 'Pet Care' },
    { icon: '🛒', title: 'Errands & Delivery' },
    { icon: '🌿', title: 'Lawn & Garden' },
    { icon: '🚗', title: 'Transportation' },
    { icon: '👶', title: 'Childcare' },
    { icon: '🏠', title: 'House Sitting' },
    { icon: '💻', title: 'Tech Support' },
];

export const features = [
  {
    icon: <HiShieldCheck />,
    title: 'Verified & Trusted',
    description: 'All helpers are background-checked and verified by our community.'
  },
  {
    icon: <HiClock />,
    title: 'Quick Response',
    description: 'Get connected with available neighbors in minutes, not days.'
  },
  {
    icon: <HiUsers />,
    title: 'Local Community',
    description: 'Work with neighbors in your immediate area who understand your community.'
  },
  {
    icon: <HiStar />,
    title: 'Quality Guaranteed',
    description: 'Rate and review every interaction. Our rating system ensures you get excellent service.'
  },
  {
    icon: <MdAttachMoney />,
    title: 'Fair Pricing',
    description: 'Transparent, competitive rates set by helpers themselves.'
  },
  {
    icon: <HiOutlineChatAlt2 />,
    title: 'Easy Communication',
    description: 'Built-in messaging system keeps all communication secure.'
  },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
