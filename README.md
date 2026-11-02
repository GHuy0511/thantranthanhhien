# 📖 Dòng Thời Gian Kỷ Niệm (Timeline Storytelling)

Trang web dòng thời gian kỷ niệm ấm áp, đã được nâng cấp thêm:
- 💌 **Box lời nhắn mở đầu (Intro Message Box)**: Khi vừa bước vào trang web, người ấy sẽ đọc được lời nhắn tâm tình dịu dàng trước tiên, thay vì đập vào mắt ngay là tấm ảnh.
- 📸 **Bàn kỷ niệm ảnh Polaroid lấp ló nghệ thuật phía sau box (Vintage Polaroid Flatlay & Scrapbook Layering)**:
  - **Hài hòa tuyệt đối & Lộ rõ ảnh (~75% diện tích)**: Các tấm ảnh Polaroid trắng vintage được phóng to kích thước (164px) và xòe rộng hẳn ra ngoài mép hộp (-118px đến -134px), để lộ rõ hơn 70-75% toàn bộ bức hình và chữ viết tay tựa đề, không còn bị hộp che lấp quá nhiều như trước.
  - **Canh chỉnh thông minh không bị đè chữ**: Các tấm ảnh bên trái canh lề chữ sang trái, các tấm bên phải canh sang phải, đảm bảo toàn bộ tên kỷ niệm (`Lần đầu gặp gỡ`, `Tách cafe quen`, `Chuyến đi xa`,...) đều hiển thị trọn vẹn và dễ đọc.
  - **Không gian thoáng đãng, không che khuất chữ**: Tiêu đề chính `Hành Trình Kỷ Niệm` ở phía trên và chỉ dẫn `Cuộn xuống để khám phá...` ở phía dưới hoàn toàn thông thoáng, không bị bất kỳ thanh màu đen nào chèn ngang.
  - **Chi tiết thủ công tinh xảo**: Mỗi tấm Polaroid đều có băng keo **Washi Tape** pastel dán góc (`tape-blush`, `tape-honey`, `tape-sage`,...), viền trắng ảnh dày dặn, cùng dòng chữ viết tay tựa đề và ngày tháng lãng mạn.
  - **Chuyển động bồng bềnh êm ái (Gentle Floating Physics)**: Các tấm ảnh đung đưa bồng bềnh rất nhẹ (`polaroidFloat`), tạo cảm giác mềm mại, ấm cúng và sống động.
  - **Tương tác nhấc ảnh 3D & Xem chi tiết (Interactive 3D Hover & Lightbox)**:
    - Khi rê chuột vào bất kỳ tấm Polaroid nào, tấm ảnh đó sẽ **nhấc hẳn lên phía trước** với bóng đổ 3D sâu thẳm và viền sáng ấm để người xem nhìn rõ trọn vẹn bức hình.
    - **Nhấp chuột vào tấm ảnh** sẽ kích hoạt trình xem phóng to **Lightbox** hiển thị câu chuyện, ngày tháng và địa điểm của kỷ niệm đó.
  - **Tối ưu điện thoại (Mobile Friendly)**: Trên di động, hệ thống tự động ẩn 2 ảnh giữa để giao diện gọn gàng, 4 ảnh ở 4 góc thu nhỏ tỉ lệ vừa vặn và đảm bảo không bao giờ tràn màn hình.
- 🖼️ **Dữ liệu 3 mục kỷ niệm ảnh thật**:
  - **Mục 1: "Quân sự"** (6 ảnh: `DSC03633`, `DSC03635`, `DSC03654`, `DSC03661`, `DSC03663`, `DSC03664`): Album thao trường với huy hiệu `📷 6 ảnh`. Khi mở thư, toàn bộ 6 ảnh hiển thị dưới dạng Carousel tự động trượt, có mũi tên chuyển ảnh `‹` `›`, chấm tròn và phóng to Lightbox.
  - **Mục 2: "Liên hoan THSV"** (`IMG_3444.PNG`): Đêm hội thanh xuân rạng rỡ, tấm ảnh polaroid kỷ niệm cầm trên tay.
  - **Mục 3: "Đi 1 về 2"** (`IMG_3893.PNG`): Hành trình yêu thương đáng nhớ, bộ sưu tập polaroid kỷ niệm.
