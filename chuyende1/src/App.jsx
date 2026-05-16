// import NavigationMenu from './components/NavigationMenu.jsx';
// import Banner from './components/Banner.jsx';
// import Footer from './components/Footer.jsx';
// import ScrollTest from './ScrollTest.jsx';
// import Panel from "./components/Panel.jsx";
// import User0008 from "./components/User0008.jsx";
// import Policies from './components/Policies.jsx';
// import ProductPage from './ProductPage.jsx';
// import { Routes, Route, Outlet } from 'react-router-dom';
// import BT from './components/BT.jsx';
// import Collection from './collection.jsx';

// const ProductLayout = () => (
//   <div className="bg-white flex flex-col min-h-screen">
//     <BT />
//     <main className="flex-grow">
//       <Outlet />
//     </main>
//     <Footer />
//   </div>
// );

// // Layout cho Home Page
// const HomeLayout = () => (
//   <div className="bg-white flex flex-col min-h-screen">
//     <main className="flex-grow">
//       <Outlet />
//     </main>
//     <Panel />
//   </div>
// );

// // Nội dung trang chủ
// const HomePageContent = () => (
//   <>
//      <NavigationMenu/>
//     <Banner />
//     <User0008 />
//     <Collection/>
//     <ScrollTest />
//     <Policies />
//     <Footer/>
//     <Panel/>
//   </>
// );

// function App() {
//   return (
//     <Routes>
//       {/* Trang chủ dùng HomeLayout */}
//       <Route element={<HomeLayout />}>
//         <Route path="/" element={<HomePageContent />} />
//       </Route>

//       {/* Các trang sản phẩm dùng ProductLayout */}
//       <Route element={<ProductLayout />}>
//         <Route path="/*" element={<ProductPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import NavigationMenu from './components/NavigationMenu.jsx';
import Banner from './components/Banner.jsx';
import Footer from './components/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./components/Panel.jsx";
import User0008 from "./components/User0008.jsx";
import Policies from './components/Policies.jsx';
import Collection from './Collection.jsx';

export default function App() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow">
        <Banner />
        <User0008 />
        <Collection />
        <ScrollTest />
        <Policies />
      </main>
      <Footer />
      <Panel />
    </div>
  );
}
