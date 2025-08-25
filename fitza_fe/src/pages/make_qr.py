# make_qr_drive_folder.py
import qrcode
from PIL import Image

URL = "https://drive.google.com/drive/folders/1XmFNj8WSM8BtC4F8ZGxpVxI7at51dyfr?usp=sharing"
OUT = "qr_drive_folder.png"

def main():
    qr = qrcode.QRCode(
        version=None,  # 자동 크기
        error_correction=qrcode.constants.ERROR_CORRECT_M,  # 인쇄용으로 M 권장
        box_size=10,   # 픽셀 크기 (인쇄 시 10~12 추천)
        border=4,      # 여백
    )
    qr.add_data(URL)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(OUT)
    print(f"QR 저장 완료: {OUT} (version={qr.version})")

if __name__ == "__main__":
    main()
