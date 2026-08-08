# Kế hoạch "Vắt Kiệt" Sạn Backend (Phase 6 - Security & Validation)

Tuân thủ đúng yêu cầu không tạo Unit Test, tôi đã tiếp tục soi xét mã nguồn ở mức độ cực kỳ khắt khe (Senior Level) và nhận ra 3 lỗ hổng bảo mật & validation rất đặc trưng của việc "AI viết code qua loa":

## 1. Vấn đề 1: Lỗ hổng Validation Số Báo Danh (AI lười)
**Hiện trạng:** 
Trong `scores.dto.ts`, DTO kiểm tra số báo danh (`sbd`) chỉ đang dùng `@IsString()` và `@Length(8, 8)`. 
**Hậu quả:** 
Nếu user nhập SBD là `ABCDEFGH` hoặc `123@!abc`, hệ thống vẫn cho lọt xuống Service và bắt Database phải đi tìm. SBD bắt buộc phải là số!
**Giải pháp:**
- Thêm Decorator `@Matches(/^[0-9]{8}$/, { message: 'SBD must contain exactly 8 digits' })` để khóa chặt đầu vào: Phải là 8 ký tự và phải là chữ số từ 0-9.

## 2. Vấn đề 2: Cấu hình CORS mở toang cửa (Bảo mật kém)
**Hiện trạng:** 
Trong `main.ts`, đang dùng lệnh `app.enableCors();` trống không.
**Hậu quả:** 
Mặc định NestJS sẽ cấu hình `Access-Control-Allow-Origin: *`. Bất kỳ website hacker nào cũng có thể gọi API của bạn. Đây là kiểu code AI rất hay làm để lách lỗi CORS ở máy local.
**Giải pháp:**
- Cấu hình lại `app.enableCors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' })` để chỉ cho phép duy nhất trang Frontend của bạn được phép truy cập.

## 3. Vấn đề 3: Cấu hình Rate Limit (Throttler) bị Hardcode
**Hiện trạng:**
Trong `app.module.ts`, Throttler đang bị hardcode cứng là `ttl: 60000` (1 phút) và `limit: 100` request.
**Hậu quả:**
Không thể thay đổi linh hoạt giới hạn request khi đưa lên môi trường thật mà không phải sửa code và build lại toàn bộ.
**Giải pháp:**
- Cấu hình Throttler lấy thông số từ `process.env.THROTTLE_TTL` và `process.env.THROTTLE_LIMIT`.

---
**Hành động tiếp theo (Action Items):**
1. [x] Cập nhật `scores.dto.ts` để sử dụng RegExp chặn chữ cái trong SBD.
2. [x] Sửa lại `app.enableCors` trong `main.ts` để chặn truy cập lạ.
3. [x] Gắn biến môi trường vào cấu hình `ThrottlerModule` trong `app.module.ts`.
