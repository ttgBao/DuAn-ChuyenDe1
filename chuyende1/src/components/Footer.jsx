import '../footer.css';
import mim from '../assets/logo.png';
import banner from '../assets/banner.jpg';
import loo from '../assets/thongbao.png';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FiSend } from "react-icons/fi";

export default function Footer() {
    const instructions = [
        "Sản phẩm",
        "Bản đồ",
        "Chính sách thanh toán",
        "Chính sách vận chuyển",
        "Chính sách đổi trả hàng",
        "Chính sách bảo hành",
        "Chính sách bảo mật"
    ];

    return (
        <footer className="footer_main">
            <div className="footer_container">

                {/* 1. Giới thiệu */}
                <div className="introduce">
                    <h2 className="title">Giới thiệu</h2>
                    <p>
                        IMSports chuyên giày dép, quần áo và phụ kiện chạy bộ/chạy địa hình chính hãng đến từ các thương hiệu hàng đầu thế giới. Chúng tôi luôn có sẵn những dòng sản phẩm mới nhất, tối ưu và hiệu suất cao dành cho runners. Đội ngũ nhân viên trẻ trung, nhiệt huyết, là những chân chạy đã được tích luỹ nhiều kinh nghiệm tập luyện và thi đấu sẽ mang đến tinh thần phục vụ chuyên nghiệp và chuyên sâu nhất cho khách hàng.
                    </p>

                    <div className="social-icons">
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><TfiYoutube /></a>
                    </div>

                    <div className="bocongthuong">
                        <img src={loo} alt="Đã Thông Báo Bộ Công Thương" />
                    </div>
                </div>

                {/* 2. Địa chỉ Store */}
                <div className="store">
                    <h2 className="title">ĐỊA CHỈ STORE</h2>
                    <p><strong>HÀ NỘI</strong></p>
                    <p>- Số 58A Ngõ 92, Thanh Nhàn, Hai Bà Trưng</p>
                    <p>Hotline/Zalo: 0846 33 5858</p>
                    <p>- B11, Imperia Sky Garden, 423 Minh Khai, Hai Bà Trưng</p>
                    <p>Hotline/Zalo: 0839 33 5858</p>
                    <p>- 0105, Tòa Luxury Park Views, Trương Công Giai, Cầu Giấy</p>
                    <p>Hotline/Zalo Tư vấn: 0879 33 5858</p>
                    <p><strong>Đại lý ủy quyền tại Tp.HCM</strong></p>
                    <p>Số 285/21 CMT8, Phường 12, Quận 10</p>
                    <p>Hotline/Zalo Tư vấn: 08668 285 21</p>
                </div>

                {/* 3. Hướng dẫn */}
                <div className="policy">
                    <h2 className="title">HƯỚNG DẪN</h2>
                    {instructions.map((item, index) => (
                        <p key={index}><a href="#">{item}</a></p>
                    ))}
                </div>

                {/* 4. Theo dõi */}
                <div className="flow">
                    <h2 className="title">THEO DÕI CHÚNG TÔI</h2>

                    <div className="box-banner facebook-widget">
                        <div className="widget-cover" style={{ backgroundImage: `url(${banner})` }}>
                            <div className="widget-logo">
                                <img src={mim} alt="IMSports Logo" />
                            </div>
                        </div>

                        <div className="widget-info">
                            <h3 className="page-name">IMSports</h3>
                            <p className="follower-count">32.324 người theo dõi</p>

                            <div className="widget-actions">
                                <a href="#" className="follow-btn">
                                    <FaFacebookF /> Theo dõi Trang
                                </a>
                                <a href="#" className="share-btn">
                                    <i className="fas fa-share-alt"></i> Chia sẻ
                                </a>
                            </div>
                        </div>
                    </div>

                    <form className="email-signup-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Nhập email của bạn" className="email-input" />
                        <button type="submit" className="send-button">
                            <FiSend />
                        </button>
                    </form>

                    <p>Đăng ký để nhận chương trình ưu đãi!</p>
                    <p>Website được sở hữu bởi Công ty TNHH Thể Thao Thung Lũng Mặt Trời</p>
                    <p>GPĐK: 0109685009. Liên hệ CSKH:</p>
                    <p><a href="mailto:sales@imsports.vn">sales@imsports.vn</a></p>
                </div>
            </div>
        </footer>
    );
}
