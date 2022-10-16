import "./Modal.scss";
import CloseIcon from "./assets/close";
import useStore from "./store";
import About from "./content/about";
import Overview from "./content/overview";
import Contact from "./content/contact";

export default function Modal() {
  const [contentPage, setContentPage] = useStore((state) => [
    state.contentPage,
    state.setContentPage,
  ]);
  function close() {
    setContentPage("");
  }
  return (
    <div className={`card ${contentPage ? "is-open" : ""}`}>
      <div className="box">
        <div className="close" onClick={close}>
          <CloseIcon />
        </div>
        <div className="content">
          {contentPage === "overview" && <Overview />}
          {contentPage === "about" && <About />}
          {contentPage === "contact" && <Contact />}
        </div>
      </div>
    </div>
  );
}