- 📍 **Gắn địa điểm cụ thể cho từng kỷ niệm** (`Trung tâm GDQP&AN`, `Liên hoan THSV`, `Nơi bắt đầu một chương mới`).
- 💌 **Lá thư gửi gắm chân thành** ("Lời Nhắn Ở Cuối Chặng Đường"): Nơi cất giữ những tâm sự yêu thương và kỷ niệm sâu lắng nhất của hai đứa.
- 🎵 **Trình phát nhạc Capsule thủy tinh đĩa than (Floating Romantic Music Capsule)**: Trình phát nhạc thiết kế dạng viên nang thủy tinh nổi (glassmorphism pill) sang trọng, gọn gàng ở góc màn hình. Bên trái là đĩa than mini xoay tròn kèm kim cần và nốt nhạc bay, ở giữa là tên bài hát & ca sĩ xếp ngang tinh tế, bên phải là **sóng nhạc Equalizer 3 thanh nhảy múa theo điệu nhạc**. Bấm để bật/tắt tiện lợi, hoàn toàn hài hòa và không còn bị thô hay cục bộ.
- 🧭 **2 Nút mũi tên nổi 2 bên dải ảnh (Floating Carousel Navigation Arrows)**: 2 nút mũi tên tròn sang trọng nổi ở hai bên trái và phải mép màn hình (`#streamPrevBtn` và `#streamNextBtn`) với thiết kế thủy tinh mờ cao cấp, viền hồng pastel ấm áp. Người xem có thể bấm nút để trượt lướt từng mốc kỷ niệm êm ru 60fps (hỗ trợ cả phím mũi tên `←` / `→` trên bàn phím, kéo chuột hoặc vuốt ngón tay trên điện thoại), hoàn toàn sạch sẽ và sang trọng.
- 🖼️ **Ảnh trong thư hiển thị nguyên bản theo size gốc (Uncropped & True Aspect Ratio)**:
  - **Giữ trọn vẹn 100% tỷ lệ gốc**: Ảnh trong thư sử dụng `object-fit: contain` và kích thước linh hoạt (`width: auto; max-width: 100%; height: auto;`), hoàn toàn loại bỏ việc cắt xén (crop) viền ảnh.
  - **Hiển thị hoàn hảo mọi định dạng**: Dù là ảnh Polaroid vuông (như ảnh 1020x1020 của *Liên hoan THSV* và *Đi 1 về 2* - hiển thị trọn vẹn viền polaroid trắng và bàn tay cầm ảnh) hay album ảnh ngang 3:2 (ảnh máy ảnh 6000x4000 của *Quân sự*), tất cả đều hiển thị nguyên vẹn 100% không mất một chi tiết nào.
  - Cả ở ngoài dòng thời gian và **bên trong bức thư**, album ảnh nhiều hình đều hiển thị dưới dạng **Carousel cao cấp**: tự động trượt chuyển sau mỗi 3.8 giây, có cặp nút mũi tên tròn `‹` `›`, chấm tròn trang trí, bộ đếm số ảnh và hỗ trợ vuốt chạm trên điện thoại hoặc nhấp mở xem phóng to Lightbox.
