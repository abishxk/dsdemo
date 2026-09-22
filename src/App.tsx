import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Packages } from "./pages/Packages";
import { Work } from "./pages/Work";
import { Reviews } from "./pages/Reviews";
import { About } from "./pages/About";
import { Book } from "./pages/Book";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";
import { PrivacyPolicy } from "./pages/legal/PrivacyPolicy";
import { TermsAndConditions } from "./pages/legal/TermsAndConditions";
import { CookiePolicy } from "./pages/legal/CookiePolicy";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/work" element={<Work />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
