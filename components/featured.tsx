import React from "react";
import { TravelCard } from "./ui/travel-card";
import { Trophy, Bug, Gamepad2, Palette, Image, Music } from "lucide-react";

const FeaturedEvents = () => {
    const events = [
        {
            id: 1,
            title: "Treasure Hunt",
            location: "Campus Grounds",
            overview: "An exciting adventure where participants solve clues and riddles to find hidden treasures across the campus. Test your problem-solving skills and teamwork!",
            price: 50,
            pricePeriod: "per team",
            imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop&crop=center",
            imageAlt: "Treasure Hunt Adventure",
            logo: <Trophy className="h-6 w-6 text-yellow-400" />,
            onBookNow: () => console.log("Book Treasure Hunt")
        },
        {
            id: 2,
            title: "Code Debugging",
            location: "Computer Lab",
            overview: "A competitive coding challenge where participants race against time to debug complex code snippets. Perfect for aspiring developers!",
            price: 25,
            pricePeriod: "per person",
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop&crop=center",
            imageAlt: "Code Debugging Challenge",
            logo: <Bug className="h-6 w-6 text-green-400" />,
            onBookNow: () => console.log("Book Code Debugging")
        },
        {
            id: 3,
            title: "E-football",
            location: "Gaming Arena",
            overview: "Compete in the ultimate virtual football tournament. Show off your gaming skills and compete for the championship title!",
            price: 30,
            pricePeriod: "per player",
            imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop&crop=center",
            imageAlt: "E-football Tournament",
            logo: <Gamepad2 className="h-6 w-6 text-blue-400" />,
            onBookNow: () => console.log("Book E-football")
        },
        {
            id: 4,
            title: "Web Designing",
            location: "Design Studio",
            overview: "Create stunning websites and user interfaces in this creative competition. Showcase your design skills and technical expertise!",
            price: 40,
            pricePeriod: "per team",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
            imageAlt: "Web Designing Competition",
            logo: <Palette className="h-6 w-6 text-purple-400" />,
            onBookNow: () => console.log("Book Web Designing")
        },
        {
            id: 5,
            title: "Prompting (Image Generation)",
            location: "AI Lab",
            overview: "Master the art of AI prompt engineering! Create amazing images using AI tools and compete for the best creative prompts.",
            price: 20,
            pricePeriod: "per person",
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
            imageAlt: "AI Image Generation Workshop",
            logo: <Image className="h-6 w-6 text-pink-400" />,
            onBookNow: () => console.log("Book Prompting")
        },
        {
            id: 6,
            title: "Spot Dance",
            location: "Dance Studio",
            overview: "Show off your dance moves in this freestyle competition! Impress the judges with your creativity and rhythm on the dance floor.",
            price: 35,
            pricePeriod: "per participant",
            imageUrl: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=500&h=300&fit=crop&crop=center",
            imageAlt: "Spot Dance Competition",
            logo: <Music className="h-6 w-6 text-red-400" />,
            onBookNow: () => console.log("Book Spot Dance")
        }
    ];

    return (
        <section className="py-34 px-4">
            <div className="max-w-7xl mx-auto border px-10 py-6 rounded-4xl bg-black/20 backdrop-blur-sm">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Featured Events
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Join us for these exciting events and showcase your skills in technology, problem-solving, and gaming!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {events.map((event) => (
                        <TravelCard
                            key={event.id}
                            imageUrl={event.imageUrl}
                            imageAlt={event.imageAlt}
                            logo={event.logo}
                            title={event.title}
                            location={event.location}
                            overview={event.overview}
                            price={event.price}
                            pricePeriod={event.pricePeriod}
                            onBookNow={event.onBookNow}
                            className="w-full max-w-sm"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
