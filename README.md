# Entrance Test Haibazo JSC

## Giới thiệu
Đây là một mini game được xây dựng bằng React + TypeScript, sử dụng Vite và TailwindCSS. Game được phát triển phục vụ bài kiểm tra đầu vào cho Haibazo JSC.

## Luật chơi
- Khi nhấn **Start Game**, trên màn hình sẽ xuất hiện các hình tròn được đánh số thứ tự từ 1 đến N (N mặc định là 5, có thể chỉnh từ 5 đến 20).
- Nhiệm vụ của bạn là nhấn vào các hình tròn theo đúng thứ tự tăng dần (1 → 2 → 3 ...).
- Nếu nhấn sai thứ tự, trò chơi sẽ kết thúc (**GAME OVER**).
- Khi nhấn đúng, hình tròn sẽ chuyển màu và biến mất sau 3 giây.
- Khi tất cả hình tròn biến mất, bạn chiến thắng (**ALL CLEARED**).
- Có thể bật chế độ **Auto Play** để tự động chơi thử.
- Thời gian hoàn thành sẽ được bấm giờ và hiển thị trên giao diện.

## Tính năng
- Chọn số lượng hình tròn.
- Đếm thời gian hoàn thành.
- Chế độ tự động chơi (Auto Play) để demo.

## Cài đặt & Chạy thử
1. **Clone dự án:**
   ```bash
   git clone <repo-url>
   cd pretest-code
   ```
2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```
3. **Chạy ở chế độ phát triển:**
   ```bash
   npm run dev
   ```

## Công nghệ sử dụng
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/icons/)

## Thư mục chính
- `src/` - Mã nguồn chính
  - `components/` - Các component giao diện
  - `hooks/` - Custom hook quản lý logic game


---

> Bản quyền © Doanh-Dinh-7