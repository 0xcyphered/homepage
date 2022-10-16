import useStore from "../store";

export default function About() {
  const [contentPage, setContentPage] = useStore((state) => [
    state.contentPage,
    state.setContentPage,
  ]);
  return (
    <>
      <h1>Cyphered.eth</h1>
      <h2>Blockchain Developer &bullet; Full-Stack Developer</h2>
      <p>
        I am a smart contract expert with
        <b>16 years</b> of self taught experience in the web development. Parts
        of the projects in which I specialize: client and server connection
        protocols, bug finding, application speed increasing, responsive design,
        database design, building application architecture, analysis of
        turnover, customers baskets and cash flows. Among all the high-level
        frameworks I use, I have experience working with several other
        technologies like IVR, IOT and SOAP.
      </p>
    </>
  );
}
