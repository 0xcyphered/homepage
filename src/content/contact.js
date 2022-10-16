import useStore from "../store";

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
      <p>
        <i class="fas fa-envelope fa-fw text-purple"></i>
        <a href="mailto:0xcyphered@gmail.com">0xcyphered@gmail.com</a>
        <br />
        <i class="fab fa-linkedin fa-fw text-purple"></i>
        <a href="https://www.linkedin.com/in/cyphered/">
          linkedin.com/in/<span class="text-purple">cyphered</span>
        </a>
        <br />
        <i class="fab fa-github fa-fw text-purple"></i>
        <a href="https://github.com/0xcyphered/">
          github.com/<span class="text-purple">0xcyphered</span>
        </a>
        <br />
      </p>
    </>
  );
}
