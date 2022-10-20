import useStore from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [contentPage, setContentPage] = useStore((state) => [
    state.contentPage,
    state.setContentPage,
  ]);
  return (
    <>
      <h1>Contact me</h1>
      <h2>
        Feel free to contact. It's a pleasure for me to co-working in buidling.
      </h2>
      <ul>
        <li>
          <FontAwesomeIcon icon={faEnvelope} />&nbsp;
          <a href="mailto:0xcyphered@gmail.com">0xcyphered@gmail.com</a>
        </li>
        <li>
          <FontAwesomeIcon icon={faLinkedin} />&nbsp;
          <a href="https://www.linkedin.com/in/cyphered/">
            linkedin.com/in/<span className="text-purple">cyphered</span>
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faTwitter} />&nbsp;
          <a href="https://twitter.com/0xcyphered/">
            twitter.com/<span className="text-purple">0xcyphered</span>
          </a>
        </li>
      </ul>
    </>
  );
}
