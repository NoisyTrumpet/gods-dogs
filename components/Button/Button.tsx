import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  type:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "secondary-outline"
    | "tertiary"
    | "quaternary"
    | "alert"
    | "donate"
    | "donate-white"
    | "back-menu"
    | "announcement";
  onClick?: () => void;
  disabled?: boolean;
}

const styleLoader = (type: string) => {
  switch (type) {
    case "back-menu":
      return `bg-primary text-white py-2 px-4 font-heading uppercase hover:bg-primary-dark transition duration-300 ease-in-out`;
    case "donate-white":
      return `rounded-full bg-white py-2 px-4 text-primary font-body uppercase
      hover:bg-primary hover:text-white transition duration-300 ease-in-out`;
    case "donate":
      return `rounded-full bg-primary py-2 px-4 text-white font-body uppercase
      hover:bg-primary transition duration-300 ease-in-out hover:shadow-lg hover:border-primary hover:border-1 hover:text-primary`;
    case "primary":
      return `rounded-full border-primary border-2 bg-primary py-2 px-4 text-white font-body uppercase hover:bg-white transition duration-300 ease-in-out hover:shadow-lg hover:border-primary hover:border-1 hover:text-primary`;
    case "primary-outline":
      return `bg-white rounded-full border-2 border-primary py-2 px-4 text-primary font-body uppercase hover:bg-primary hover:text-white hover:border-primary transition duration-300 ease-in-out`;
    case "secondary":
      return `rounded-full bg-secondary border-2 border-secondary py-2 px-8 text-white font-body uppercase hover:bg-white hover:text-secondary transition duration-300 ease-in-out`;
    case "secondary-outline":
      return `bg-white rounded-full border-2 border-secondary py-2 px-4 text-secondary font-body uppercase hover:bg-secondary hover:text-white hover:border-primary transition duration-300 ease-in-out`;
    case "announcement":
      return `bg-white rounded-full border-2 border-secondary-light py-2 px-4 text-secondary-light font-body uppercase hover:bg-secondary-light hover:text-white hover:border-white transition duration-300 ease-in-out`;
    case "tertiary":
      return `rounded-full bg-tertiary py-2 px-4 text-white font-body uppercase hover:bg-tertiary-dark transition duration-300 ease-in-out`;
    case "quaternary":
      return `rounded-full bg-quaternary py-2 px-4 text-white font-body uppercase`;
    case "alert":
      return `rounded-full bg-alert py-2 px-4 text-white font-body uppercase`;
    default:
      return `rounded-full bg-primary py-2 px-4 text-white font-body uppercase`;
  }
};

const Button = ({
  href,
  children,
  className,
  type,
  disabled,
  target,
  ...props
}: ButtonProps) => {
  if (href && type !== "donate" && type !== "donate-white") {
    return (
      <Link
        className={`${styleLoader(type)} ${className}`}
        role="button"
        href={href}
        target={target ? target : "_self"}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${styleLoader(type)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
