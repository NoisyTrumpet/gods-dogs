import Link from "next/link";

export interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  variant: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const styleLoader = (type: string) => {
  switch (type) {
    case "back-menu":
      return `bg-primary text-white py-2 px-4 font-heading uppercase hover:bg-primary-dark transition duration-300 ease-in-out min-w-[165px] text-center`;
    case "donate-white":
      return `rounded-full bg-white py-2 px-4 text-primary font-body uppercase
      hover:bg-primary hover:text-white transition duration-300 ease-in-out`;
    case "donate":
      return `rounded-full bg-primary py-2 px-4 text-white font-body uppercase
      hover:bg-primary transition duration-300 ease-in-out hover:shadow-lg hover:border-primary hover:border-1 hover:text-primary min-w-[165px] text-center`;
    case "primary":
      return `rounded-full border-primary border-2 bg-primary py-2 px-4 text-white font-body uppercase hover:bg-white transition duration-300 ease-in-out hover:shadow-lg hover:border-primary hover:border-1 hover:text-primary min-w-[165px] text-center`;
    case "primary-outline":
      return `bg-white rounded-full border-2 border-primary py-2 px-4 text-primary font-body uppercase hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg transition duration-300 ease-in-out min-w-[165px] text-center`;
    case "secondary":
      return `rounded-full bg-secondary border-2 border-secondary py-2 px-8 text-white font-body uppercase hover:bg-white hover:text-secondary hover:shadow-lg transition duration-300 ease-in-out min-w-[165px] text-center`;
    case "secondary-outline":
      return `bg-transparent rounded-full border-2 border-secondary py-2 px-8 text-secondary font-body uppercase hover:bg-secondary hover:text-white hover:border-primary hover:shadow-lg transition duration-300 ease-in-out`;
    case "announcement":
      return `bg-white rounded-full border-2 border-secondary-light py-2 px-4 text-secondary-light font-body uppercase hover:bg-secondary-light hover:text-white hover:border-white hover:shadow-lg transition duration-300 ease-in-out min-w-[165px] text-center`;
    case "tertiary":
      return `rounded-full bg-tertiary py-2 px-4 text-white font-body uppercase hover:bg-tertiary-dark transition duration-300 ease-in-out min-w-[165px] text-center`;
    case "quaternary":
      return `rounded-full bg-quaternary py-2 px-4 text-white font-body uppercase min-w-[165px] text-center`;
    case "alert":
      return `rounded-full bg-alert py-2 px-4 text-white font-body uppercase min-w-[165px] text-center`;
    case "copy":
      return `text-primary font-body uppercase underline hover:no-underline hover:text-primary-light transition duration-300 ease-in-out min-w-[165px]`;
    default:
      return `rounded-full bg-primary py-2 px-4 text-white font-body uppercase min-w-[165px] text-center`;
  }
};

const Button = ({
  href,
  children,
  className,
  variant,
  disabled,
  target,
  type,
  ...props
}: ButtonProps) => {
  const isCopy = variant === "copy";
  if (href) {
    return (
      <Link
        className={`${styleLoader(variant)} ${className}`}
        role="button"
        href={href}
        target={target ? target : "_self"}
        {...props}
      >
        {children} {isCopy && `>`}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${styleLoader(variant)} ${className}`}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
