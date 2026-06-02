import { redirect } from "next/navigation";

export default function RootPage() {
  // ইউজার মেইন ডোমেইনে ('/') আসলেই নেক্সট জেএস তাকে সুন্দরভাবে '/home' এ রিডাইরেক্ট করে দেবে
  redirect("/home"); 
}