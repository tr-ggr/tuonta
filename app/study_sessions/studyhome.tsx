"use client";

export const FeaturedItem = ({
  picture,
  title,
  tags,
  viewers,
}: {
  picture: string;
  title: string;
  tags: string[];
  viewers: number;
}) => {
  return (
    <div className="flex h-fit w-[500px] flex-col gap-2">
      <div className="h-56  bg-slate-600"></div>
      <div className="flex justify-between gap-2">
        <span className="font-bold">{title}</span>
        <span className="text-xs">{viewers} viewers</span>
      </div>

      <div className="flex gap-2">
        {tags.map((tag) => (
          <span className="text-xs bg-[#F2DFFD] px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Featured = () => {
  return (
    <div className="flex gap-12 w-full p-4 overflow-x-auto [&>div]:flex-shrink-0">
      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />

      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />

      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />

      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />

      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />

      <FeaturedItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
    </div>
  );
};

export const SmallViewItem = ({
  picture,
  title,
  tags,
  viewers,
}: {
  picture: string;
  title: string;
  tags: string[];
  viewers: number;
}) => {
  return (
    <div className="flex h-fit w-[300px] flex-col gap-2">
      <div className="h-40  bg-slate-600"></div>
      <div className="flex justify-between gap-2">
        <span className="font-bold">{title}</span>
        <span className="text-xs">{viewers} viewers</span>
      </div>

      <div className="flex gap-2">
        {tags.map((tag) => (
          <span className="text-xs bg-[#F2DFFD] px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const SmallView = ({ type }: { type: string }) => {
  return (
    <div className="flex gap-12 w-full p-4 overflow-x-auto [&>div]:flex-shrink-0">
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
      <SmallViewItem
        picture="lol"
        title="Study Session 1"
        tags={["Mathematics", "Algebra"]}
        viewers={12}
      />
    </div>
  );
};
