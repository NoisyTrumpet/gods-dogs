import { gql } from "@apollo/client";
import { MenuItem } from "graphql";
import Link from "next/link";
import { AnimatePresence, m, LazyMotion } from "framer-motion";
import { itemVariants, sideVariants } from "./Fragments/variants";
import { MenuButton } from "./Fragments/MenuButton";
import { useState } from "react";
import { Button } from "components/Button";
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
  const [subMenuOpen, setSubMenuOpen] = useState({
    id: "",
    isOpen: false,
  });

  if (!menuItems) {
    return null;
  }

  if (type === "footer") {
    return (
      <nav
        className={`my-6 flex flex-row flex-wrap items-center justify-center text-center md:my-0 md:justify-start md:text-left`}
      >
        {/* 2 COlumn List */}
        <ul className={`gap-24 sm:columns-2`}>
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

  const handleMenu = () => {
    setSubMenuOpen({
      id: "",
      isOpen: false,
    });
    toggleOpen && toggleOpen();
  };

  return (
    <>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          <MenuButton
            className={`mr-4 md:hidden`}
            isOpen={isOpen}
            onClick={handleMenu}
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
                width: "100%",
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 },
              }}
              className={`absolute left-0 top-full grid h-screen bg-primary-light md:relative`}
            >
              <m.nav
                className={`bottom-100 left-4 flex flex-col items-start p-8 font-heading text-3xl md:flex-row md:gap-0`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                {menuItems.map(({ path, label, children }: any) => {
                  const hasChildren = children?.length > 0;
                  const pathIsOpen =
                    subMenuOpen.id === label && subMenuOpen.isOpen;
                  return (
                    <>
                      <m.div
                        key={`nav-${path}-${label}`}
                        // whileHover={{ scale: 1.1 }}
                        variants={itemVariants}
                        className={`w-full border-b-[1px] border-b-primary py-4 hover:cursor-pointer`}
                        onClick={() => {
                          if (hasChildren) {
                            setSubMenuOpen({
                              id: label,
                              isOpen: !subMenuOpen.isOpen,
                            });
                          }
                        }}
                      >
                        {hasChildren ? (
                          <span
                            className={`flex w-full justify-between text-primary`}
                          >
                            {label}
                            <span>{">"}</span>
                          </span>
                        ) : (
                          <Link
                            href={path ?? "/"}
                            className={`flex w-full justify-between text-primary`}
                          >
                            {label}
                          </Link>
                        )}
                      </m.div>
                      {hasChildren && pathIsOpen ? (
                        <>
                          <m.ul
                            className={`absolute top-0 left-0 h-full w-full bg-primary-light p-8`}
                            // Slide in from left
                            initial={{
                              x: "-100%",
                            }}
                            animate={{
                              x: 0,
                              zIndex: 1,
                            }}
                          >
                            {children?.map(({ path, label }: MenuItem) => (
                              <m.li
                                key={`sub-nav-${path}-${label}`}
                                className={`w-full border-b-[1px] border-b-primary py-4`}
                              >
                                <Link href={path ?? "/"}>{label}</Link>
                              </m.li>
                            ))}
                            <m.li>
                              <Button
                                type={`back-menu`}
                                className={`mt-4 w-full text-left`}
                                onClick={() => {
                                  setSubMenuOpen({
                                    id: "",
                                    isOpen: false,
                                  });
                                }}
                              >
                                {"< Back"}
                              </Button>
                            </m.li>
                          </m.ul>
                        </>
                      ) : null}
                    </>
                  );
                })}
              </m.nav>
            </m.aside>
          )}
        </AnimatePresence>
      </LazyMotion>
      <nav className="left-4 hidden flex-col items-center font-body text-base md:relative md:flex md:flex-row">
        {menuItems.map(({ path, label, children }: any) => {
          const hasChildren = children?.length > 0;
          return (
            <div
              key={`nav-${path}-${label}`}
              className={`relative ${hasChildren ? "group" : ""}`}
            >
              <Link
                href={path ?? "/"}
                className={`peer mr-5 uppercase hover:text-secondary ${
                  type === "primary" ? "text-primary-light" : "text-black"
                } transition-all duration-300 ease-in-out`}
              >
                {label}
              </Link>
              {hasChildren ? (
                <ul className="top-100 absolute left-0 hidden w-fit min-w-8 flex-col gap-4 whitespace-nowrap bg-white py-6 px-4 shadow-md transition-all duration-300 ease-in-out group-hover:flex">
                  {children?.map(({ path, label }: MenuItem) => (
                    <li
                      key={`nav-${path}-${label}`}
                      className={`transition-all duration-300 ease-in-out`}
                    >
                      <Link
                        href={path ?? "/"}
                        className={`transition-all duration-300 ease-in-out hover:text-secondary`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
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
