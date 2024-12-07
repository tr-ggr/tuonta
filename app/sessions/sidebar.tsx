"use client";

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col gap-12 p-4 w-1/4 bg-[#F2DFFD]">
      <div className="flex flex-col gap-3">
        <span style={{ fontWeight: "bold" }}>Explore</span>
        <span>Featured</span>
        <span>Popular</span>
        <span>Rising</span>
        <span>Recent</span>
      </div>

      <div className="flex flex-col gap-3">
        <span style={{ fontWeight: "bold" }}>Subjects</span>
        <span>General</span>
        <span>Mathematics</span>
        <span>Science</span>
        <span>History</span>
        <span>Geography</span>
        <span>Languages</span>
      </div>
    </div>
  );
};
