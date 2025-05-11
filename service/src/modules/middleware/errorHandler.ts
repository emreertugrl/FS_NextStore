import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Hata meydana geldi");
  console.error("Hata Detayları:", {
    message: err.message || "Bilinmeyen Hata",
    status: err.status || 500,
    stack: err.stack || "Stack bilgisi yok",
  });

  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "Üzgünüz, bir şeyler ters gitti.";

  res.status(errStatus).json({
    status: "Error",
    statusCode: errStatus,
    message: errMessage,
  });

  // dönüş yok => void
};

export default errorMiddleware;
