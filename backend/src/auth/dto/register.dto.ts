import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO de registro de usuario.
 * Valida nome, email, senha, telefone e agencia.
 */
export class RegisterDto {
  @ApiProperty({ example: 'Maria Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'maria@empresa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @MinLength(6)
  passwordConfirm: string;

  @ApiPropertyOptional({ example: '+5511999999999' })
  @IsOptional()
  @Matches(/^\+55\d{10,11}$/, {
    message: 'Telefone deve seguir o formato +55DDDNUMERO (ex: +5511999999999)',
  })
  phone?: string;

  @ApiPropertyOptional({ example: 'Minha Empresa Ltda' })
  @IsOptional()
  @IsString()
  empresaName?: string;
}
