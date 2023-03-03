import * as SELECTORS from "constants/selectors";
import localFont from "next/font/local";

const GOOD_DOG = localFont({
  src: "../../pages/GoodDogNew.woff2",
  display: "swap",
  variable: "--font-heading",
});

const LIGURINO = localFont({
  src: [
    {
      path: "../../pages/LigurinoRg-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../pages/LigurinoRg-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../pages/LigurinoRg-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, className, ...props }: MainProps) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={`${className} ${GOOD_DOG.variable} ${LIGURINO.variable}`}
      {...props}
    >
      {children}
    </main>
  );
}
