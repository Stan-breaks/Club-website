"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Menu, ChevronRight } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your Firebase configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SubmitStatus {
  type: string;
  message: string;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("Mission");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "",
    message: "",
  });

  const getTabContent = (tab: string): string => {
    const content = {
      Mission:
        "To create an innovative tech community that empowers students to explore, learn, and excel in various domains of information technology while fostering creativity and professional growth.",
      Motto: "Innovate • Create • Transform",
      Vision:
        "To be a premier technology hub that shapes future IT leaders and innovators through practical learning, industry collaboration, and cutting-edge project experiences.",
      Goals:
        "• Develop practical skills in programming, web development, and emerging technologies\n• Host monthly tech workshops and learning sessions\n• Create real-world projects that solve community challenges\n• Build strong industry partnerships for internships and mentorship\n• Organize annual tech showcase and hackathon events\n• Support members in achieving professional certifications",
    };
    return content[tab as keyof typeof content] || "";
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const dataToSubmit = {
        ...formData,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "contacts"), dataToSubmit);

      setSubmitStatus({
        type: "success",
        message: "Thank you for your interest! We will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "There was an error submitting your message. Please try again.",
      });
      console.error("Error submitting form: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap");
        body {
          font-family: "Orbitron", sans-serif;
        }
      `}</style>

      <header className="flex justify-between items-center p-4">
        <Menu className="w-6 h-6" />
        <div className="text-sm">AFRICA NAZARENE UNIVERSITY</div>
        <button className="px-4 py-1 text-sm border border-white rounded">
          Contact
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-xs mb-2">TECHNOLOGY CLUB</div>
          <h1 className="text-6xl font-bold mb-4">
            CYBER<span className="text-red-500">RENE</span>
          </h1>
          <p className="text-sm mb-4">"WHERE INNOVATION MEETS EXCELLENCE"</p>
          <button className="px-6 py-2 text-sm border border-white rounded">
            EXPLORE
          </button>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {["Mission", "Motto", "Vision", "Goals"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-xs ${activeTab === tab ? "bg-gray-800" : "bg-gray-900"} rounded`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <p className="text-xs whitespace-pre-line">
              {getTabContent(activeTab)}
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs">Club Resources</div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6">EVENTS</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">TechVerse Hackathon 2024</h3>
                <span className="px-2 py-1 bg-green-500 text-black text-xs rounded">
                  Active
                </span>
              </div>
              <p className="text-sm mb-2">Innovation for Community Impact</p>
              <p className="text-xs mb-4">
                Join our annual hackathon where teams compete to develop
                innovative solutions for local community challenges. This year's
                focus areas include education technology, healthcare solutions,
                and environmental sustainability. Work with mentors from leading
                tech companies and showcase your ideas to industry experts.
              </p>
              <p className="text-xs text-gray-400">
                Date: 15th to 17th November 2024
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Web Development Bootcamp</h3>
                <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded">
                  Upcoming
                </span>
              </div>
              <p className="text-sm mb-2">Modern Full-Stack Development</p>
              <p className="text-xs mb-4">
                A comprehensive 4-week bootcamp covering HTML5, CSS3,
                JavaScript, React, and Node.js. Learn through hands-on projects
                and build your portfolio with guidance from experienced
                developers. Perfect for beginners and intermediate developers
                looking to upgrade their skills.
              </p>
              <p className="text-xs text-gray-400">Starting: December 2024</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-6">JOIN OUR COMMUNITY</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm mb-4">
                Be part of a dynamic community where technology enthusiasts come
                together to learn, create, and grow. Our club offers:
              </p>
              <ul className="text-sm space-y-2 mb-4">
                <li>• Hands-on workshops in various programming languages</li>
                <li>• Web and mobile app development projects</li>
                <li>• UI/UX design sessions</li>
                <li>• Cloud computing and DevOps training</li>
                <li>
                  • Artificial Intelligence and Machine Learning exploration
                </li>
                <li>• Networking opportunities with industry professionals</li>
                <li>• Access to learning resources and tutorials</li>
                <li>• Career guidance and internship opportunities</li>
              </ul>
              <p className="text-sm">
                Whether you're a complete beginner or an experienced developer,
                TechVerse provides the perfect environment to enhance your
                skills and build your tech career.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Get Started</h3>
              <div className="space-y-4">
                {submitStatus.message && (
                  <div
                    className={`p-3 rounded ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 text-green-200"
                        : "bg-red-500/20 text-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full bg-gray-800 p-2 rounded text-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="w-full bg-gray-800 p-2 rounded text-sm"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full bg-gray-800 p-2 rounded text-sm"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your interests in technology"
                  className="w-full bg-gray-800 p-2 rounded text-sm h-32"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded text-sm font-bold ${
                    isSubmitting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Join Now"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
