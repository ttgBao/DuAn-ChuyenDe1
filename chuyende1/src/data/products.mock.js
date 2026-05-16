export const categoriesType = [
  { id: 1, name: "Đồ Nam", slug: "do-nam" },
  { id: 2, name: "Đồ Nữ", slug: "do-nu" },
  { id: 3, name: "Đồng hồ", slug: "dong-ho" },
];

// import ảnh
import aoOnFlat from "../assets/AoChayBo.jpeg";
import giayHokaSide from "../assets/Giaychaybonam1.jpeg";
import giayHokaBack from "../assets/Giaychaybonam2.jpeg";
import depTrailSide from "../assets/depchaybonam1.jpg";
import depTrailTop from "../assets/depchaybonam2.jpeg";
import corosGrey from "../assets/dongho1.jpeg";
import corosNylonDark from "../assets/dongho2.jpeg";
import corosNylonWhite from "../assets/dongho3.jpeg";

// ÁO NỮ ON
import aoNuFlat from "../assets/Aochaybonu1.jpeg";
import aoNuModel from "../assets/Aochaybonu2.png";
import aoNuBack from "../assets/Aochaybonu3.png";

// GIÀY NỮ HOKA ROAD
import giayNuRoadSide from "../assets/Giauchaybonu1.jpeg";
import giayNuRoadBack from "../assets/Giaychaybonu2.webp";

// GIÀY NỮ HOKA TRAIL
import giayNuTrailSide from "../assets/Giaychaybonu3.jpeg";
import giayNuTrailAngle from "../assets/Giaychaybonu4.jpeg";

// QUẦN CHẠY BỘ NỮ
import QuanNuOnRunning from "../assets/Quanchaybonu1.jpeg";
import QuanNuOnRunning2 from "../assets/Quanchaybonu2.png";