- 💌 **Hoạt cảnh mở & đóng phong bì con dấu sáp đỏ chuẩn điện ảnh (Đã bỏ hoàn toàn ruy băng)**:
  - **Loại bỏ dây ruy băng**: Theo yêu cầu, dây ruy băng và nơ lụa đã được gỡ bỏ hoàn toàn, giúp hoạt cảnh trở nên thanh thoát, tinh gọn, cổ điển và trang trọng.
  - 🌟 **Các hiệu ứng vật lý chân thực tinh tế**:
    - 💌 **Bức thư nở to thanh lịch (Smooth Bloom)**: Bức thư vươn lên và nở rộng trang nhã ra toàn màn hình, hoàn toàn loại bỏ các đường nếp gấp cứng nhắc, hiển thị trọn vẹn và tự nhiên nội dung tâm tình.
    - 📄 **Hành động rút ra & nhét vào êm ái (Silky Smooth Letter Slide)**: Mép lá thư trượt êm ru theo trục thẳng đứng với bóng đổ nổi dần khi trút ra khỏi khe phong bì và hạ êm sâu vào lòng túi khi đóng lại. Phía dưới nắp phong bì có dải bóng đổ chuyển động 3D (`.envelope-flap-shadow`) tan biến nhẹ khi nắp mở và đổ bóng sâu thẳm khi nắp đậy kín.
    - 🕯️ **Con dấu sáp nứt phát sáng & Lực ép sáp nóng (Wax Seal Crack & Emboss Squeeze)**: Khi mở thư, một tia nứt phát sáng vàng óng (`.wax-crack-line`) rạch đôi con dấu sáp đỏ trước khi bung vỡ; khi đóng thư, con dấu sáp ập xuống với lực nén đè đàn hồi (Emboss Squeeze) cùng một vòng sóng sáp nóng lan tỏa (`.wax-press-ripple`) như được đóng bằng khuôn dấu kim loại thực thụ.
  - **Trật tự mở thư (2.45s)**: 
    1. Phong bì xuất hiện trang nhã ở trung tâm màn hình (0.0s - 0.30s).
    2. Đường nứt phát sáng bẻ gãy con dấu sáp đỏ & con dấu tan biến (0.25s - 0.65s).
    3. Nắp phong bì mở toang 180° ra sau & vệt bóng đổ tan biến (0.60s - 1.25s).
    4. Vệt ánh hào quang vàng ấm bừng sáng từ lòng phong bì (0.95s - 1.75s).
    5. Lá thư bên trong trồi lên cao êm ru thẳng mượt (1.15s - 1.75s).
    6. Bức thư nở to đĩnh đạc ra toàn màn hình trang nhã và dịu mắt (1.65s - 2.35s).
  - **Trật tự đóng thư chuẩn xác vật lý 100% (2.15s)**:
    1. Bức thư thu nhỏ trượt nhẹ vào miệng phong bì (0.0s - 0.45s).
    2. Ánh hào quang ấm áp thắp sáng & mép thư lướt êm sâu vào lòng túi phong bì (0.20s - 0.70s).
    3. Nắp phong bì từ từ gập xuống đậy kín miệng phong bì & vệt bóng đổ trở lại (0.65s - 1.20s).
    4. **Con dấu sáp đỏ ập vào niêm phong mép nắp phong bì** (1.15s - 1.55s) kèm sóng sáp nóng ép nổi lan tỏa (`.wax-press-ripple`).
    5. Toàn bộ phong bì đóng kín hoàn chỉnh và mờ dần êm ái (1.60s - 2.10s), không bị khựng giật.
- 🎵 **Trình phát nhạc Vintage Luxury Music Box Capsule (Decor đĩa than hoàng gia lãng mạn)**:
  - **Vị trí Bottom Floating Dock sang trọng**: Dock nổi cố định tinh tế ở góc dưới bên phải (`bottom: 24px; right: 28px;`), giúp giải phóng toàn bộ phần đầu trang (Hero header), không che khuất tiêu đề hay khung ảnh kỷ niệm. Trên di động, capsule tự căn giữa gọn gàng ở cạnh dưới màn hình.
  - Viên nang thủy tinh mờ bo tròn cao cấp (`backdrop-filter: blur(28px) saturate(180%)`), viền kép vàng champagne và ánh hồng đào ấm áp.
  - Vầng hào quang ánh sáng hoàng hôn ấm áp (`.vinyl-glow-aura`) tự động bừng sáng và thở nhịp nhàng sau đĩa than khi phát nhạc.
  - Đĩa than Rosewood / Espresso xoay tròn với các rãnh phản quang ánh kim ấm cúng và nhãn tâm hình trái tim nở hoa `❤️`.
  - Cần kim Tonearm vàng champagne tinh xảo tự động gác vào đĩa khi phát và nhấc ra khi dừng.
  - Luồng nốt nhạc và trái tim pastel (`♪ ♫ ♩ 💕 ✨ 🤍`) bay lơ lửng bồng bềnh lên không gian khi phát nhạc.
  - Hàng thông tin bài hát có icon `♪`, tên bài hát thanh lịch, tên ca sĩ hiển thị trọn vẹn, chấm trạng thái hoàng hôn phát sáng (`#musicStatusDot`), và bộ đếm thời gian thực `00:00`.
  - Cột sóng âm Equalizer 4 thanh sunset gradient nhảy múa sinh động theo nhịp nhạc.
  - **Đầy đủ nút điều khiển chuyên nghiệp**:
    - Nút Lùi bài trước `⏮` và Nút Chuyển bài kế tiếp `⏭`.
    - Chạm vào đĩa than hoặc tiêu đề bài hát để Bật / Tạm dừng trực tiếp.
  - **Thanh tiến trình thời gian thực (Seekable Progress Bar)**: Một dải sáng rose-gold chạy êm ái dưới đáy capsule, người xem có thể nhấp chuột hoặc kéo để tua bài hát đến đoạn yêu thích.
  - **Menu Danh sách phát bung mở (Dropdown Playlist Drawer)**: Bấm vào nút `🎶 1/4` để mở danh sách 4 bài hát kỷ niệm của hai đứa, nhấp vào bài bất kỳ để đổi nhạc tức thì! Tự động đóng khi bấm ra ngoài hoặc ấn `Esc`.
