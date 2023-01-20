import { gql } from "@apollo/client";
import { MenuItem } from "graphql";
import Link from "next/link";
import { AnimatePresence, m, LazyMotion } from "framer-motion";
import { itemVariants, sideVariants } from "./Fragments/variants";
import { MenuButton } from "./Fragments/MenuButton";
const loadFeatures = () =>
  import("utilities/framerFeatures.js").then((res) => res.default);

interface NavigationMenuProps {
  menuItems: MenuItem[] | undefined;
  className?: string;
  type?: "primary" | "secondary" | "footer";
  isMobile?: boolean;
  isOpen?: boolean;
  toggleOpen?: () => void;
}

const NavigationMenu = ({
  menuItems,
  className,
  type = "primary",
  isMobile,
  isOpen,
  toggleOpen,
}: NavigationMenuProps) => {
  if (!menuItems) {
    return null;
  }

  if (type === "footer") {
    return (
      <nav
        className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
      >
        {/* 2 COlumn List */}
        <ul className={`columns-2 gap-24`}>
          {menuItems.map(({ path, label }) => (
            <li
              key={`footer-${path}-${label}`}
              className={`mb-6 uppercase text-white hover:text-secondary`}
            >
              <Link href={path ?? "/"}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          <MenuButton
            className={`absolute left-4 ${
              isOpen ? `top-12` : `top-50`
            } z-50 md:hidden`}
            isOpen={isOpen}
            onClick={toggleOpen}
            lineProps={{ strokeLinecap: "round" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            width="24"
            height="24"
            strokeWidth="6"
            color="#363636"
          />
          {isOpen && (
            <m.aside
              initial={{ width: 0 }}
              animate={{
                width: 300,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 },
              }}
              className={`z-50 grid h-screen items-center`}
            >
              <m.nav
                className={`bottom-100 left-4 z-40 flex flex-col items-center gap-8 font-body text-base md:flex-row md:gap-0`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                {menuItems.map(({ path, label }) => (
                  <m.div
                    key={path}
                    whileHover={{ scale: 1.1 }}
                    variants={itemVariants}
                  >
                    <Link
                      href={path ?? "/"}
                      className={`mr-5 hover:text-gray-900 ${
                        type === "primary" ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {label}
                    </Link>
                  </m.div>
                ))}
              </m.nav>
            </m.aside>
          )}
        </AnimatePresence>
      </LazyMotion>
      <nav className="left-4 hidden flex-col items-center font-body text-base md:relative md:flex md:flex-row">
        {menuItems.map(({ path, label }) => (
          <Link
            key={path}
            href={path ?? "/"}
            className={`mr-5 hover:text-secondary ${
              type === "primary" ? "text-primary-light" : "text-black"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default NavigationMenu;

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
