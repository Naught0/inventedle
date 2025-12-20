import { ReactNode } from "react";

export const StatCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <figure className="bg-accent flex min-h-32 min-w-36 flex-grow flex-col items-center justify-center gap-3 rounded-lg p-3 text-center md:min-w-48 lg:p-5">
      <figcaption className="text-muted-foreground font-lighter uppercase">
        {title}
      </figcaption>
      <span className="text-foreground text-3xl font-extrabold lg:text-4xl">
        {children}
      </span>
    </figure>
  );
};