- 🖼️ **Dải Băng Chuyền Ảnh Kỷ Niệm Truyền Động (Dynamic Infinite Flowing Memories Stream - Hoạt Ảnh Động)**:
  - **Dạng ảnh truyền qua lại để xem thay vì tĩnh**: Thay thế hoàn toàn 2 cột ảnh đứng yên bằng một dải băng chuyền kỷ niệm trôi bồng bềnh liên tục qua màn hình theo nhịp điệu êm ái, nhẹ nhàng như một thước phim điện ảnh ký ức.
  - **Vòng lặp vô tận liền mạch 100% (Seamless Infinite Loop)**: Dải ảnh trôi mượt mà không bao giờ bị hẫng hay gián đoạn ở cuối nhờ cơ chế nhân bản thẻ ảnh và cuộn offset tự nhiên.
  - **Thiết kế tối giản, tinh tế (Minimalist & Clean)**: Loại bỏ các thanh nút điều khiển và dòng chữ hướng dẫn rườm rà. Đồng thời gỡ bỏ hoàn toàn các huy hiệu đè lên ảnh (`📍 Vị trí` và `💌 Chạm mở thư`), trả lại toàn bộ không gian khung ảnh sạch sẽ, trọn vẹn theo phong cách ảnh in nghệ thuật. Dải ảnh trôi hoàn toàn tự nhiên, thanh lịch.
  - **Tương tác kéo lướt tự nhiên (Drag / Touch Swipe)**: Người dùng có thể dùng chuột kéo lướt hoặc vuốt tay trên màn hình cảm ứng để truyền ảnh qua lại với quán tính vật lý mượt mà 60fps.
  - **Rê chuột tự động dừng (Pause on Hover)**: Khi rê chuột vào bất kỳ bức ảnh nào, hoạt ảnh trôi sẽ tạm dừng nhẹ nhàng, thẻ ảnh nhấc bổng lên 3D (`translateY(-8px) scale(1.02)`) với viền sáng ấm và bóng đổ sâu để người xem ngắm nhìn trọn vẹn.
  - **Chạm vào bất kỳ ảnh nào để mở ngay bức thư 3D tương ứng**: Nhấp chuột hoặc chạm vào bất kỳ thẻ ảnh nào đang trôi trên băng chuyền đều lập tức mở ra bức thư 3D với phong bì mở nắp đầy đủ chi tiết và câu chuyện của mốc kỷ niệm đó. Thao tác kéo lướt để xem sẽ không kích hoạt mở thư nhầm lẫn.
- 🎨 **Bộ Decor Vintage & Scrapbook Journal**:
  - 🎀 **Băng keo Washi Tape**: Dải băng keo Washi cắt răng cưa tự nhiên pastel dán góc trên mỗi thẻ kỷ niệm trên dòng thời gian và đầu bức thư, mang lại cảm giác quyển sổ nhật ký lưu niệm thủ công.
  - 📮 **Tem thư bưu chính cổ điển & Dấu mộc bưu điện (Postage Stamp & Cancellation Postmark)**: Chiếc tem thư bưu chính với viền răng cưa, hình trái tim tình yêu và dấu mộc bưu điện lượn sóng (`FOREVER LOVE MAIL`) đóng xéo chân thực.
  - 🕯️ **Con dấu sáp đỏ tình yêu (Red Lacquer Wax Seal)**: Dấu niêm phong sáp nổi 3D hình trái tim đóng trên nắp phong bì trước khi mở ra.
  - ✍️ **Chữ ký & Lời kết nắn nót (Handwritten Signature Flourish)**: Lời kết phong cách thư tay cổ điển `~ Thương gửi từ trái tim ~ Forever Yours ~ ❤️` ở cuối mỗi bức thư.
  - 📜 **Khung viền chỉ thêu vintage**: Khung viền nét đứt tinh xảo chạy quanh bức thư tăng vẻ hoài niệm.