export const products = [
  // ===== NAM =====
  {
    id: 1,
    name: "Giày Chạy Trail Hoka Speedgoat 5",
    price: 5100000,
    categoryId: 1,
    subcategoryId: 3, // Giày chạy bộ nam
    sizeTypeId: 1,
    brandId: "hoka",
    imgMain: giayHokaSide,
    imgHover: giayHokaBack,
    images: [giayHokaSide, giayHokaBack],
    sizes: ["40", "41", "42", "43", "44"],
    sale: 10, // 10%
    gift: true,
    descriptionHtml: `
    <b>Giới thiệu chung</b>
    <p>Giày trail tốc độ cao NNormal Kjerag 02 là phiên bản nâng cấp từ mẫu Kjerag nguyên bản, được thiết kế để mang đến tốc độ, sự thoải mái và độ bền cao hơn. Kjerag 02 vẫn giữ được DNA của phiên bản đầu — cấu tạo nhẹ, độ phản hồi tốt — nhưng được tinh chỉnh để phục vụ tốt hơn cho các buổi chạy nhanh, leo dốc hoặc chạy quãng dài</p>
      <p><strong>Hoka Speedgoat 5</strong> là dòng giày chạy địa hình (trail) biểu tượng, được thiết kế để chinh phục những cung đường kỹ thuật khó khăn nhất.</p>
     </br> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
        iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
        dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
        accusamus modi?</p></br>
    <p>Phiên bản thứ 5 này nhẹ hơn và có độ bám tốt hơn nhờ công nghệ Vibram® Megagrip với Traction Lug. Phần upper được làm lại bằng lưới tái chế, mang lại sự thoải mái tối đa.</p>
    `,
    specifications: [
      { label: "Trọng lượng", value: "291g (Nam) / 242g (Nữ)" },
      { label: "Độ dốc (Drop)", value: "4mm" },
      { label: "Địa hình", value: "Trail (Địa hình), Núi đá" },
      {
        label: "Công nghệ",
        isList: true,
        value: [
          "Đế ngoài Vibram® Megagrip",
          "Đế giữa CMEVA đàn hồi cao",
          "Lưới Jacquard tái chế kỹ thuật",
          "Bảo vệ ngón chân (Toe rand)",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Áo Khoác Nam On Running Weather Jacket",
    price: 7060000,
    categoryId: 1,
    subcategoryId: 1, // Áo chạy bộ nam
    sizeTypeId: 4,
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L", "XL"],
    sale: 20, // 20%
    gift: true,
    bestseller: true,
    descriptionHtml: `
      <p>Áo khoác <strong>On Running Weather Jacket</strong> siêu nhẹ, được thiết kế để bảo vệ bạn khỏi gió và mưa nhẹ mà không gây bí bách.</p>
     </br> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
        iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
        dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
        accusamus modi?</p></br>
      <p>Thiết kế mũ trùm đầu thông minh giữ cố định khi chạy. Áo có thể gấp gọn vào chính túi ngực của nó.</p>
    `,
    specifications: [
      { label: "Chất liệu", value: "Polyamide & Elastane" },
      { label: "Form dáng", value: "Athletic Fit" },
      {
        label: "Tính năng",
        isList: true,
        value: [
          "Chống thấm nước (DWR)",
          "Chống gió (Windproof)",
          "Thoáng khí 360 độ",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Dép Chạy Trail LUNA Mono",
    price: 2900000,
    categoryId: 1,
    subcategoryId: 4, // Giày địa hình nam
    brandId: "luna",
    imgMain: depTrailSide,
    imgHover: depTrailTop,
    images: [depTrailSide, depTrailTop],
    bestseller: true,
    sizes: ["38", "39", "40", "41", "42"],
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
    specifications: [
      { label: "Chất liệu", value: "Polyamide & Elastane" },
      { label: "Form dáng", value: "Athletic Fit" },
      {
        label: "Tính năng",
        isList: true,
        value: [
          "Chống thấm nước (DWR)",
          "Chống gió (Windproof)",
          "Thoáng khí 360 độ",
          "Siêu nhẹ & Có thể gấp gọn",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Đồng Hồ COROS Pace 3",
    price: 6990000,
    categoryId: 3, // Đồng hồ
    subcategoryId: 11, // Coros
    brandId: "coros",
    imgMain: corosGrey,
    imgHover: corosGrey,
    images: [corosGrey, corosNylonDark, corosNylonWhite],
    sizes: ["M-XXL", "XS-S"],
    specs: {
      battery: "38 giờ GPS full",
      weight: "30g",
      waterResist: "5 ATM",
      gps: "Dual-band GNSS",
      display: '1.2" Memory-In-Pixel',
    },
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
  },
  // ===== NỮ =====
  {
    id: 5,
    name: "Áo Chạy Bộ Nữ On Running Long Sleeve",
    price: 2300000,
    categoryId: 2, // Đồ Nữ
    subcategoryId: 5, // Áo chạy bộ nữ
    brandId: "on",
    imgMain: aoNuFlat,
    imgHover: aoNuModel,
    images: [aoNuFlat, aoNuModel, aoNuBack],
    sizes: ["XS", "S", "M", "L"],
    sale: 15, // 15%
    gift: true,
    bestseller: true,
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
    specifications: [
      { label: "Kích thước", value: "41.9 x 41.9 x 11.7mm" },
      { label: "Màn hình", value: "1.2 inch Touchscreen Memory LCD" },
      { label: "Trọng lượng", value: "30g (Dây nylon)" },
      {
        label: "Thông số kỹ thuật",
        isList: true,
        value: [
          "GPS băng tần kép (Dual-Frequency)",
          "Pin 38 giờ (Full GPS)",
          "Chống nước 5 ATM",
          "Nghe nhạc Offline",
          "Cảm biến nhịp tim thế hệ mới",
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Giày Chạy Bộ Nữ HOKA Clifton 9 Wide",
    price: 4300000,
    categoryId: 2,
    subcategoryId: 7, // Giày chạy bộ nữ
    sizeTypeId: 1,
    brandId: "hoka",
    imgMain: giayNuRoadSide,
    imgHover: giayNuRoadBack,
    images: [giayNuRoadSide, giayNuRoadBack],
    sizes: ["36", "37", "38", "39", "40"],
    sale: 20, // 20%
    gift: true,
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
  },
  {
    id: 7,
    name: "Giày Chạy Địa Hình Nữ HOKA Mafate Speed 4",
    price: 4600000,
    categoryId: 2,
    subcategoryId: 8, // Giày địa hình nữ
    brandId: "hoka",
    imgMain: giayNuTrailSide,
    imgHover: giayNuTrailAngle,
    images: [giayNuTrailSide, giayNuTrailAngle],
    sizes: ["36", "37", "38", "39", "40"],
    sale: 25, // 25%
    gift: true,
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
  },
  {
    id: 8,
    name: "Quần Chạy Bộ Nữ On Running 3 Inch",
    price: 2100000,
    categoryId: 2,
    subcategoryId: 6, // Quần chạy bộ nữ
    brandId: "on",
    imgMain: QuanNuOnRunning,
    imgHover: QuanNuOnRunning2,
    images: [QuanNuOnRunning, QuanNuOnRunning2],
    sizes: ["XS", "S", "M", "L"],
    sale: 10, // 10%
    gift: true,
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
  },
  {
    id: 9,
    name: "Quần Chạy Bộ Nữ On Running 5 Inch",
    price: 1950000,
    categoryId: 2,
    subcategoryId: 6, // Quần chạy bộ nữ
    brandId: "on",
    imgMain: QuanNuOnRunning2,
    imgHover: QuanNuOnRunning,
    images: [QuanNuOnRunning2, QuanNuOnRunning],
    sizes: ["XS", "S", "M", "L"],
    gift: true,
    descriptionHtml: `
      <p><strong>COROS Pace 3</strong> là chiếc đồng hồ GPS thể thao nhẹ nhất thị trường với khả năng định vị băng tần kép (Dual-Frequency) cực kỳ chính xác.</p>
      </br><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia provident,
    iste ad deserunt laborum ducimus! Quo, maxime veritatis fugiat delectus
    dolorum tempora voluptas exercitationem cupiditate quasi magnam quos,
    accusamus modi?</p></br>
      <p>Thời lượng pin ấn tượng cùng màn hình cảm ứng giúp bạn tập trung hoàn toàn vào quá trình tập luyện.</p>
    `,
  },
  {
    id: 10,
    name: "Áo Thun Nam On Running Performance-T",
    price: 2190000,
    oldPrice: 8500000,
    categoryId: 1,
    subcategoryId: 1, // Áo chạy bộ nam
    brandId: "on",
    imgMain: aoOnFlat,
    imgHover: aoOnFlat,
    images: [aoOnFlat],
    sizes: ["S", "M", "L"],
    sale: 10, // 10%
    gift: true,
  },
];
