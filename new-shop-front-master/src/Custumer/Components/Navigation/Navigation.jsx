import {Fragment, useEffect, useState} from "react";
import {Dialog, Popover, Tab, Transition} from "@headlessui/react";
import {Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon,} from "@heroicons/react/24/outline";

import {navigation} from "./NavigationData";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {useLocation, useNavigate} from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logout} from "../../../State/Auth/Action";
import cart from "../Cart/Cart";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openUserMenu = Boolean(anchorEl);
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store => store)
    const {cart} = useSelector(store => store)

    const dispatch = useDispatch()
    const location = useLocation();

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorEl(null);
    };

    const handleOpen = () => {
        setOpenAuthModal(true);
    };

    const handleClose = () => {
        setOpenAuthModal(false);
    };

    const handleCategoryClick = (category, section, item, close) => {
        navigate(`/${category.id}/${section.id}/${item.id}`);
        close();
    };


    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt, auth.jwt])


    useEffect(() => {
        if (auth.user) {
            handleClose()
        }
        if (location.pathname === "/login" || location.pathname === "/register") {
            navigate(-1)
        }
    }, [auth.user]);

    const handleLogout = () => {
        dispatch(logout())
        handleCloseUserMenu()
    }//updatesdddd

    return (
        <div className="bg-white pb-10">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel
                                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({selected}) =>
                                                        classNames(
                                                            selected
                                                                ? "border-indigo-600 text-indigo-600"
                                                                : "border-transparent text-gray-900",
                                                            "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel
                                                key={category.name}
                                                className="space-y-10 px-4 pb-8 pt-10"
                                            >
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            className="group relative text-sm"
                                                        >
                                                            <div
                                                                className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <img
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt}
                                                                    className="object-cover object-center"
                                                                />
                                                            </div>
                                                            <a
                                                                href={item.href}
                                                                className="mt-6 block font-medium text-gray-900"
                                                            >
                                                                <span
                                                                    className="absolute inset-0 z-10"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p
                                                            id={`${category.id}-${section.id}-heading-mobile`}
                                                            className="font-medium text-gray-900"
                                                        >
                                                            {section.name}
                                                        </p>
                                                        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <p className="-m-2 block p-2 text-gray-500">
                                                                        {"item.name"}
                                                                    </p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <a
                                                href={page.href}
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a
                                            href="/"
                                            className="-m-2 block p-2 font-medium text-gray-900"
                                        >
                                            Sign in
                                        </a>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <a href="/" className="-m-2 flex items-center p-2">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">
                                            CAD
                                        </span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p>

                <nav aria-label="Top" className="mx-auto ">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center px-11">
                            <button
                                type="button"
                                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="/" className="flex items-center">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="Shopwithzosh"
                                        className="h-8 w-8 mr-2"
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({open, close}) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? "border-indigo-600 text-indigo-600"
                                                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel
                                                            className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div
                                                                className="absolute inset-0 top-1/2 bg-white shadow"
                                                                aria-hidden="true"
                                                            />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div
                                                                        className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div
                                                                            className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div
                                                                                    key={item.name}
                                                                                    className="group relative text-base sm:text-sm"
                                                                                >
                                                                                    <div
                                                                                        className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <a
                                                                                        href={item.href}
                                                                                        className="mt-6 block font-medium text-gray-900"
                                                                                    >
                                                                                        <span
                                                                                            className="absolute inset-0 z-10"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p
                                                                                        aria-hidden="true"
                                                                                        className="mt-1"
                                                                                    >
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div
                                                                            className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p
                                                                                        id={`${section.name}-heading`}
                                                                                        className="font-medium text-gray-900"
                                                                                    >
                                                                                        {section.name}
                                                                                    </p>
                                                                                    {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li
                                                                                                key={item.name}
                                                                                                className="flex"
                                                                                            >
                                                                                                <p
                                                                                                    onClick={() =>
                                                                                                        handleCategoryClick(
                                                                                                            category,
                                                                                                            section,
                                                                                                            item,
                                                                                                            close
                                                                                                        )
                                                                                                    }
                                                                                                    className="cursor-pointer hover:text-gray-800"
                                                                                                >
                                                                                                    {item.name}
                                                                                                </p>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {auth.user?.firstName ? (
                                        <div>
                                            <Avatar
                                                className="text-white"
                                                onClick={handleUserClick}
                                                aria-controls={open ? "basic-menu" : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? "true" : undefined}
                                                // onClick={handleUserClick}
                                                sx={{
                                                    background: deepPurple[500],
                                                    color: "white",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {auth.user?.firstName[0].toUpperCase()}
                                            </Avatar>
                                            {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openUserMenu}
                                                onClose={handleCloseUserMenu}
                                                MenuListProps={{
                                                    "aria-labelledby": "basic-button",
                                                }}

                                            >
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    Profile
                                                </MenuItem>
                                                <MenuItem onClick={() => navigate("/account/order")}>
                                                    My Orders
                                                </MenuItem>
                                                {auth.user?.role === "ADMIN" && (
                                                    <MenuItem onClick={() => navigate("/admin")}>Admin
                                                        Dashboard</MenuItem>
                                                )}
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>

                                            </Menu>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={handleOpen}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            Signin
                                        </Button>
                                    )}
                                </div>

                                {/* Search */}
                                <div className="flex items-center lg:ml-6">

                                    <p /*onClick={() => navigate("/products/search")}*/
                                        className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>

                                        <MagnifyingGlassIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </p>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Button
                                        onClick={() => navigate("/cart")}
                                        className="group -m-2 flex items-center p-2"
                                    >
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                            {cart.cart?.cartItems.length}
                                        </span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <AuthModal handleClose={handleClose} open={openAuthModal}/>

        </div>
    );
}
