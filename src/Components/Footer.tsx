import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      Meow Facts &copy; All Right Reserved {year}
    </footer>
  );
};

export default Footer;
