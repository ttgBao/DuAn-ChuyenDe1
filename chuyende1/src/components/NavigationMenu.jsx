import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ChevronDown, X, ChevronRight } from 'lucide-react';
import BT from './BT.jsx';

const API = "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api";

export default function NavigationMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const menuRef = useRef(null);

  
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          fetch(`${API}/categories`),
          fetch(`${API}/SubCategories`)
        ]);

        const categories = await catRes.json();
        const subCategories = await subRes.json();

        const menu = [
          { id: 'home', label: 'Giới thiệu', link: '/' },

          ...categories.map(cat => ({
            id: cat.category_id,
            label: cat.name,
            link: `/${cat.slug}`,
            submenu: subCategories
              .filter(sub => sub.categoryTypeId === cat.category_id)
              .map(sub => ({
                label: sub.name,
                link: sub.path
              }))
          })),

          { id: 'sale', label: 'SALE', link: '/sale', highlight: true }
        ];

        setMenuItems(menu);
      } catch (err) {
        console.error("Fetch menu error:", err);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setMobileSubmenu(null);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileSubmenu(null);
  };

  const handleSubmenuToggle = (itemId) => {
    setMobileSubmenu(mobileSubmenu === itemId ? null : itemId);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  const renderMenuItem = (item) => (
    <div
      key={item.id}
      className="relative"
      onMouseEnter={() => item.submenu && setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <Link to={item.link} className="flex items-center gap-1 text-base font-medium py-2 pr-2.5">
        <span>{item.label}</span>
        {item.submenu && <ChevronDown className="w-4 h-4" />}
      </Link>

      {item.submenu && hoveredItem === item.id && (
        <div className="absolute left-0 top-full pt-2 z-20">
          <div className="bg-white shadow-lg rounded-md py-2 min-w-[200px]">
            {item.submenu.map((subitem, index) => (
              <Link
                key={index}
                to={subitem.link}
                className="block px-4 py-2 text-sm font-bold text-gray-700 hover:whitespace-nowrap"
              >
                {subitem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm">
      <BT onMenuToggle={handleMobileMenuToggle} />

      <div className="max-w-7xl mx-auto px-4 lg:pb-3 pl-7 pr-8">
        <nav className="hidden lg:flex items-center gap-x-8 py-2">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleMobileMenuToggle}
      />

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex justify-between p-4 border-b">
          <span className="font-bold">MENU</span>
          <button onClick={handleMobileMenuToggle}><X /></button>
        </div>

        <div className="relative">
          <div className={`${mobileSubmenu ? '-translate-x-full' : 'translate-x-0'} transition-transform`}>
            {menuItems.map(item => (
              <div key={item.id} className="border-b">
                <div className="flex justify-between">
                  <Link to={item.link} onClick={handleLinkClick} className="px-5 py-3 flex-1">
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button onClick={() => handleSubmenuToggle(item.id)} className="px-5">
                      <ChevronRight />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {mobileSubmenu && (
            <div className="absolute inset-0 bg-white">
              <button onClick={() => setMobileSubmenu(null)} className="flex items-center gap-2 px-5 py-4 border-b">
                <ChevronRight className="rotate-180" />
                {menuItems.find(i => i.id === mobileSubmenu)?.label}
              </button>

              {menuItems
                .find(i => i.id === mobileSubmenu)
                ?.submenu?.map((sub, i) => (
                  <Link key={i} to={sub.link} onClick={handleLinkClick} className="block px-5 py-3 border-b">
                    {sub.label}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
