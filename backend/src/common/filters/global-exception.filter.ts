import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ocorreu um erro interno no servidor.';
    let details = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      // Traducao das mensagens padrao do NestJS
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          message = 'Requisicao invalida. Verifique os dados enviados.';
          if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
            details = exceptionResponse.message; // Detalhes do class-validator
          }
          break;
        case HttpStatus.UNAUTHORIZED:
          message = 'Nao autorizado. Faca login para acessar este recurso.';
          break;
        case HttpStatus.FORBIDDEN:
          message = 'Acesso negado. Voce nao tem permissao para realizar esta acao.';
          break;
        case HttpStatus.NOT_FOUND:
          message = 'Recurso nao encontrado. Verifique a URL solicitada.';
          break;
        default:
          message = exception.message || 'Ocorreu um erro inesperado.';
      }
    } else if (exception instanceof Error) {
      // Para erros nao tratados (500)
      console.error('Erro Nao Tratado:', exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception instanceof HttpException ? exception.name : 'Internal Server Error',
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
