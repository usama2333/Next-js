import React from "react";
import classNames from "classnames";

interface ProfileCardProps {
  name: string;
  title: string;
  imageUrl?: string; // Optional prop with default image
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  imageUrl = "blank-profile.webp", // Default image
}) => {
  return (
    <div className={classNames("relative", "bg-white border border-gray-300", "p-4 rounded-lg shadow-md", "w-[415px]", "h-[335px]")}>
      {/* Three Dots */}
      <div className={classNames("absolute top-8 right-5", "flex gap-1")}>
        <div className={classNames("w-1 h-1 rounded-full bg-gray-400")}></div>
        <div className={classNames("w-1 h-1 rounded-full bg-gray-400")}></div>
        <div className={classNames("w-1 h-1 rounded-full bg-gray-400")}></div>
      </div>

      {/* Card Content */}
      <div className={classNames("flex flex-col items-center justify-center h-full")}>
        {/* Image */}
        <img
          src={`/images/${imageUrl}`} // Path to the WEBP image
          alt="Profile Image"
          className={classNames("w-24 h-24 rounded-full object-cover")}
        />
        {/* Name and Title */}
        <h2 className={classNames("text-xl font-semibold mt-2")}>{name}</h2>
        <p className={classNames("text-gray-600")}>{title ? title : 'Visual Designer'}</p>
        {/* Buttons */}
        <div className={classNames("flex gap-2 mt-4")}>
          <button className={classNames("px-4 py-2 bg-blue-500 text-white rounded-lg")}>Add Friend</button>
          <button className={classNames("px-4 py-2 bg-white text-black border border-gray-300 rounded-lg")}>Message</button>
        </div>
      </div>
    </div>
  );
};
