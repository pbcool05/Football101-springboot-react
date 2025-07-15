// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full text-center text-gray-400 py-6 bg-gray-900">
      <hr className="border-gray-700 mb-4" />
      <div>
        &copy; {new Date().getFullYear()} Football101 &mdash; All rights reserved.
      </div>
    </footer>
  );
}