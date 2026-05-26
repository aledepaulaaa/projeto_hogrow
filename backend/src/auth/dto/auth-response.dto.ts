import { ApiProperty } from '@nestjs/swagger';

class UserData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

class AuthTokensData {
  @ApiProperty()
  accessToken: string;
}

export class AuthResponseDto {
  @ApiProperty()
  user: UserData;

  @ApiProperty()
  tokens: AuthTokensData;
}
