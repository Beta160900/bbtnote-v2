function Footer() {
  return (
    <>
      <footer className=" bg-base-200 border-2 border-accent rounded-tr-lg rounded-tl-lg text-white py-4 fixed z-10 bottom-0 w-full">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm text-base-content">
            © 2025 YourWebsiteName. All Rights Reserved.
          </p>
          <div className="text-sm text-base-content">
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-blue-400">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
