const Navbar = () => {
    return (
        <nav className="bg-white w-3/4 h-20 flex items-center fixed top-0 rounded-[100px] m-8 shadow px-12 z-50 gap-16">
            <div className="flex items-center gap-2">
                <img src="logo.png" alt="" height={60} width={60}/>
                <p className="text-2xl font-bold">Codeban</p>
            </div>
            <a href="#" className="font-[500] hover:text-[#707070]">Try it</a>
            <a href="#" className="font-[500] hover:text-[#707070]">Features</a>
            <a href="#" className="font-[500] hover:text-[#707070]">How it works</a>
            <a href="#" className="font-[500] hover:text-[#707070]">Benefits</a>
            <a href="#" className="font-[500] hover:text-[#707070]">Testimonials</a>
            <a href="#" className="font-[500] hover:text-[#707070]">FAQ</a>
        </nav>
    );
}
 
export default Navbar;