- 🔄 **Album ảnh tự động chuyển & đổi thủ công**: Các bức ảnh trong kỷ niệm tự động trượt chuyển sau mỗi 4 giây, người xem vẫn có thể bấm nút `‹` `›`, chấm tròn hoặc vuốt tay để đổi ảnh bất cứ lúc nào.
- 🏷️ **Icon Favicon & Tiêu đề trang web**: Icon trái tim nổi bật trên tab trình duyệt và tiêu đề lãng mạn.

---

## 📂 1. Cấu trúc thư mục

```text
D:\Jobs\Interaction Web for Love\
├── images/             <-- Nơi bỏ ảnh kỷ niệm (photo1.jpg, photo2.jpg,...)
├── videos/             <-- Nơi bỏ video clip & thước phim kỷ niệm (.mp4, .mov, .webm)
├── music/              <-- Nơi bỏ file bài hát của bạn (audio.mp3)
├── favicon.svg         <-- Icon trái tim hiển thị trên tab trình duyệt
├── index.html          <-- Giao diện dòng thời gian & Box lời nhắn mở đầu
├── style.css           <-- Thiết kế dòng thời gian, album ảnh carousel & địa điểm
├── script.js           <-- Dữ liệu kỷ niệm (album ảnh, địa điểm), lightbox phóng to
└── README.md
```

---

## 💌 2. Cách chỉnh sửa Lời nhắn mở đầu & Thư kết thúc

