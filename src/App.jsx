import { useState, useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

import CTA from "./sections/CTA";
import HeroGallery from "./sections/HeroGallery";
import Advantages from "./sections/Advantages";
import Categories from "./sections/Categories";
import HowItWorks from "./sections/HowItWorks";
import About from "./sections/About";

import { LangContext } from "./i18n/context";

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const { dict } = useContext(LangContext);

  return (
    <>
      <Header />

      <main>
        <CTA
          onOpenPrivacy={() => setShowPrivacy(true)}
          onOpenTerms={() => setShowTerms(true)}
        />
        <HeroGallery />
        <Advantages />
        <Categories />
        <HowItWorks />
        <About />
      </main>

      <Footer
        onOpenPrivacy={() => setShowPrivacy(true)}
        onOpenTerms={() => setShowTerms(true)}
      />

      <Modal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={dict.footer.privacy}
      >
        <p className="whitespace-pre-line">{dict.modal.privacy}</p>
      </Modal>

      <Modal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        title={dict.footer.terms}
      >
        <p className="whitespace-pre-line">{dict.modal.terms}</p>
      </Modal>
    </>
  );
}
