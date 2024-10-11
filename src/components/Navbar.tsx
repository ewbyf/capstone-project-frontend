const Navbar = () => {
    return (
        <nav className="bg-white w-full flex items-center fixed top-0 shadow px-12 py-2 z-50 gap-12">
            <div className="flex items-center gap-2">
                <img src="logo.svg" alt="" height={60} width={60}/>
                <p className="text-2xl font-bold text-[#3C3C3C]">Codeban</p>
            </div>
            <a href="#" className="font-inter font-[500] hover:text-[#4F46E5]">Try it</a>
            <a href="#how" className="font-inter font-[500] hover:text-[#4F46E5]">How it works</a>
            <a href="#benefits" className="font-inter font-[500] hover:text-[#4F46E5]">Benefits</a>
            <a href="#testimonials" className="font-inter font-[500] hover:text-[#4F46E5]">Testimonials</a>
            <a href="#faq" className="font-inter font-[500] hover:text-[#4F46E5]">FAQ</a>
        </nav>
    );
}
 
export default Navbar;