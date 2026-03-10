import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-terraflow-dark text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">Terraflow</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              to="/"
              className="hover:text-terraflow-lightgreen transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className="hover:text-terraflow-lightgreen transition-colors"
            >
              Analytics
            </Link>
            <Link
              to="/database"
              className="hover:text-terraflow-lightgreen transition-colors"
            >
              Database
            </Link>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-terraflow-green hover:bg-terraflow-lightgreen text-white rounded-full p-2 transition-colors">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3 pb-4">
            <Link
              to="/"
              className="block hover:text-terraflow-lightgreen transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className="block hover:text-terraflow-lightgreen transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              to="/database"
              className="block hover:text-terraflow-lightgreen transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Database
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
