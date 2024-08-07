import ResponseCode from "@/types/auth/response-code.enum";

export default interface ResponseDto {
  code: ResponseCode;
  message: string;
}
