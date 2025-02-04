export const ServicesResponses = [
  { label: "موفق", value: "SUCCESS" },
  { label: "ورودی معتبر نمی باشد.", value: "INVALID_INPUT" },
  { label: "شماره موبایل معتبر نمی باشد.", value: "INVALID_MOBILE_NUMBER" },
  {
    label: "کد ملی و تاریخ تولد با هم مطابقت ندارد.",
    value: "NATIONAL_CODE_AND_BIRTH_DATE_DOES_NOT_MATCH",
  },
  {
    label: "تاریخ تولد نمی تواند خالی باشد.",
    value: "BIRTH_DATE_CAN_NOT_BE_EMPTY",
  },
  { label: "شماره کارت بانکی معتبر نمی باشد.", value: "INVALID_PAN" },
  { label: "کد ملی معتبر نمی باشد.", value: "INVALID_NATIONAL_CODE" },
  {
    label: "در تصویر بارگزاری شده، چهره ای یافت نشد.",
    value: "CAN_NOT_DETECT_FACE_IN_IMAGE",
  },
  {
    label: "عکس بارگزاری شده نمونه ای از یک کارت بانکی نمی باشد.",
    value: "CAN_NOT_DETECT_CREDIT_CARD_IN_IMAGE",
  },
  {
    label: "عکس بارگزاری شده نمونه ای از یک کارت ملی نمی باشد.",
    value: "CAN_NOT_DETECT_NATIONAL_CARD_IN_IMAGE",
  },
  {
    label: "جزییات مورد نظر از تصویر یافت نشد.",
    value: "CAN_NOT_EXTRACT_FEATURES_FROM_IMAGE",
  },
  { label: "حجم فایل معتبر نمی باشد.", value: "FILE_SIZE_NOT_VALID" },
  { label: "شناسه احراز هویت معتبر نیست.", value: "INVALID_KYC_ID" },
  {
    label: "احراز هویت با این شناسه، قبلا تکمیل شده است.",
    value: "KYC_ALREADY_COMPLETE",
  },
  { label: "دست چپ پشتیبانی نمی شود.", value: "LEFT_HAND_NOT_SUPPORTED" },
  {
    label: "محل قرارگیری دست نامناسب است.",
    value: "INVALID_HAND_POSITION",
  },
  { label: "سرویس سجام در دسترس نمی باشد.", value: "CLIENT_IS_INACTIVE" },
  { label: "سرویس محدود شده است.", value: "SERVICE_RESTRICTED" },
  { label: "یکبار رمز سجام نامعتبر است.", value: "SEJAM_INVALID_OTP" },
  { label: "چیزی پیدا نشد. (qr code)", value: "NOT_FOUND" },
  { label: "فایل یافت نشد.", value: "FILE_NOT_FOUND" },
  { label: "سرویس یافت نشد.", value: "API_NOT_FOUND" },
  {
    label: "در استعلام ثبت احوال تصویری یافت نشد.",
    value: "INQUIRY_IMAGE_NOT_FOUND",
  },
  { label: "فرمت فایل معتبر نمی باشد.", value: "INVALID_FILE_FORMAT" },
  {
    label: "کدملی و شماره کارت با هم مطابقت ندارد.",
    value: "NATIONAL_CODE_AND_PAN_NOT_MATCHED",
  },
  {
    label:
      "تعداد درخواست های مجاز یا مدت استفاده از این سرویس به پایان رسیده است.",
    value: "MAXIMUM_ATTEMPT_REACHED",
  },
  { label: "خطای ناشناخته", value: "UNKNOWN_ERROR" },
  { label: "خطای داخلی سرویس", value: "INTERNAL_SERVICE_ERROR" },
  { label: "خطای سرویس خارجی", value: "THIRD_PARTY_SERVICE_ERROR" },
  {
    label: "فرآیند خوانش متن با خطا مواجه شد.",
    value: "OCR_PROCESS_FAILED",
  },
  {
    label: "سرویس ثبت احوال در دسترس نمی باشد.",
    value: "SABT_AHVAL_SERVICE_UNAVAILABLE",
  },
  {
    label: "سرویس سجام در دسترس نمی باشد.",
    value: "SEJAM_SERVICE_UNAVAILABLE",
  },
  {
    label: "مدت زمان مجاز فراخوانی سرویس خارجی به پایان رسید.",
    value: "THIRD_PARTY_GATEWAY_TIMEOUT",
  },
];
