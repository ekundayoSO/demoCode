const Footer = () => {
    const year = new Date().getFullYear();
  return (
      <footer className="bg-black text-white p-4 text-center sticky bottom-0 w-full">
        <p>
          <small>Copyright &copy; Suleiman {year}</small>
        </p>
      </footer>
  );
}
export default Footer;