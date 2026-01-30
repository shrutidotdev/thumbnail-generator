import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const WelcomePage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Profile Picture */}
      {user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="Profile"
          width={200}
          height={200}
          className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
        />
      )}

      {/* Welcome Section */}
      <section className="text-center md:text-left max-w-lg">
        {/* Welcome Text */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-sm">
          {user?.firstName
            ? `Welcome back, ${user.firstName} (${user.username}) ✨`
            : "Welcome ✨"}
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg text-white/90">
          We’re so glad to see you again.  
          Your journey continues here.
        </p>

       
      </section>
    </div>
  );
};

export default WelcomePage;
