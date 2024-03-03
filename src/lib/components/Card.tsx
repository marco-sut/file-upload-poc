import { FC, PropsWithChildren, ReactElement, forwardRef } from "react";

type CardProps = PropsWithChildren<{
  headerContent: ReactElement,
}>;

export const Card: FC<CardProps> = forwardRef<HTMLElement, CardProps>(({ headerContent, children }, ref) => {
    return (
      <article ref={ref} className="min-w-[360px] sm:w-[550px] bg-white p-5 sm:rounded-md sm:shadow-lg sm:mt-10">
        <header className="flex items-center font-medium text-2xl sm:text-4xl border-b">
          {headerContent}
        </header>
        <div className="mt-8">
          {children}
        </div>
      </article>
    );
});