Mở file [`index.html`](file:///D:/Jobs/Interaction%20Web%20for%20Love/index.html):
- **Lời nhắn mở đầu:** Tìm thẻ `<div class="intro-message-box" id="introMessageBox">` (khoảng dòng 55), bạn có thể thoải mái viết lại lời nhắn tâm tình mở đầu cho người ấy.
- **Bức thư kết thúc:** Tìm thẻ `<div class="letter-card">` ở cuối file để sửa lời kết cùng nút thả tim.

---

## 📸 3. Cách thêm ảnh & điền địa điểm cho kỷ niệm

Mở file [`script.js`](file:///D:/Jobs/Interaction%20Web%20for%20Love/script.js). Ở mảng `MEMORIES` ngay đầu file, mỗi mốc kỷ niệm có cấu trúc như sau:

```javascript
{
    id: 1,
    // Bạn có thể để 1 ảnh hoặc nhiều ảnh trong mảng images:
    images: [
        "images/photo1.jpg",
        "images/photo1_2.jpg"
    ],
    date: "Khoảnh khắc đầu tiên",
    location: "Một góc quen ngày nắng",   // <-- Ghi địa điểm kỷ niệm tại đây (Tính năng 2)
    title: "Lần đầu gặp gỡ",
    story: "Nội dung câu chuyện kỷ niệm..."
}
```

* **Nếu có 1 ảnh:** Thẻ ảnh hiển thị đơn giản, sạch sẽ.
* **Nếu có nhiều ảnh:** Thẻ ảnh tự động biến thành **Album ảnh Carousel**:
  * Người xem có thể bấm nút `‹` `›`, bấm vào các chấm tròn chỉ báo bên dưới.
  * Trên điện thoại: Người xem có thể **dùng ngón tay vuốt sang trái / sang phải** trực tiếp trên ảnh để lướt qua các bức ảnh của kỷ niệm đó!
  * Chạm vào bất kỳ ảnh nào để phóng to xem ở chế độ **Lightbox toàn màn hình**.

---

## 🎵 4. Danh sách phát nhạc cuốn chiếu (Sequential Playlist 4 bài hát)

Hệ thống đã được thiết lập để tự động phát lần lượt (cuốn chiếu) 4 bài hát lãng mạn trong folder `music/`:
1. **50 Năm Về Sau** – Đặng Thanh Tuyền (`music/50 Năm Về Sau.mp3`)
2. **Dù Cho Mai Về Sau** – buitruonglinh (`music/Dù Cho Mai Về Sau.mp3`)
3. **Hẹn Một Mai** – Bùi Anh Tuấn (`music/Hẹn Một Mai.mp3`)
4. **Từ Thích Thích Thành Thương Thương** – AMEE ft. Hoàng Dũng (`music/TỪ THÍCH THÍCH THÀNH THƯƠNG THƯƠNG.mp3`)

- **Cơ chế phát cuốn chiếu**: Khi một bài hát phát đến giây cuối cùng, hệ thống sẽ **tự động chuyển sang bài tiếp theo** và xoay vòng liên tục (`1 ➔ 2 ➔ 3 ➔ 4 ➔ 1...`).
- **Nút chuyển bài thủ công (⏭)**: Bên cạnh sóng nhạc Equalizer trên capsule đĩa than có tích hợp nút chuyển bài nhanh, bạn có thể bấm vào bất kỳ lúc nào để đổi sang bài tiếp theo.
- **Huy hiệu thứ tự bài hát**: Hiển thị rõ số thứ tự bài đang phát (ví dụ: `1/4`, `2/4`, `3/4`, `4/4`) cùng tên bài hát và nghệ sĩ tương ứng.
- **Tự động phát & Bật/Tắt theo ý muốn**: Tự động phát khi vào trang web, chạm vào đĩa than để Tạm dừng hoặc Bật lại bất cứ lúc nào.

---

## 🌐 5. Đưa lên GitHub Pages để gửi cho người ấy

1. Tạo repository mới trên [GitHub](https://github.com) (chế độ **Public**).
2. Tải toàn bộ thư mục và file lên: `images/`, `music/`, `index.html`, `style.css`, `script.js`.
3. Vào **Settings** -> **Pages** -> Tại mục **Branch** chọn `main` rồi nhấn **Save**.
4. Chờ 1 - 2 phút, GitHub sẽ cấp cho bạn một đường link web miễn phí để gửi cho người ấy!


---

## 🎬 3. Hướng dẫn lưu trữ và thêm Video kỷ niệm

Trang web hỗ trợ lưu trữ và phát trực tiếp video với đầy đủ tính năng:
- **Thư mục lưu trữ**: Thư mục `videos/` chứa các video kỷ niệm (`.mp4`, `.mov`, `.webm`).
- **Phát video trong thư**: Khi mở thư, video được nhúng trực tiếp kèm trình phát hiện đại, thanh tua thời gian và âm lượng.
- **Xem video toàn màn hình (Lightbox)**: Nhấp vào ảnh bìa video để mở xem rạp chiếu phim với độ nét cao.
- **Tự động ngắt tiếng nhạc nền**: Khi bất kỳ video nào phát, nhạc nền đĩa than sẽ tự động tạm dừng để âm thanh video rõ ràng; khi đóng video hoặc tạm dừng, nhạc nền sẽ tự động tiếp tục phát.
- **Bộ lọc thông minh**: Trên đầu bộ sưu tập có sẵn 3 tab: `✨ Tất cả`, `📸 Ảnh kỷ niệm`, `🎬 Thước phim` để dễ dàng chọn lọc nội dung muốn xem.

### Cách cấu hình trong `script.js`:
```javascript
// Kỷ niệm dạng Video riêng:
{
    id: 4,
    title: "Thước Phim Bên Nhau",
    date: "Khoảnh khắc chuyển động",
    type: "video",
    video: "videos/khoanh-khac-ben-nhau.mp4",
    poster: "images/DSC03635.jpeg",
    story: "Những khoảnh khắc chuyển động đáng yêu..."
}

// Kỷ niệm kết hợp cả Video và Album Ảnh:
{
    id: 1,
    title: "Quân sự",
    date: "Kỷ niệm quân sự",
    type: "mixed",
    video: "videos/ky-niem-quan-su.mp4",
    poster: "images/DSC03633.jpeg",
    images: ["images/DSC03633.jpeg", "images/DSC03635.jpeg"],
    story: "Tới khúc này chụp ảnh..."
}
```
