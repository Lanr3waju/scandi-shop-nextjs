const HamburgerButton = ({ isOpen, setIsOpen }) => {
    return (
        <button
            className="flex items-center justify-center flex-col px-3 py-5 md:hidden"
            onClick={setIsOpen}
            type="button"
        >
            {/* Hamburger lines */}
            <div className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-primary my-1 transition-all duration-300 opacity-100 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
    )
}

export default HamburgerButton
